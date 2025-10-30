/**
 * Seattle Civic Standard (SCS) Data Loader
 * 
 * Provides lazy-loaded access to pre-migrated SCS data.
 * Data is only loaded when explicitly requested.
 */

import type { CivicEntity, CivicTicket } from "./scs-model.js";

interface ScsDataCollection {
  getAllEntities: () => CivicEntity[];
  farmersMarkets: CivicEntity[];
  pPatches: CivicEntity[];
  communityCenters: CivicEntity[];
  parksCatalog: CivicEntity[];
  picnicSites: CivicEntity[];
  privatelyOwnedPublicSpaces: CivicEntity[];
  mobileRecreationPrograms: CivicEntity[];
  youthPrograms: CivicEntity[];
  resourceGuides: CivicEntity[];
  customerSupportTickets: CivicTicket[];
}

let _scsDataCache: ScsDataCollection | null = null;

/**
 * Load all SCS data on demand.
 * This function imports and migrates all data sources only when called.
 * The data is cached after first load for subsequent calls.
 * 
 * @returns Promise<ScsDataCollection> Pre-migrated SCS data
 * 
 * @example
 * ```typescript
 * import { loadScsData } from 'seattle-open-json/scs';
 * 
 * const scsData = await loadScsData();
 * const freePrograms = scsData.getAllEntities()
 *   .filter(entity => entity.cost?.toLowerCase().includes('free'));
 * ```
 */
export async function loadScsData(): Promise<ScsDataCollection> {
  if (_scsDataCache) {
    return _scsDataCache;
  }

  // Dynamically import the migration module
  const { migrateAllSeattleData, getAllMigratedEntities } = await import("./migrations/index.js");
  
  const migrated = migrateAllSeattleData();
  const allEntities = getAllMigratedEntities();

  _scsDataCache = {
    getAllEntities: () => allEntities,
    farmersMarkets: migrated.farmersMarkets,
    pPatches: migrated.pPatches,
    communityCenters: migrated.communityCenters,
    parksCatalog: migrated.parksCatalog,
    picnicSites: migrated.picnicSites,
    privatelyOwnedPublicSpaces: migrated.privatelyOwnedPublicSpaces,
    mobileRecreationPrograms: migrated.mobileRecreationPrograms,
    youthPrograms: migrated.youthPrograms,
    resourceGuides: migrated.resourceGuides,
    customerSupportTickets: migrated.customerSupportTickets,
  };

  return _scsDataCache;
}

/**
 * Load specific SCS dataset on demand.
 * 
 * @param dataset Name of the dataset to load
 * @returns Promise<CivicEntity[] | CivicTicket[]> The requested dataset
 * 
 * @example
 * ```typescript
 * import { loadScsDataset } from 'seattle-open-json/scs';
 * 
 * const centers = await loadScsDataset('communityCenters');
 * ```
 */
export async function loadScsDataset(
  dataset: keyof Omit<ScsDataCollection, 'getAllEntities'>
): Promise<CivicEntity[] | CivicTicket[]> {
  const scs = await loadScsData();
  return scs[dataset];
}

/**
 * Clear the SCS data cache to free memory.
 * Useful in memory-constrained environments or tests.
 */
export function clearScsCache(): void {
  _scsDataCache = null;
}
