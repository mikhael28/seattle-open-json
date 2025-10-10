import { PlanComment } from "../permit-data/permit-types.js";
import planCommentsData from "../permit-data/plan-comments-2025-raw.json" with { type: "json" };

export type { PlanComment } from "../permit-data/permit-types.js";

export const planComments: PlanComment[] = planCommentsData as PlanComment[];
