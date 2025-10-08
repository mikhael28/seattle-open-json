/**
 * Migration script: Parks Catalog (Activities) to Seattle Civic Standard (SCS)
 *
 * Converts the existing ParksCatalog interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, DateRange, ScheduleInfo } from '../scs-model';
import type { ParksCatalog } from '../data/parks-catalog';

/**
 * Creates a slug-friendly ID from the activity
 */
function createId(activity: ParksCatalog): string {
  const slug = activity.ActivityName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `parks-activity-${slug}-${activity.Activity_ID}`;
}

/**
 * Formats age range from min/max values
 */
function formatAgeRange(activity: ParksCatalog): string {
  const minAge = activity.AgesMin;
  const maxAge = activity.AgesMax;

  if (minAge === 0 && maxAge === 0) {
    return 'All ages';
  }

  if (minAge === maxAge) {
    return `${minAge} years`;
  }

  if (maxAge === 0 || maxAge === 999) {
    return `${minAge}+ years`;
  }

  return `${minAge}-${maxAge} years`;
}

/**
 * Parses schedule information
 */
function parseSchedule(activity: ParksCatalog): ScheduleInfo[] {
  const schedule: ScheduleInfo[] = [];

  if (activity.WeekDays && activity.StartingTime && activity.EndingTime) {
    schedule.push({
      day: activity.WeekDays,
      hours: `${activity.StartingTime} - ${activity.EndingTime}`
    });
  }

  return schedule;
}

/**
 * Parses date range
 */
function parseDateRange(activity: ParksCatalog): DateRange | undefined {
  if (activity.BeginningDate && activity.EndingDate) {
    return {
      start: activity.BeginningDate,
      end: activity.EndingDate
    };
  }
  return undefined;
}

/**
 * Formats cost information
 */
function formatCost(activity: ParksCatalog): string {
  if (activity.FeeSummary && activity.FeeSummary !== '') {
    return activity.FeeSummary;
  }

  const total = activity.KeyFeesTotal + activity.OtherFeesTotal;
  if (total === 0) {
    return 'Free';
  }

  return `$${total.toFixed(2)}`;
}

/**
 * Builds description combining activity and fee description
 */
function buildDescription(activity: ParksCatalog): string {
  let description = activity.Description || activity.ActivityName;

  if (activity.CategoryName && activity.CategoryName !== '') {
    description += ` This is a ${activity.CategoryName.toLowerCase()} activity.`;
  }

  return description;
}

/**
 * Migrates a single ParksCatalog record to CivicEntity
 */
export function migrateParksCatalogActivity(activity: ParksCatalog): CivicEntity {
  const entity: CivicEntity = {
    // Required fields
    id: createId(activity),
    name: activity.ActivityName,
    type: activity.Type || 'Recreation Activity',
    description: buildDescription(activity),
    location: activity.ActivityLocation || 'Seattle Parks and Recreation',
    contact: {
      website: activity.PublicURL || undefined
    },

    // Recommended optional fields
    schedule: parseSchedule(activity),
    dates: parseDateRange(activity),
    cost: formatCost(activity),
    ageRange: formatAgeRange(activity),
    organization: 'Seattle Parks and Recreation',
    tags: [
      'parks',
      'recreation',
      activity.CategoryName?.toLowerCase() || 'activity',
      activity.SeasonName?.toLowerCase() || ''
    ].filter(Boolean),

    // Additional metadata
    eligibility: activity.GradeMin && activity.GradeMax
      ? `Grades ${activity.GradeMin} - ${activity.GradeMax}`
      : undefined,
    hoursPerWeek: activity.NumberOfHours || undefined,
    sessionCount: activity.NumberOfDates || undefined,
    notes: [
      activity.PrimaryInstructorName ? `Instructor: ${activity.PrimaryInstructorName}` : undefined,
      activity.EnrollMin && activity.EnrollMax !== 'Unlimited'
        ? `Enrollment: ${activity.EnrollMin}-${activity.EnrollMax} participants`
        : undefined,
      activity.NumberEnrolled ? `Currently enrolled: ${activity.NumberEnrolled}` : undefined,
      activity.SeasonName ? `Season: ${activity.SeasonName}` : undefined,
      activity.FeeDescription || undefined
    ].filter(Boolean).join('. ') || undefined,
  };

  return entity;
}

/**
 * Migrates all parks catalog activities to SCS format
 */
export function migrateAllParksCatalog(activities: ParksCatalog[]): CivicEntity[] {
  return activities.map(migrateParksCatalogActivity);
}
