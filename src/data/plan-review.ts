import { PlanReview } from "../permit-data/permit-types";
import planReviewData from "../permit-data/plan-review-2025-raw.json";

export type { PlanReview } from "../permit-data/permit-types";

export const planReview: PlanReview[] = planReviewData as PlanReview[];
