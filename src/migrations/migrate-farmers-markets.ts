/**
 * Migration script: Farmers Markets to Seattle Civic Standard (SCS)
 *
 * Converts the existing FarmersMarket interface to SCS-compliant CivicEntity format
 */

import type { CivicEntity, LocationInfo, ScheduleInfo } from '../scs-model';
import type { FarmersMarket } from '../data/farmers-markets';

/**
 * Converts Washington State Plane coordinates to latitude/longitude
 * Note: This is a simplified conversion. For production use, consider using a proper coordinate transformation library.
 */
function convertStateProxyToLatLng(x: number, y: number): { lat: number; lng: number } {
  // Washington State Plane North (EPSG:2926) to WGS84 conversion (approximation)
  const lng = (x - 1271000) / 100000 * 0.1 - 122.3;
  const lat = (y - 200000) / 100000 * 0.1 + 47.6;

  return { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) };
}

/**
 * Parses schedule information from farmers market data
 */
function parseSchedule(activeDay: string, hours: string, months: string): ScheduleInfo[] {
  const schedule: ScheduleInfo[] = [];

  if (activeDay && hours) {
    schedule.push({
      day: activeDay,
      hours: hours
    });
  }

  return schedule;
}

/**
 * Migrates a single FarmersMarket record to CivicEntity
 */
export function migrateFarmersMarket(market: FarmersMarket): CivicEntity {
  const coordinates = convertStateProxyToLatLng(market.x, market.y);

  const location: LocationInfo = {
    address: market.LOCATION,
    coordinates: coordinates
  };

  const description = market.ORGANIZATI
    ? `${market.NAME} farmers market operated by ${market.ORGANIZATI}. Open ${market.ACTIVEDAY} from ${market.HOURS}. ${market.MONTHS}.`
    : `${market.NAME} farmers market. Open ${market.ACTIVEDAY} from ${market.HOURS}. ${market.MONTHS}.`;

  const entity: CivicEntity = {
    // Required fields
    id: `farmers-market-${market.OBJECTID}`,
    name: market.NAME,
    type: 'Farmers Market',
    description: description,
    location: location,
    contact: {
      phone: market.PHONE || undefined,
      website: market.WEBSITE || undefined
    },

    // Recommended optional fields
    schedule: parseSchedule(market.ACTIVEDAY, market.HOURS, market.MONTHS),
    organization: market.ORGANIZATI || undefined,
    tags: ['farmers market', 'local food', 'community'],
    cost: 'Free to attend',

    // Additional metadata
    notes: market.MONTHS ? `Season: ${market.MONTHS}` : undefined,
  };

  return entity;
}

/**
 * Migrates all farmers markets to SCS format
 */
export function migrateAllFarmersMarkets(markets: FarmersMarket[]): CivicEntity[] {
  return markets.map(migrateFarmersMarket);
}
