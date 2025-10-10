import { Router } from "express";
import { z } from "zod";

import {
  evaluateSiteMapImage,
  type SiteMapEvaluationPayload,
} from "../services/siteMapEvaluationService.js";

const requirementSchema = z.object({
  id: z.number(),
  description: z.string(),
  category: z.string(),
  required: z.boolean(),
});

const propertySchema = z.object({
  width: z.number(),
  depth: z.number(),
  scale: z.number(),
  address: z.string().optional(),
  streetSide: z.string().optional(),
  northDirection: z.number().optional(),
});

const evaluationRequestSchema = z.object({
  imageData: z.string().min(1),
  requirementType: z.string().min(1),
  requirements: z.array(requirementSchema).min(1),
  property: propertySchema.optional(),
});

const siteMapRouter = Router();

siteMapRouter.post("/evaluate", async (req, res) => {
  const validation = evaluationRequestSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Invalid request payload",
      details: validation.error.flatten(),
    });
    return;
  }

  try {
    const evaluation = await evaluateSiteMapImage(
      validation.data as SiteMapEvaluationPayload
    );
    res.json({ data: evaluation });
  } catch (error) {
    if (error instanceof Error) {
      const status = error.message.includes("OPENAI_API_KEY") ? 503 : 500;
      res.status(status).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Failed to evaluate site map" });
  }
});

export default siteMapRouter;
