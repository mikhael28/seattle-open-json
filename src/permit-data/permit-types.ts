/**
 * TypeScript interfaces for Seattle permit data
 * Generated from building-permits-2025-raw.json, plan-comments-2025-raw.json, and plan-review-2025-raw.json
 */

/**
 * Interface for building permits data from building-permits-2025-raw.json
 */
export interface BuildingPermit {
  /** Permit number identifier */
  PermitNum: string;
  /** Classification of the permit */
  PermitClass: string;
  /** Mapped permit class (e.g., "Residential", "Non-Residential") */
  PermitClassMapped: string;
  /** Mapped permit type (e.g., "Building") */
  PermitTypeMapped: string;
  /** Description of the permit type */
  PermitTypeDesc: string;
  /** Detailed description of the project */
  Description: string;
  /** Number of housing units */
  HousingUnits: number;
  /** Number of housing units removed */
  HousingUnitsRemoved: number;
  /** Number of housing units added */
  HousingUnitsAdded: number;
  /** Estimated project cost */
  EstProjectCost: number;
  /** Date the permit was applied for */
  AppliedDate: string;
  /** Date the permit was issued */
  IssuedDate: string;
  /** Date the permit expires */
  ExpiresDate: string;
  /** Date the project was completed (empty if not completed) */
  CompletedDate: string;
  /** Current status of the permit */
  StatusCurrent: string;
  /** Related MUP (Master Use Permit) number */
  RelatedMup: string;
  /** Original address line 1 */
  OriginalAddress1: string;
  /** Original city */
  OriginalCity: string;
  /** Original state */
  OriginalState: string;
  /** Original ZIP code */
  OriginalZip: number;
  /** Contractor company name */
  ContractorCompanyName: string;
  /** Link to permit details */
  Link: string;
  /** Latitude coordinate */
  Latitude: number;
  /** Longitude coordinate */
  Longitude: number;
  /** Location coordinates as string */
  Location1: string;
  /** Total days for plan review */
  TotalDaysPlanReview: number;
  /** Days for initial plan review */
  DaysInitialPlanReview: number;
  /** Days for city plan review */
  DaysPlanReviewCity: number;
  /** Days out for corrections */
  DaysOutCorrections: number;
  /** Number of review cycles */
  NumberReviewCycles: number;
  /** Date initial review was completed */
  InitialReviewCompleteDate: string;
  /** Date plan review was completed */
  PlanReviewCompleteDate: string;
  /** Days to issue permit in city */
  DaysIssuePermitCity: number | string;
  /** Date ready to issue */
  ReadyToIssueDate: string;
  /** Zoning classification */
  Zoning: string;
  /** Type of dwelling unit */
  DwellingUnitType: string;
  /** Whether it's a standard plan (0 or 1) */
  StandardPlan: number;
  /** Whether it's a dependent building (0 or 1) */
  DependentBuilding: number;
  /** Parent permit number */
  ParentPermitNum: string;
  /** Housing category classification */
  HousingCategory: string;
}

/**
 * Interface for plan comments data from plan-comments-2025-raw.json
 */
export interface PlanComment {
  /** Permit number identifier */
  PermitNum: string;
  /** Title of the document */
  DocumentTitle: string;
  /** URL to the document */
  URL: string;
  /** Subject of the comment */
  Subject: string;
  /** Type of review */
  ReviewType: string;
  /** Review cycle number */
  ReviewCycle: number;
  /** The actual comment text */
  Comment: string;
  /** Date of the document */
  DocumentDate: string;
}

/**
 * Interface for plan review data from plan-review-2025-raw.json
 */
export interface PlanReview {
  /** Permit number identifier */
  PermitNum: string;
  /** Review cycle number */
  ReviewCycle: number;
  /** Type of review */
  ReviewType: string;
  /** Review team */
  ReviewTeam: string;
  /** Name of the reviewer */
  Reviewer: string;
  /** Date review team was assigned */
  ReviewTeamAssignDate: string;
  /** Date reviewer was assigned */
  ReviewerAssignDate: string;
  /** Date reviewer finished */
  ReviewerFinishDate: string;
  /** Description of review result */
  ReviewResultDesc: string;
  /** Review complexity code */
  ReviewComplexity: string;
  /** Description of review complexity */
  ReviewComplexityDesc: string;
  /** Review priority */
  ReviewPriority: string;
  /** Green building project indicator */
  GreenBuildingProject: string;
  /** Classification of the permit */
  PermitClass: string;
  /** Mapped permit class */
  PermitClassMapped: string;
  /** Mapped permit type */
  PermitTypeMapped: string;
  /** Description of permit type */
  PermitTypeDesc: string;
  /** Detailed description of the project */
  Description: string;
  /** Total days for plan review (can be string with commas) */
  TotalDaysPlanReview: string | number;
  /** Days for initial plan review */
  DaysInitialPlanReview: number;
  /** Days for city plan review */
  DaysPlanReviewCity: number;
  /** Days out for corrections (can be string with commas) */
  DaysOutCorrections: string | number;
  /** Number of review cycles */
  NumberReviewCycles: number;
  /** Date permit was applied for */
  AppliedDate: string;
  /** Date initial review was completed */
  InitialReviewCompleteDate: string;
  /** Date plan review was completed */
  PlanReviewCompleteDate: string;
  /** Date ready to issue */
  ReadyIssueDate: string;
  /** Date permit was issued */
  IssuedDate: string;
  /** Related MUP number */
  RelatedMup: string;
  /** Number of housing units removed */
  HousingUnitsRemoved: number;
  /** Number of housing units added */
  HousingUnitsAdded: number;
  /** Total number of housing units */
  HousingUnits: number;
  /** Zoning classification */
  Zoning: string;
  /** Type of dwelling unit */
  DwellingUnitType: string;
  /** Whether it's a standard plan */
  StandardPlan: boolean;
  /** Whether it's a dependent building */
  DependentBuilding: number;
  /** Parent permit number */
  ParentPermitNum: string;
  /** Original address line 1 */
  OriginalAddress1: string;
  /** Original city */
  OriginalCity: string;
  /** Original state */
  OriginalState: string;
  /** Original ZIP code (can be string with commas) */
  OriginalZip: string | number;
  /** Contractor company name */
  ContractorCompanyName: string;
  /** Link to permit details */
  Link: string;
  /** Latitude coordinate */
  Latitude: number;
  /** Longitude coordinate */
  Longitude: number;
  /** Housing category classification */
  HousingCategory: string;
}

/**
 * Type aliases for arrays of the permit data
 */
export type BuildingPermits = BuildingPermit[];
export type PlanComments = PlanComment[];
export type PlanReviews = PlanReview[];
