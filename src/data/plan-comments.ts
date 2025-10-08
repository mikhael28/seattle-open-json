import { PlanComment } from "../permit-data/permit-types";
import planCommentsData from "../permit-data/plan-comments-2025-raw.json";

export type { PlanComment } from "../permit-data/permit-types";

export const planComments: PlanComment[] = planCommentsData as PlanComment[];
