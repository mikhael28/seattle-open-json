import OpenAI from "openai";
import { z } from "zod";

const evaluationResultSchema = z.object({
  overallStatus: z.enum(["ready_for_review", "needs_attention"]),
  summary: z.string(),
  findings: z.array(
    z.object({
      requirementId: z.number().optional(), // ID from the checklist
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
    .map((requirement) => {
      const label = `ID ${requirement.id}: [${requirement.category}] ${
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
    'Provide concise, actionable findings for each requirement, noting whether the plan appears to meet it, is missing information, or is unclear. IMPORTANT: Include the requirement ID number in each finding so it can be matched to the checklist. If everything appears to meet the requirements, mark the overall status as ready_for_review. Respond only with JSON matching this shape: {"overallStatus": "ready_for_review"|"needs_attention", "summary": string, "findings": [{"requirementId": number, "requirement": string, "status": "met"|"missing"|"unclear", "notes"?: string}] }.',
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 4000, // Increased token limit to handle complex evaluations with many requirements
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are an experienced Seattle permitting reviewer specializing in architectural site plans. Respond in structured JSON and keep findings brief but actionable.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: promptText,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
              detail: "high",
            },
          },
        ],
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Model returned an empty response");
  }

  try {
    const parsed = JSON.parse(content);
    return evaluationResultSchema.parse(parsed);
  } catch (error) {
    throw new Error("Failed to parse evaluation response as JSON");
  }
}
