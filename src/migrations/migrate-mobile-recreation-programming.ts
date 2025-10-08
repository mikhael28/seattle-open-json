/**
 * Migration script: Mobile Recreation Programming to Seattle Civic Standard (SCS)
 *
 * Converts the existing MobileRecreationProgramming interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, DateRange, LocationInfo } from '../scs-model';
import type { MobileRecreationProgramming } from '../data/mobile-recreation-programming';

/**
 * Creates a slug-friendly ID from the program
 */
function createId(program: MobileRecreationProgramming): string {
  const name = program['Program Title'] || program.Name;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `mobile-rec-${slug}-${program.OBJECTID}`;
}

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
 * Builds location with coordinates if available
 */
function buildLocation(program: MobileRecreationProgramming): string | LocationInfo {
  const address = program['Program Location'] || program.location;

  if (program.x && program.y) {
    const coordinates = convertStateProxyToLatLng(program.x, program.y);
    return {
      address: address,
      coordinates: coordinates
    };
  }

  return address;
}

/**
 * Parses date range from start and end dates
 */
function parseDateRange(program: MobileRecreationProgramming): DateRange | undefined {
  if (program['Start Date'] && program['End Date']) {
    return {
      start: program['Start Date'],
      end: program['End Date']
    };
  }
  return undefined;
}

/**
 * Builds description combining program info
 */
function buildDescription(program: MobileRecreationProgramming): string {
  let description = program.description || program['Program Title'] || program.Name;

  if (program['Program Category'] && program['Program Category'] !== '') {
    description += ` This is a ${program['Program Category'].toLowerCase()} program.`;
  }

  if (program.Partnerships && program.Partnerships !== '') {
    description += ` In partnership with ${program.Partnerships}.`;
  }

  return description;
}

/**
 * Migrates a single MobileRecreationProgramming record to CivicEntity
 */
export function migrateMobileRecreationProgram(program: MobileRecreationProgramming): CivicEntity {
  const entity: CivicEntity = {
    // Required fields
    id: createId(program),
    name: program['Program Title'] || program.Name,
    type: 'Mobile Recreation Program',
    description: buildDescription(program),
    location: buildLocation(program),
    contact: {
      phone: program['Program Contact'] || undefined,
      website: program['OAMR Website Link'] || undefined
    },

    // Recommended optional fields
    dates: parseDateRange(program),
    schedule: program['Activity Days']
      ? [{ day: program['Activity Days'], hours: 'See program details' }]
      : undefined,
    organization: 'Seattle Parks and Recreation',
    tags: [
      'mobile recreation',
      program['Program Category']?.toLowerCase() || 'recreation',
      program['Funding Type']?.toLowerCase() || ''
    ].filter(Boolean),

    // Additional metadata
    notes: [
      program['Program Status'] ? `Status: ${program['Program Status']}` : undefined,
      program.Partnerships ? `Partners: ${program.Partnerships}` : undefined,
      program.Notes || undefined,
      program['Funding Type'] ? `Funding: ${program['Funding Type']}` : undefined,
      program['Grant Awardee Point of Contact']
        ? `Grant contact: ${program['Grant Awardee Point of Contact']}`
        : undefined
    ].filter(Boolean).join('. ') || undefined,
  };

  return entity;
}

/**
 * Migrates all mobile recreation programs to SCS format
 */
export function migrateAllMobileRecreationPrograms(programs: MobileRecreationProgramming[]): CivicEntity[] {
  return programs.map(migrateMobileRecreationProgram);
}
