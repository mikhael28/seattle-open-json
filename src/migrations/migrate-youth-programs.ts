/**
 * Migration script: Youth Programs to Seattle Civic Standard (SCS)
 *
 * Converts the existing YouthProgram interface to SCS-compliant CivicEntity format
 * Note: YouthProgram is already quite close to SCS format!
 */

import type { CivicEntity, ScheduleInfo } from '../scs-model';
import type { YouthProgram } from '../data/youth-programs';

/**
 * Parses schedule from day and times fields
 */
function parseSchedule(program: YouthProgram): ScheduleInfo[] {
  if (program.day && program.times && program.day !== 'Varies' && program.times !== 'Varies') {
    return [{
      day: program.day,
      hours: program.times
    }];
  }
  return [];
}

/**
 * Builds comprehensive description
 */
function buildDescription(program: YouthProgram): string {
  let description = program.activityDescription || program.programDescription;

  if (!description) {
    description = `${program.activityName} is a youth program offered by ${program.organizationName}.`;
  }

  return description;
}

/**
 * Generates appropriate tags based on program info
 */
function generateTags(program: YouthProgram): string[] {
  const tags: string[] = ['youth program'];

  // Add activity-based tags
  const activityName = program.activityName.toLowerCase();
  if (activityName.includes('intern')) tags.push('internship');
  if (activityName.includes('sport')) tags.push('sports');
  if (activityName.includes('art')) tags.push('arts');
  if (activityName.includes('education') || activityName.includes('academic')) tags.push('education');
  if (activityName.includes('stem') || activityName.includes('science') || activityName.includes('tech')) {
    tags.push('stem');
  }
  if (activityName.includes('employment') || activityName.includes('job')) tags.push('employment');
  if (activityName.includes('volunteer')) tags.push('volunteer');

  // Check if free
  if (program.cost.toLowerCase().includes('free') || program.cost === '$0') {
    tags.push('free');
  }

  return tags;
}

/**
 * Migrates a single YouthProgram record to CivicEntity
 * This is a straightforward conversion since YouthProgram is already well-structured
 */
export function migrateYouthProgram(program: YouthProgram): CivicEntity {
  const entity: CivicEntity = {
    // Required fields
    id: program.id,
    name: program.activityName || program.programDescription,
    type: 'Youth Program',
    description: buildDescription(program),
    location: program.location,
    contact: {
      website: program.url || undefined
    },

    // Recommended optional fields
    schedule: parseSchedule(program),
    cost: program.cost,
    ageRange: program.ageRange,
    organization: program.organizationName,
    tags: generateTags(program),
    lastUpdated: program.lastUpdated,

    // Additional metadata
    notes: program.dates && program.dates !== 'Varies'
      ? `Program dates: ${program.dates}`
      : undefined,
  };

  return entity;
}

/**
 * Migrates all youth programs to SCS format
 */
export function migrateAllYouthPrograms(programs: YouthProgram[]): CivicEntity[] {
  return programs.map(migrateYouthProgram);
}
