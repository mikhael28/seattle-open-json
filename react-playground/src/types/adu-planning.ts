/**
 * ADU Planning System Types
 *
 * This file defines the type system for the ADU (Accessory Dwelling Unit) planning
 * and permitting workflow in Seattle.
 */

export type TaskStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "blocked";

/**
 * Sub Task - Smallest unit of work within a Major Task
 */
export interface SubTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  required: boolean;
  order: number;
  /** Resources or links related to this sub-task */
  resources?: {
    title: string;
    url: string;
  }[];
  /** User notes for this subtask */
  notes?: string;
}

/**
 * Major Task - Represents a significant task within a Module
 */
export interface MajorTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
  /** Sub-tasks that make up this major task */
  subTasks?: SubTask[];
  /** Whether this task is conditional based on previous answers */
  conditional?: boolean;
  /** Condition that must be met for this task to be relevant */
  condition?: string;
  /** Resources or links related to this major task */
  resources?: {
    title: string;
    url: string;
  }[];
  /** Estimated time to complete */
  estimatedTime?: string;
  /** User notes for this task */
  notes?: string;
}

/**
 * Module - Represents a major stage/step in the ADU planning process
 */
export interface Module {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
  /** Major tasks within this module */
  majorTasks: MajorTask[];
  /** Icon name for visual representation */
  icon?: string;
  /** Estimated time to complete the entire module */
  estimatedTime?: string;
  /** Whether this module can be started (based on previous modules) */
  unlocked: boolean;
}

/**
 * Table row data for table-type questions
 */
export interface TableRowData {
  [columnId: string]: string | number;
}

/**
 * Questionnaire Answer Data
 * Stores all answers from the application detail questionnaire
 */
export interface QuestionnaireAnswers {
  [questionId: string]: string | number | boolean | TableRowData[];
}

/**
 * ADU Planning Session - Represents the entire planning workflow
 */
export interface ADUPlanningSession {
  id: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  modules: Module[];
  /** Overall progress percentage */
  progressPercentage: number;
  /** User data collected during the planning process */
  userData?: {
    propertyAddress?: string;
    lotSize?: string;
    zoningInfo?: string;
    hasCriticalAreas?: boolean;
    hasSignificantTrees?: boolean;
    isShorelineProperty?: boolean;
    eligibleForMiddleHousing?: boolean;
    buildOrRemodel?: "build" | "remodel";
    usingExpEditedPlan?: boolean;
    selectedExpEditedPlan?: string;
    aduDetails?: {
      dimensions?: string;
      height?: string;
      setbacks?: string;
      floors?: number;
      foundationType?: string;
    };
    siteLocation?: {
      latitude?: number;
      longitude?: number;
    };
    buildMethod?: "gc" | "self-managed";
    gcInfo?: {
      name?: string;
      preApproved?: boolean;
    };
  };
  /** Questionnaire answers from application detail form */
  questionnaireAnswers?: QuestionnaireAnswers;
}
