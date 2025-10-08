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
} from './migrate-farmers-markets';

export {
  migratePPatch,
  migrateAllPPatches,
} from './migrate-p-patch';

export {
  migrateCommunityCenter,
  migrateAllCommunityCenters,
} from './migrate-community-centers';

export {
  migrateParksCatalogActivity,
  migrateAllParksCatalog,
} from './migrate-parks-catalog';

export {
  migratePicnicSite,
  migrateAllPicnicSites,
} from './migrate-picnic-sites';

export {
  migratePrivatelyOwnedPublicSpace,
  migrateAllPrivatelyOwnedPublicSpaces,
} from './migrate-privately-owned-public-spaces';

export {
  migrateMobileRecreationProgram,
  migrateAllMobileRecreationPrograms,
} from './migrate-mobile-recreation-programming';

export {
  migrateYouthProgram,
  migrateAllYouthPrograms,
} from './migrate-youth-programs';

export {
  migrateResourceGuide,
  migrateAllResourceGuides,
} from './migrate-emerald-city-resource-guide';

// Convenience function to migrate all data at once
import type { CivicEntity } from '../scs-model';
import { migrateAllFarmersMarkets } from './migrate-farmers-markets';
import { migrateAllPPatches } from './migrate-p-patch';
import { migrateAllCommunityCenters } from './migrate-community-centers';
import { migrateAllParksCatalog } from './migrate-parks-catalog';
import { migrateAllPicnicSites } from './migrate-picnic-sites';
import { migrateAllPrivatelyOwnedPublicSpaces } from './migrate-privately-owned-public-spaces';
import { migrateAllMobileRecreationPrograms } from './migrate-mobile-recreation-programming';
import { migrateAllYouthPrograms } from './migrate-youth-programs';
import { migrateAllResourceGuides } from './migrate-emerald-city-resource-guide';

import { farmersMarkets } from '../data/farmers-markets';
import { pPatch } from '../data/p-patch';
import { communityCenters } from '../data/community-centers';
import { parksCatalog } from '../data/parks-catalog';
import { picnicSites } from '../data/picnic-sites';
import { privatelyOwnedPublicSpaces } from '../data/privately-owned-public-spaces';
import { mobileRecreationProgramming } from '../data/mobile-recreation-programming';
import { youth_programs } from '../data/youth-programs';
import { emeraldCityResourceGuide } from '../data/emerald-city-resource-guide';

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
