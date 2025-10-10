import { PlanReview } from "../permit-data/permit-types.js";
import planReviewData from "../permit-data/plan-review-2025-raw.json";

export type { PlanReview } from "../permit-data/permit-types.js";

export const planReview: PlanReview[] = planReviewData as PlanReview[];
