/**
 * Migration script: Picnic Sites to Seattle Civic Standard (SCS)
 *
 * Converts the existing PicnicSite interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity } from '../scs-model';
import type { PicnicSite } from '../data/picnic-sites';

/**
 * Creates a slug-friendly ID from the shelter name
 */
function createId(name: string, parkId: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `picnic-site-${slug}-${parkId}`;
}

/**
 * Builds description for picnic site
 */
function buildDescription(site: PicnicSite): string {
  let description = `${site['Shelter Name']} is a reservable picnic shelter`;

  if (site.Capacity) {
    description += ` with a capacity of ${site.Capacity} people`;
  }

  description += '.';

  if (site.Features && site.Features !== '') {
    description += ` Features include: ${site.Features}.`;
  }

  return description;
}

/**
 * Extracts features from picnic site data
 */
function extractFeatures(site: PicnicSite): string[] {
  const features: string[] = [];

  if (site['Sheltered Tables'] && site['Sheltered Tables'] !== '') {
    features.push(`${site['Sheltered Tables']} sheltered tables`);
  }

  if (site['Unsheltered Tables'] && site['Unsheltered Tables'] !== '') {
    features.push(`${site['Unsheltered Tables']} unsheltered tables`);
  }

  if (site.ADA && site.ADA !== '') {
    features.push('ADA accessible');
  }

  if (site.Features && site.Features !== '') {
    site.Features.split(',').forEach(feature => {
      features.push(feature.trim());
    });
  }

  return features;
}

/**
 * Extracts links/resources from picnic site data
 */
function extractLinks(site: PicnicSite): string[] {
  const links: string[] = [];

  if (site['Map Link'] && site['Map Link'] !== '') {
    // Clean up the map link (remove parentheses if present)
    const mapLink = site['Map Link'].replace(/^\(|\)$/g, '');
    links.push(mapLink);
  }

  if (site['Photo 1'] && site['Photo 1'] !== '') {
    links.push(site['Photo 1']);
  }

  if (site['Photo 2'] && site['Photo 2'] !== '') {
    links.push(site['Photo 2']);
  }

  if (site['Photo 3'] && site['Photo 3'] !== '') {
    links.push(site['Photo 3']);
  }

  if (site['Photo 4'] && site['Photo 4'] !== '') {
    links.push(site['Photo 4']);
  }

  return links;
}

/**
 * Migrates a single PicnicSite record to CivicEntity
 */
export function migratePicnicSite(site: PicnicSite): CivicEntity {
  const entity: CivicEntity = {
    // Required fields
    id: createId(site['Shelter Name'], site['Park xID']),
    name: site['Shelter Name'],
    type: 'Picnic Shelter',
    description: buildDescription(site),
    location: `Seattle Parks and Recreation - See map for location`,
    contact: {
      website: 'https://www.seattle.gov/parks/reserve/picnic-shelters'
    },

    // Recommended optional fields
    cost: site.Fee || 'Contact for pricing',
    accessibility: site.ADA && site.ADA !== '' ? 'ADA accessible' : 'Contact for accessibility information',
    organization: 'Seattle Parks and Recreation',
    tags: ['picnic shelter', 'parks', 'reservable', 'outdoor'],

    // Additional metadata
    features: extractFeatures(site),
    size: site.Capacity ? `${site.Capacity} person capacity` : undefined,
    links: extractLinks(site),
    howToAccess: 'Reservation required',
    registration: 'Reserve online at seattle.gov/parks',
  };

  return entity;
}

/**
 * Migrates all picnic sites to SCS format
 */
export function migrateAllPicnicSites(sites: PicnicSite[]): CivicEntity[] {
  return sites.map(migratePicnicSite);
}
