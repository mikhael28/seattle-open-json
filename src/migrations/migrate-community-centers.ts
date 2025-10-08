/**
 * Migration script: Community Centers to Seattle Civic Standard (SCS)
 *
 * Converts the existing CommunityCenter interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, ScheduleInfo } from '../scs-model';
import type { CommunityCenter } from '../data/community-centers';

/**
 * Creates a slug-friendly ID from the center name
 */
function createId(name: string, objectId: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `community-center-${slug}-${objectId}`;
}

/**
 * Parses weekly schedule from community center data
 */
function parseSchedule(center: CommunityCenter): ScheduleInfo[] {
  const schedule: ScheduleInfo[] = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  days.forEach((day) => {
    const isOpenKey = `Open on ${day}` as keyof CommunityCenter;
    const hoursKey = `Open Hours on ${day}` as keyof CommunityCenter;

    const isOpen = center[isOpenKey];
    const hours = center[hoursKey];

    if (isOpen === 'Yes' && hours && hours !== 'N/A' && hours !== '') {
      schedule.push({
        day: day,
        hours: String(hours)
      });
    }
  });

  return schedule;
}

/**
 * Builds a comprehensive description for the community center
 */
function buildDescription(center: CommunityCenter): string {
  let description = `${center.name} is a community center in Seattle's ${center.Neighborhood} neighborhood`;

  if (center['CC Type']) {
    description += `, serving as a ${center['CC Type'].toLowerCase()}`;
  }

  description += '.';

  if (center.Notice && center.Notice !== 'N/A' && center.Notice !== '') {
    description += ` ${center.Notice}`;
  }

  return description;
}

/**
 * Extracts features from community center data
 */
function extractFeatures(center: CommunityCenter): string[] {
  const features: string[] = [];

  if (center['Emergency Generator'] === 'Yes') {
    features.push('Emergency generator available');
  }

  if (center['Building Occupancy Capacity'] && center['Building Occupancy Capacity'] !== 'N/A') {
    features.push(`Capacity: ${center['Building Occupancy Capacity']} people`);
  }

  return features;
}

/**
 * Migrates a single CommunityCenter record to CivicEntity
 */
export function migrateCommunityCenter(center: CommunityCenter): CivicEntity {
  const schedule = parseSchedule(center);

  const entity: CivicEntity = {
    // Required fields
    id: createId(center.name, center.OBJECTID),
    name: center.name,
    type: 'Community Center',
    description: buildDescription(center),
    location: center.Address,
    contact: {
      phone: center['CC Phone Number'] || undefined
    },

    // Recommended optional fields
    schedule: schedule.length > 0 ? schedule : undefined,
    organization: 'Seattle Parks and Recreation',
    tags: ['community center', 'recreation', 'programs', center.Neighborhood.toLowerCase()],
    accessibility: 'Contact center for accessibility information',

    // Additional metadata
    features: extractFeatures(center),
    neighborhood: center.Neighborhood,
    notes: [
      center['Open Status'] ? `Status: ${center['Open Status']}` : undefined,
      center['Operational Status'] ? `Operational Status: ${center['Operational Status']}` : undefined,
      center['Park District'] ? `Park District: ${center['Park District']}` : undefined,
      center['Total Hours of Operation'] ? `Total weekly hours: ${center['Total Hours of Operation']}` : undefined
    ].filter(Boolean).join('. ') || undefined,
  };

  return entity;
}

/**
 * Migrates all community centers to SCS format
 */
export function migrateAllCommunityCenters(centers: CommunityCenter[]): CivicEntity[] {
  return centers.map(migrateCommunityCenter);
}
