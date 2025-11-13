/**
 * Extended Ticket Tracking Interface
 * 
 * Adds detailed status tracking and progress visualization
 * to the base CustomerSupportTicket interface
 */

export type TicketStatus = 
  | "submitted"
  | "received" 
  | "assigned"
  | "in_progress"
  | "quality_check"
  | "completed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface TicketStatusStep {
  /** Unique identifier for this status step */
  status: TicketStatus;
  
  /** Display name for this step */
  label: string;
  
  /** Short description of what happens in this step */
  description: string;
  
  /** Timestamp when this step was reached (ISO format) */
  timestamp?: string;
  
  /** Whether this step is currently active */
  isActive: boolean;
  
  /** Whether this step has been completed */
  isCompleted: boolean;
  
  /** Optional notes or updates for this step */
  notes?: string;
  
  /** Name of the person/team handling this step */
  assignedTo?: string;
  
  /** Animated worker type for this step */
  workerAnimation?: WorkerAnimationType;
}

export type WorkerAnimationType =
  | "receiving"      // Office worker at desk receiving ticket
  | "reviewing"      // Manager reviewing clipboard
  | "shoveling"      // Worker shoveling dirt/filling pothole
  | "painting"       // Worker painting over graffiti
  | "climbing"       // Worker on ladder fixing street light
  | "pruning"        // Worker trimming tree
  | "inspecting"     // Inspector with clipboard checking work
  | "celebrating";   // Worker giving thumbs up

export interface TicketTrackerData {
  /** Current status of the ticket */
  currentStatus: TicketStatus;
  
  /** Priority level */
  priority: TicketPriority;
  
  /** Percentage completion (0-100) */
  progressPercentage: number;
  
  /** All status steps in order */
  steps: TicketStatusStep[];
  
  /** Estimated completion date */
  estimatedCompletionDate: string;
  
  /** Actual completion date (if completed) */
  actualCompletionDate?: string;
  
  /** Number of days since ticket was created */
  daysElapsed: number;
  
  /** Number of days remaining until estimated completion */
  daysRemaining: number;
  
  /** Special alerts or updates */
  alerts?: string[];
  
  /** Photo evidence URLs (for before/after) */
  photoEvidence?: {
    before?: string[];
    after?: string[];
  };
}

/**
 * Extended ticket interface that includes tracker data
 */
export interface TrackedTicket {
  /** Base ticket ID */
  id: string;
  
  /** Tracking data for visualization */
  tracker: TicketTrackerData;
  
  /** Last updated timestamp */
  lastUpdated: string;
}

/**
 * Configuration for different ticket types and their typical workflows
 */
export interface TicketWorkflowConfig {
  serviceType: string;
  steps: TicketStatus[];
  estimatedDays: number;
  workerAnimations: WorkerAnimationType[];
  stepDescriptions: string[];
}

/**
 * Default workflow configurations for common service types
 */
export const TICKET_WORKFLOWS: Record<string, TicketWorkflowConfig> = {
  "Pothole Repair": {
    serviceType: "Pothole Repair",
    steps: ["submitted", "received", "assigned", "in_progress", "quality_check", "completed"],
    estimatedDays: 14,
    workerAnimations: ["receiving", "reviewing", "shoveling", "shoveling", "inspecting", "celebrating"],
    stepDescriptions: [
      "Your request has been submitted",
      "City received your pothole report",
      "Crew assigned to repair",
      "Filling the pothole with asphalt",
      "Inspector verifying repair quality",
      "Repair complete! Road is smooth again"
    ]
  },
  "Graffiti Removal": {
    serviceType: "Graffiti Removal",
    steps: ["submitted", "received", "assigned", "in_progress", "completed"],
    estimatedDays: 5,
    workerAnimations: ["receiving", "reviewing", "painting", "painting", "celebrating"],
    stepDescriptions: [
      "Your graffiti report submitted",
      "City received your report",
      "Cleanup crew assigned",
      "Removing graffiti",
      "Surface cleaned! Looking good as new"
    ]
  },
  "Street Light Out": {
    serviceType: "Street Light Out",
    steps: ["submitted", "received", "assigned", "in_progress", "quality_check", "completed"],
    estimatedDays: 18,
    workerAnimations: ["receiving", "reviewing", "climbing", "climbing", "inspecting", "celebrating"],
    stepDescriptions: [
      "Light outage report submitted",
      "City electrical dept notified",
      "Electrician assigned to repair",
      "Replacing bulb/fixing wiring",
      "Testing light functionality",
      "Light restored! Shining bright"
    ]
  },
  "Tree Maintenance": {
    serviceType: "Tree Maintenance",
    steps: ["submitted", "received", "assigned", "in_progress", "quality_check", "completed"],
    estimatedDays: 45,
    workerAnimations: ["receiving", "reviewing", "pruning", "pruning", "inspecting", "celebrating"],
    stepDescriptions: [
      "Tree maintenance request submitted",
      "Urban forestry notified",
      "Arborist assigned",
      "Trimming/removing branches",
      "Arborist final inspection",
      "Tree maintenance complete!"
    ]
  },
  "Illegal Dumping": {
    serviceType: "Illegal Dumping",
    steps: ["submitted", "received", "assigned", "in_progress", "completed"],
    estimatedDays: 7,
    workerAnimations: ["receiving", "reviewing", "shoveling", "shoveling", "celebrating"],
    stepDescriptions: [
      "Illegal dumping reported",
      "Cleanup crew notified",
      "Team assigned to location",
      "Removing dumped materials",
      "Area cleaned and restored!"
    ]
  },
  "Parking Violation": {
    serviceType: "Parking Violation",
    steps: ["submitted", "received", "assigned", "completed"],
    estimatedDays: 2,
    workerAnimations: ["receiving", "reviewing", "inspecting", "celebrating"],
    stepDescriptions: [
      "Parking violation reported",
      "Parking enforcement notified",
      "Officer investigating",
      "Citation issued/vehicle moved"
    ]
  }
};

/**
 * Get the workflow configuration for a given service type
 */
export function getWorkflowConfig(serviceType: string): TicketWorkflowConfig {
  return TICKET_WORKFLOWS[serviceType] || TICKET_WORKFLOWS["Pothole Repair"];
}

/**
 * Calculate progress percentage based on current step
 */
export function calculateProgress(currentStatus: TicketStatus, totalSteps: number): number {
  const stepOrder: TicketStatus[] = ["submitted", "received", "assigned", "in_progress", "quality_check", "completed"];
  const currentIndex = stepOrder.indexOf(currentStatus);
  return Math.round(((currentIndex + 1) / totalSteps) * 100);
}


