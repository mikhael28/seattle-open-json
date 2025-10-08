/**
 * Migration script: P-Patch Community Gardens to Seattle Civic Standard (SCS)
 *
 * Converts the existing PPatch interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, LocationInfo } from '../scs-model';
import type { PPatch } from '../data/p-patch';

/**
 * Converts Washington State Plane coordinates to latitude/longitude
 */
function convertStateProxyToLatLng(x: number, y: number): { lat: number; lng: number } {
  // Washington State Plane North (EPSG:2926) to WGS84 conversion (approximation)
  const lng = (x - 1271000) / 100000 * 0.1 - 122.3;
  const lat = (y - 200000) / 100000 * 0.1 + 47.6;

  return { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) };
}

/**
 * Creates a slug-friendly ID from the patch name
 */
function createId(name: string, siteId: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `p-patch-${slug}-${siteId}`;
}

/**
 * Migrates a single PPatch record to CivicEntity
 */
export function migratePPatch(patch: PPatch): CivicEntity {
  const coordinates = convertStateProxyToLatLng(patch.x, patch.y);

  const location: LocationInfo = {
    address: patch.ADDRESS,
    coordinates: coordinates
  };

  // Build description
  let description = `${patch.NAME} is a P-Patch community garden in Seattle`;
  if (patch.DATE_ESTAB) {
    description += `, established in ${patch.DATE_ESTAB}`;
  }
  description += `.`;

  if (patch.NUMPLOTS && patch.NUMPLOTS !== 0) {
    description += ` Features ${patch.NUMPLOTS} garden plots`;
  }
  if (patch.SIZE_SQFT) {
    description += ` spanning ${patch.SIZE_SQFT} square feet`;
  }
  description += `.`;

  // Build features list
  const features: string[] = [];
  if (patch.IN_ROW === 'Yes') {
    features.push('Right-of-way garden');
  }
  if (patch.AFFILIATION) {
    features.push(`Affiliated with ${patch.AFFILIATION}`);
  }

  const entity: CivicEntity = {
    // Required fields
    id: createId(patch.NAME, patch.SITE_ID),
    name: patch.NAME,
    type: 'P-Patch Community Garden',
    description: description,
    location: location,
    contact: {
      website: patch.URL || undefined
    },

    // Recommended optional fields
    organization: 'Seattle P-Patch Program',
    tags: ['community garden', 'p-patch', 'urban farming', 'gardening'],
    cost: 'Plot rental fees apply',
    accessibility: patch.AFFILIATION ? `Affiliated with ${patch.AFFILIATION}` : undefined,

    // Additional metadata
    features: features.length > 0 ? features : undefined,
    size: patch.SIZE_SQFT ? `${patch.SIZE_SQFT} sq ft` : undefined,
    notes: [
      patch.NUMPLOTS && patch.NUMPLOTS !== 0 ? `${patch.NUMPLOTS} plots available` : undefined,
      patch.DATE_ESTAB ? `Established: ${patch.DATE_ESTAB}` : undefined,
      patch.DEPT ? `Managed by: ${patch.DEPT}` : undefined,
      patch.AFFILIATION_URL ? `Affiliation website: ${patch.AFFILIATION_URL}` : undefined
    ].filter(Boolean).join('. ') || undefined,

    neighborhood: patch.LOCATION || undefined,
  };

  return entity;
}

/**
 * Migrates all P-Patch gardens to SCS format
 */
export function migrateAllPPatches(patches: PPatch[]): CivicEntity[] {
  return patches.map(migratePPatch);
}
