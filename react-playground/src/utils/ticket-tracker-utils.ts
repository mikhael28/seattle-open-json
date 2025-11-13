/**
 * Utility functions for generating and managing ticket tracker data
 */

import { 
  TicketTrackerData, 
  TicketStatusStep, 
  TicketStatus,
  TicketPriority,
  TrackedTicket,
  getWorkflowConfig,
  calculateProgress
} from "../types/ticket-tracker";

/**
 * Generate tracker data for a new ticket
 */
export function generateTrackerData(
  serviceType: string,
  createdDate: string,
  estimatedDays: number
): TicketTrackerData {
  const config = getWorkflowConfig(serviceType);
  const now = new Date();
  const created = new Date(createdDate);
  const daysElapsed = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate estimated completion date
  const estimatedCompletion = new Date(created);
  estimatedCompletion.setDate(estimatedCompletion.getDate() + estimatedDays);
  
  const daysRemaining = Math.max(0, Math.floor((estimatedCompletion.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Determine current status based on elapsed time
  const progressRatio = daysElapsed / estimatedDays;
  const currentStepIndex = Math.min(
    Math.floor(progressRatio * config.steps.length),
    config.steps.length - 1
  );
  const currentStatus = config.steps[Math.max(0, currentStepIndex)];
  
  // Build status steps
  const steps: TicketStatusStep[] = config.steps.map((status, index) => {
    const isCompleted = index < currentStepIndex;
    const isActive = index === currentStepIndex;
    
    // Calculate when this step would have been reached
    let timestamp: string | undefined;
    if (isCompleted || isActive) {
      const stepDate = new Date(created);
      const daysToStep = (index / config.steps.length) * estimatedDays;
      stepDate.setDate(stepDate.getDate() + Math.floor(daysToStep));
      timestamp = stepDate.toISOString();
    }
    
    return {
      status,
      label: getStepLabel(status),
      description: config.stepDescriptions[index] || getDefaultDescription(status),
      timestamp,
      isActive,
      isCompleted,
      workerAnimation: config.workerAnimations[index],
      assignedTo: isActive || isCompleted ? getAssignedPerson(serviceType, status) : undefined,
      notes: isActive ? getActiveStepNotes(status) : undefined
    };
  });
  
  // Determine priority based on elapsed time vs estimated time
  let priority: TicketPriority = "medium";
  if (progressRatio > 1.2) {
    priority = "urgent";
  } else if (progressRatio > 0.9) {
    priority = "high";
  } else if (progressRatio < 0.3) {
    priority = "low";
  }
  
  // Generate alerts for overdue tickets
  const alerts: string[] = [];
  if (daysRemaining < 0) {
    alerts.push(`This ticket is ${Math.abs(daysRemaining)} days overdue. Our team is working to resolve it ASAP.`);
  } else if (daysRemaining <= 2 && currentStepIndex < config.steps.length - 1) {
    alerts.push(`Nearing estimated completion date. Team is making final preparations.`);
  }
  
  if (currentStepIndex === config.steps.length - 1) {
    alerts.push(`🎉 Great news! Your ${serviceType} request is complete!`);
  }
  
  return {
    currentStatus,
    priority,
    progressPercentage: calculateProgress(currentStatus, config.steps.length),
    steps,
    estimatedCompletionDate: estimatedCompletion.toISOString(),
    actualCompletionDate: currentStepIndex === config.steps.length - 1 ? new Date().toISOString() : undefined,
    daysElapsed,
    daysRemaining,
    alerts: alerts.length > 0 ? alerts : undefined
  };
}

/**
 * Simulate ticket progression for demo purposes
 * Advances the ticket by one step
 */
export function advanceTicketStatus(trackerData: TicketTrackerData, serviceType: string): TicketTrackerData {
  const config = getWorkflowConfig(serviceType);
  const currentStepIndex = trackerData.steps.findIndex(step => step.isActive);
  
  if (currentStepIndex === -1 || currentStepIndex >= config.steps.length - 1) {
    return trackerData; // Already at last step
  }
  
  const newSteps = trackerData.steps.map((step, index) => {
    if (index === currentStepIndex) {
      return {
        ...step,
        isActive: false,
        isCompleted: true
      };
    } else if (index === currentStepIndex + 1) {
      return {
        ...step,
        isActive: true,
        isCompleted: false,
        timestamp: new Date().toISOString(),
        assignedTo: getAssignedPerson(serviceType, step.status),
        notes: getActiveStepNotes(step.status)
      };
    }
    return step;
  });
  
  const newCurrentStatus = config.steps[currentStepIndex + 1];
  const newProgress = calculateProgress(newCurrentStatus, config.steps.length);
  
  // Check if completed
  const isCompleted = currentStepIndex + 1 === config.steps.length - 1;
  
  return {
    ...trackerData,
    currentStatus: newCurrentStatus,
    progressPercentage: newProgress,
    steps: newSteps,
    actualCompletionDate: isCompleted ? new Date().toISOString() : undefined,
    daysElapsed: trackerData.daysElapsed + 1,
    daysRemaining: Math.max(0, trackerData.daysRemaining - 1),
    alerts: isCompleted ? [`🎉 Great news! Your ${serviceType} request is complete!`] : trackerData.alerts
  };
}

/**
 * Get human-readable label for a status
 */
function getStepLabel(status: TicketStatus): string {
  const labels: Record<TicketStatus, string> = {
    submitted: "Submitted",
    received: "Received",
    assigned: "Assigned",
    in_progress: "In Progress",
    quality_check: "Quality Check",
    completed: "Completed"
  };
  return labels[status];
}

/**
 * Get default description for a status
 */
function getDefaultDescription(status: TicketStatus): string {
  const descriptions: Record<TicketStatus, string> = {
    submitted: "Your service request has been submitted",
    received: "City has received and logged your request",
    assigned: "A crew has been assigned to handle your request",
    in_progress: "Work is actively being performed",
    quality_check: "Inspector is verifying the quality of work",
    completed: "Your service request has been completed!"
  };
  return descriptions[status];
}

/**
 * Get assigned person/team name based on service type and status
 */
function getAssignedPerson(serviceType: string, status: TicketStatus): string {
  const teams: Record<string, Record<TicketStatus, string>> = {
    "Pothole Repair": {
      submitted: "Intake Team",
      received: "Street Maintenance",
      assigned: "Crew #4 - North District",
      in_progress: "Crew #4 - North District",
      quality_check: "Inspector J. Martinez",
      completed: "Street Maintenance"
    },
    "Graffiti Removal": {
      submitted: "Intake Team",
      received: "Public Works",
      assigned: "Cleanup Crew A",
      in_progress: "Cleanup Crew A",
      quality_check: "Quality Control",
      completed: "Public Works"
    },
    "Street Light Out": {
      submitted: "Intake Team",
      received: "Seattle City Light",
      assigned: "Electrician Team 2",
      in_progress: "Electrician Team 2",
      quality_check: "Electrical Inspector",
      completed: "Seattle City Light"
    }
  };
  
  return teams[serviceType]?.[status] || `${serviceType} Team`;
}

/**
 * Get notes for active status steps
 */
function getActiveStepNotes(status: TicketStatus): string | undefined {
  const notes: Partial<Record<TicketStatus, string>> = {
    in_progress: "Our crew is on-site working to resolve your issue",
    quality_check: "Inspector is conducting final verification",
    completed: "Thank you for helping keep Seattle great!"
  };
  return notes[status];
}

/**
 * Calculate realistic progression based on actual elapsed time
 * This makes the tracker feel more realistic
 */
export function updateTrackerWithElapsedTime(
  trackerData: TicketTrackerData,
  createdDate: string,
  estimatedDays: number,
  serviceType: string
): TicketTrackerData {
  return generateTrackerData(serviceType, createdDate, estimatedDays);
}


