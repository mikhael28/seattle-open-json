/**
 * Seattle Civic Standard (SCS) Migration Scripts
 *
 * This module provides migration functions to convert existing Seattle youth data
 * schemas into the Seattle Civic Standard (SCS) format.
 *
 * Each migration script analyzes the unique structure of its source data model
 * and maps it to the standardized SCS CivicEntity interface, ensuring compliance
 * with the 6 core required fields:
 * 1. id - unique identifier
 * 2. name - what it's called
 * 3. type - what kind of thing it is
 * 4. description - what it is in plain English
 * 5. location - where it is (address and/or coordinates)
 * 6. contact - how to get more information
 *
 * Usage:
 * ```typescript
 * import { migrateAllFarmersMarkets } from './migrations';
 * import { farmersMarkets } from './data/farmers-markets';
 *
 * const scsCompliantMarkets = migrateAllFarmersMarkets(farmersMarkets);
 * ```
 */

// Export individual migration functions
export {
  migrateFarmersMarket,
  migrateAllFarmersMarkets,
} from './migrate-farmers-markets.js';

export {
  migratePPatch,
  migrateAllPPatches,
} from './migrate-p-patch.js';

export {
  migrateCommunityCenter,
  migrateAllCommunityCenters,
} from './migrate-community-centers.js';

export {
  migrateParksCatalogActivity,
  migrateAllParksCatalog,
} from './migrate-parks-catalog.js';

export {
  migratePicnicSite,
  migrateAllPicnicSites,
} from './migrate-picnic-sites.js';

export {
  migratePrivatelyOwnedPublicSpace,
  migrateAllPrivatelyOwnedPublicSpaces,
} from './migrate-privately-owned-public-spaces.js';

export {
  migrateMobileRecreationProgram,
  migrateAllMobileRecreationPrograms,
} from './migrate-mobile-recreation-programming.js';

export {
  migrateYouthProgram,
  migrateAllYouthPrograms,
} from './migrate-youth-programs.js';

export {
  migrateResourceGuide,
  migrateAllResourceGuides,
} from './migrate-emerald-city-resource-guide.js';

// Convenience function to migrate all data at once
import type { CivicEntity } from '../scs-model.js';
import { migrateAllFarmersMarkets } from './migrate-farmers-markets.js';
import { migrateAllPPatches } from './migrate-p-patch.js';
import { migrateAllCommunityCenters } from './migrate-community-centers.js';
import { migrateAllParksCatalog } from './migrate-parks-catalog.js';
import { migrateAllPicnicSites } from './migrate-picnic-sites.js';
import { migrateAllPrivatelyOwnedPublicSpaces } from './migrate-privately-owned-public-spaces.js';
import { migrateAllMobileRecreationPrograms } from './migrate-mobile-recreation-programming.js';
import { migrateAllYouthPrograms } from './migrate-youth-programs.js';
import { migrateAllResourceGuides } from './migrate-emerald-city-resource-guide.js';

import { farmersMarkets } from '../data/farmers-markets.js';
import { pPatch } from '../data/p-patch.js';
import { communityCenters } from '../data/community-centers.js';
import { parksCatalog } from '../data/parks-catalog.js';
import { picnicSites } from '../data/picnic-sites.js';
import { privatelyOwnedPublicSpaces } from '../data/privately-owned-public-spaces.js';
import { mobileRecreationProgramming } from '../data/mobile-recreation-programming.js';
import { youth_programs } from '../data/youth-programs.js';
import { emeraldCityResourceGuide } from '../data/emerald-city-resource-guide.js';

/**
 * Migrates all Seattle data to SCS-compliant CivicEntity format
 *
 * @returns Object containing all migrated datasets
 */
export function migrateAllSeattleData() {
  return {
    farmersMarkets: migrateAllFarmersMarkets(farmersMarkets),
    pPatches: migrateAllPPatches(pPatch),
    communityCenters: migrateAllCommunityCenters(communityCenters),
    parksCatalog: migrateAllParksCatalog(parksCatalog),
    picnicSites: migrateAllPicnicSites(picnicSites),
    privatelyOwnedPublicSpaces: migrateAllPrivatelyOwnedPublicSpaces(privatelyOwnedPublicSpaces),
    mobileRecreationPrograms: migrateAllMobileRecreationPrograms(mobileRecreationProgramming),
    youthPrograms: migrateAllYouthPrograms(youth_programs),
    resourceGuides: migrateAllResourceGuides(emeraldCityResourceGuide),
  };
}

/**
 * Returns all migrated data as a single flat array of CivicEntity objects
 *
 * @returns Array of all CivicEntity objects from all datasets
 */
export function getAllMigratedEntities(): CivicEntity[] {
  const allData = migrateAllSeattleData();

  return [
    ...allData.farmersMarkets,
    ...allData.pPatches,
    ...allData.communityCenters,
    ...allData.parksCatalog,
    ...allData.picnicSites,
    ...allData.privatelyOwnedPublicSpaces,
    ...allData.mobileRecreationPrograms,
    ...allData.youthPrograms,
    ...allData.resourceGuides,
  ];
}
