/**
 * Migration script: Privately Owned Public Spaces to Seattle Civic Standard (SCS)
 *
 * Converts the existing PrivatelyOwnedPublicSpace interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, LocationInfo } from '../scs-model';
import type { PrivatelyOwnedPublicSpace } from '../data/privately-owned-public-spaces';

/**
 * Creates a slug-friendly ID from the space name
 */
function createId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `pops-${slug}`;
}

/**
 * Parses location string to extract coordinates
 * Expected format: "(lat, lng)"
 */
function parseLocation(locationStr: string): LocationInfo | string {
  const match = locationStr.match(/\(([^,]+),\s*([^)]+)\)/);

  if (match) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);

    if (!isNaN(lat) && !isNaN(lng)) {
      return {
        address: locationStr,
        coordinates: { lat, lng }
      };
    }
  }

  return locationStr;
}

/**
 * Builds description for the public space
 */
function buildDescription(space: PrivatelyOwnedPublicSpace): string {
  let description = `${space.name} is a privately-owned public space in Seattle's ${space.Neighborhood} neighborhood`;

  if (space.Benefit) {
    description += `, providing ${space.Benefit.toLowerCase()} amenities`;
  }

  description += `.`;

  if (space.Built) {
    description += ` Built in ${space.Built}.`;
  }

  if (space['Previous Names'] && space['Previous Names'] !== '') {
    description += ` Previously known as ${space['Previous Names']}.`;
  }

  return description;
}

/**
 * Migrates a single PrivatelyOwnedPublicSpace record to CivicEntity
 */
export function migratePrivatelyOwnedPublicSpace(space: PrivatelyOwnedPublicSpace): CivicEntity {
  const location = space.Location ? parseLocation(space.Location) : space.Address;

  const entity: CivicEntity = {
    // Required fields
    id: createId(space.name),
    name: space.name,
    type: 'Privately Owned Public Space',
    description: buildDescription(space),
    location: location,
    contact: {
      website: space.Website || 'http://www.seattle.gov/sdci/resources/privately-owned-public-spaces'
    },

    // Recommended optional fields
    organization: 'Seattle Department of Construction and Inspections',
    tags: [
      'public space',
      'privately owned',
      space.Benefit?.toLowerCase() || 'amenity',
      space.Neighborhood.toLowerCase()
    ].filter(Boolean),
    accessibility: 'Public access during business hours',

    // Additional metadata
    neighborhood: space.Neighborhood,
    features: space.Benefit ? [space.Benefit] : undefined,
    notes: [
      space.Built ? `Built: ${space.Built}` : undefined,
      space.Intersection ? `Near: ${space.Intersection}` : undefined,
      space['Previous Names'] ? `Previous names: ${space['Previous Names']}` : undefined
    ].filter(Boolean).join('. ') || undefined,
    links: space.Icon ? [space.Icon] : undefined,
  };

  return entity;
}

/**
 * Migrates all privately owned public spaces to SCS format
 */
export function migrateAllPrivatelyOwnedPublicSpaces(spaces: PrivatelyOwnedPublicSpace[]): CivicEntity[] {
  return spaces.map(migratePrivatelyOwnedPublicSpace);
}
