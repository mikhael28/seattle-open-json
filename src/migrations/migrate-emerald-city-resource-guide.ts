/**
 * Migration script: Emerald City Resource Guide to Seattle Civic Standard (SCS)
 *
 * Converts the existing EmeraldCityResourceGuide interface to SCS-compliant CivicEntity format
 * Note: This is already very close to SCS format!
 */

import type { CivicEntity, ScheduleInfo } from '../scs-model';
import type { EmeraldCityResourceGuide } from '../data/emerald-city-resource-guide';

/**
 * Creates a slug-friendly ID from the resource name
 */
function createId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `resource-${slug}`;
}

/**
 * Parses schedule from hours field
 */
function parseSchedule(hours?: string): ScheduleInfo[] {
  if (!hours) return [];

  // Handle 24/7 case
  if (hours === '24/7') {
    return [{
      day: 'Daily',
      hours: '24/7'
    }];
  }

  // Try to parse day and hours
  // Example: "Mon. – Fri., 9 a.m. – 5 p.m."
  const dayHoursMatch = hours.match(/^([^,]+),\s*(.+)$/);
  if (dayHoursMatch) {
    return [{
      day: dayHoursMatch[1].trim(),
      hours: dayHoursMatch[2].trim()
    }];
  }

  // If we can't parse it, just use the whole string as hours
  return [{
    day: 'See details',
    hours: hours
  }];
}

/**
 * Determines the primary type based on categories
 */
function determineType(categories: string[]): string {
  if (categories.includes('Emergency and Crisis Lines')) {
    return 'Emergency Service';
  }
  if (categories.includes('Mental Health Services')) {
    return 'Mental Health Service';
  }
  if (categories.includes('Housing and Shelter')) {
    return 'Housing Service';
  }
  if (categories.includes('Food Resources')) {
    return 'Food Resource';
  }
  if (categories.includes('Legal Services')) {
    return 'Legal Service';
  }
  if (categories.includes('Health Services')) {
    return 'Health Service';
  }

  return 'Community Resource';
}

/**
 * Migrates a single EmeraldCityResourceGuide record to CivicEntity
 * This is a straightforward conversion since the schema is already close
 */
export function migrateResourceGuide(resource: EmeraldCityResourceGuide): CivicEntity {
  const entity: CivicEntity = {
    // Required fields
    id: createId(resource.name),
    name: resource.name,
    type: determineType(resource.categories),
    description: resource.description,
    location: resource.address || 'Seattle, WA',
    contact: {
      phone: resource.phone || undefined,
      website: resource.website || undefined
    },

    // Recommended optional fields
    schedule: parseSchedule(resource.hours),
    tags: resource.categories.map(cat => cat.toLowerCase()),
    accessibility: resource.hours === '24/7' ? 'Available 24/7' : undefined,
    cost: 'Free',

    // Additional metadata
    notes: resource.hours && resource.hours !== '24/7'
      ? `Hours: ${resource.hours}`
      : undefined,
  };

  return entity;
}

/**
 * Migrates all resource guide entries to SCS format
 */
export function migrateAllResourceGuides(resources: EmeraldCityResourceGuide[]): CivicEntity[] {
  return resources.map(migrateResourceGuide);
}
