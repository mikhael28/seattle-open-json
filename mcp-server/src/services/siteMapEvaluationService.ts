import OpenAI from "openai";
import { z } from "zod";

const evaluationResultSchema = z.object({
  overallStatus: z.enum(["ready_for_review", "needs_attention"]),
  summary: z.string(),
  findings: z.array(
    z.object({
      requirement: z.string(),
      status: z.enum(["met", "missing", "unclear"]),
      notes: z.string().optional(),
    })
  ),
});

export type SiteMapEvaluation = z.infer<typeof evaluationResultSchema>;

export interface SiteMapRequirementSummary {
  id: number;
  description: string;
  category: string;
  required: boolean;
}

export interface SiteMapPropertySummary {
  width: number;
  depth: number;
  scale: number;
  address?: string;
  streetSide?: string;
  northDirection?: number;
}

export interface SiteMapEvaluationPayload {
  imageData: string;
  requirementType: string;
  requirements: SiteMapRequirementSummary[];
  property?: SiteMapPropertySummary;
}

let cachedClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

function normalizeImageData(imageData: string): string {
  if (imageData.startsWith("data:")) {
    return imageData;
  }

  return `data:image/png;base64,${imageData}`;
}

function buildRequirementsPrompt(
  requirements: SiteMapRequirementSummary[]
): string {
  return requirements
    .map((requirement, index) => {
      const label = `${index + 1}. [${requirement.category}] ${
        requirement.description
      }`;
      return requirement.required
        ? `${label} (required)`
        : `${label} (optional)`;
    })
    .join("\n");
}

function buildPropertyContext(property?: SiteMapPropertySummary): string {
  if (!property) {
    return "";
  }

  const details: string[] = [
    `Lot width: ${property.width} ft`,
    `Lot depth: ${property.depth} ft`,
    `Drawing scale: 1" = ${property.scale} ft`,
  ];

  if (property.address) {
    details.push(`Address: ${property.address}`);
  }

  if (property.streetSide) {
    details.push(`Primary street along the ${property.streetSide} edge.`);
  }

  if (typeof property.northDirection === "number") {
    details.push(`North arrow rotation: ${property.northDirection}°`);
  }

  return details.join("\n");
}

export async function evaluateSiteMapImage(
  payload: SiteMapEvaluationPayload
): Promise<SiteMapEvaluation> {
  if (!payload.imageData) {
    throw new Error("Image data is required for evaluation");
  }

  if (!payload.requirements || payload.requirements.length === 0) {
    throw new Error("At least one requirement must be provided");
  }

  const imageUrl = normalizeImageData(payload.imageData);
  const client = getClient();

  const requirementsPrompt = buildRequirementsPrompt(payload.requirements);
  const propertyContext = buildPropertyContext(payload.property);

  const promptText = [
    `Evaluate the provided architectural site map image against the ${payload.requirementType} checklist for Seattle permitting.`,
    propertyContext ? `Project context:\n${propertyContext}` : undefined,
    `Checklist items:\n${requirementsPrompt}`,
    'Provide concise, actionable findings for each requirement, noting whether the plan appears to meet it, is missing information, or is unclear. If everything appears to meet the requirements, mark the overall status as ready_for_review. Respond only with JSON matching this shape: {"overallStatus": "ready_for_review"|"needs_attention", "summary": string, "findings": [{"requirement": string, "status": "met"|"missing"|"unclear", "notes"?: string}] }.',
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "You are an experienced Seattle permitting reviewer specializing in architectural site plans. Respond in structured JSON and keep findings brief but actionable.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: promptText,
          },
          {
            type: "input_image",
            detail: "high",
            image_url: imageUrl,
          },
        ],
      },
    ],
  });
  for (const item of response.output ?? []) {
    if (
      "content" in item &&
      Array.isArray((item as { content?: unknown }).content)
    ) {
      for (const part of (
        item as { content: Array<{ type: string; text?: string }> }
      ).content) {
        if (part.type === "output_text" && part.text) {
          try {
            const parsed = JSON.parse(part.text);
            return evaluationResultSchema.parse(parsed);
          } catch (error) {
            throw new Error("Failed to parse evaluation response as JSON");
          }
        }
      }
    }
  }

  if (response.output_text) {
    try {
      const parsed = JSON.parse(response.output_text);
      return evaluationResultSchema.parse(parsed);
    } catch (error) {
      throw new Error("Failed to parse evaluation response as JSON");
    }
  }

  throw new Error("Model returned an empty response");
}
