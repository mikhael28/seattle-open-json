import type { BuildingPermit, PlanComment, PlanReview } from "seattle-open-json";
import { buildingPermits } from "seattle-open-json/building-permits";
import { planComments } from "seattle-open-json/plan-comments";
import { planReview } from "seattle-open-json/plan-review";

export interface PermitDetails {
  permitNumber: string;
  buildingPermit?: BuildingPermit;
  planComments: PlanComment[];
  planReviews: PlanReview[];
}

export function getPermitDetails(permitNumber: string): PermitDetails {
  const normalized = permitNumber.trim().toUpperCase();

  const buildingPermit = buildingPermits.find(
    (permit: BuildingPermit) => permit.PermitNum.toUpperCase() === normalized
  );

  const comments = planComments.filter(
    (comment: PlanComment) => comment.PermitNum.toUpperCase() === normalized
  );

  const reviews = planReview.filter(
    (review: PlanReview) => review.PermitNum.toUpperCase() === normalized
  );

  return {
    permitNumber: normalized,
    buildingPermit,
    planComments: comments,
    planReviews: reviews,
  };
}
