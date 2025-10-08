/**
 * Seattle Youth Open Data - Main exports
 *
 * A community-driven collection of JSON data about youth initiatives,
 * events, and opportunities in the Seattle area.
 */

// Export Seattle Civic Standard Model interfaces
export type {
  CivicEntity,
  Coordinates,
  LocationInfo,
  ContactInfo,
  ScheduleInfo,
  DateRange,
  CivicEntityCollection,
  CivicEntityQuery,
} from "./scs-model";

// Export data-specific interfaces
export type { CommunityCenter } from "./data/community-centers";
export type { FarmersMarket } from "./data/farmers-markets";
export type { MobileRecreationProgramming } from "./data/mobile-recreation-programming";
export type { PPatch } from "./data/p-patch";
export type { PicnicSite } from "./data/picnic-sites";
export type { PrivatelyOwnedPublicSpace } from "./data/privately-owned-public-spaces";
export type { YouthProgram } from "./data/youth-programs";
export type { EmeraldCityResourceGuide } from "./data/emerald-city-resource-guide";
export type { ParksCatalog } from "./data/parks-catalog";

// Export permit data interfaces
export type {
  BuildingPermit,
  PlanComment,
  PlanReview,
} from "./permit-data/permit-types";

// Export Seattle Civic Standard migration functions
export {
  migrateAllSeattleData,
  getAllMigratedEntities,
  migrateAllFarmersMarkets,
  migrateAllPPatches,
  migrateAllCommunityCenters,
  migrateAllParksCatalog,
  migrateAllPicnicSites,
  migrateAllPrivatelyOwnedPublicSpaces,
  migrateAllMobileRecreationPrograms,
  migrateAllYouthPrograms,
  migrateAllResourceGuides,
} from "./migrations/index";

// Export data loading utilities

// Import all data objects from various src files
import { communityCenters } from "./data/community-centers";
import { farmersMarkets } from "./data/farmers-markets";
import { parksCatalog } from "./data/parks-catalog";
import { mobileRecreationProgramming } from "./data/mobile-recreation-programming";
import { pPatch } from "./data/p-patch";
import { picnicSites } from "./data/picnic-sites";
import { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces";
import { youth_programs } from "./data/youth-programs";
import { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide";

// Import permit data objects
import { buildingPermits } from "./data/building-permits";
import { planComments } from "./data/plan-comments";
import { planReview } from "./data/plan-review";

// Export individual data collections
export { communityCenters } from "./data/community-centers";
export { farmersMarkets } from "./data/farmers-markets";
export { parksCatalog } from "./data/parks-catalog";
export { mobileRecreationProgramming } from "./data/mobile-recreation-programming";
export { pPatch } from "./data/p-patch";
export { picnicSites } from "./data/picnic-sites";
export { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces";
export { youth_programs } from "./data/youth-programs";
export { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide";

// Export permit data collections
export { buildingPermits } from "./data/building-permits";
export { planComments } from "./data/plan-comments";
export { planReview } from "./data/plan-review";

// Combined dataset with all opportunities
export const allSeattleData = {
  communityCenters,
  farmersMarkets,
  parksCatalog,
  mobileRecreationProgramming,
  pPatch,
  picnicSites,
  privatelyOwnedPublicSpaces,
  youth_programs,
  emeraldCityResourceGuide,
  buildingPermits,
  planComments,
  planReview,
};

// Quick access arrays for different categories
export const recreationOpportunities = [
  ...communityCenters,
  ...parksCatalog,
  ...mobileRecreationProgramming,
];

export const communityResources = [
  ...farmersMarkets,
  ...pPatch,
  ...picnicSites,
  ...privatelyOwnedPublicSpaces,
  ...youth_programs,
];

export const allOpportunities = [
  ...recreationOpportunities,
  ...communityResources,
];

// Package metadata and statistics
export const packageMetadata = {
  name: "seattle-open-json",
  description:
    "Community-driven collection of youth opportunities and resources in Seattle",
  version: "1.2.0",
  totalRecords: {
    communityCenters: communityCenters.length,
    farmersMarkets: farmersMarkets.length,
    parksCatalog: parksCatalog.length,
    mobileRecreationProgramming: mobileRecreationProgramming.length,
    pPatch: pPatch.length,
    picnicSites: picnicSites.length,
    privatelyOwnedPublicSpaces: privatelyOwnedPublicSpaces.length,
    youth_programs: youth_programs.length,
    emeraldCityResourceGuide: emeraldCityResourceGuide.length,
    buildingPermits: buildingPermits.length,
    planComments: planComments.length,
    planReview: planReview.length,
    total: allOpportunities.length,
  },
  categories: [
    "Community Centers",
    "Farmers Markets",
    "Parks & Recreation",
    "Mobile Recreation Programming",
    "P-Patch Gardens",
    "Youth Organizations",
    "Picnic Sites",
    "Public Spaces",
    "Youth Programs",
    "Community Resources",
    "Building Permits",
    "Plan Comments",
    "Plan Review",
  ],
  lastUpdated: new Date().toISOString(),
};

// Seattle Civic Standard (SCS) pre-migrated data - NEW in v1.2.0
import {
  migrateAllSeattleData,
  getAllMigratedEntities,
} from "./migrations/index";

const _scsDataCache = migrateAllSeattleData();
const _allEntitiesCache = getAllMigratedEntities();

/**
 * Pre-migrated Seattle Civic Standard (SCS) data
 * All datasets converted to the unified CivicEntity format
 */
export const scsData = {
  /** All SCS entities as a flat array (3,176+ entities) */
  getAllEntities: () => _allEntitiesCache,

  /** Farmers Markets in SCS format (17 entities) */
  farmersMarkets: _scsDataCache.farmersMarkets,

  /** P-Patch Community Gardens in SCS format (86 entities) */
  pPatches: _scsDataCache.pPatches,

  /** Community Centers in SCS format (29 entities) */
  communityCenters: _scsDataCache.communityCenters,

  /** Parks & Recreation Activities in SCS format (2,228 entities) */
  parksCatalog: _scsDataCache.parksCatalog,

  /** Picnic Sites in SCS format (52 entities) */
  picnicSites: _scsDataCache.picnicSites,

  /** Privately-Owned Public Spaces in SCS format (44 entities) */
  privatelyOwnedPublicSpaces: _scsDataCache.privatelyOwnedPublicSpaces,

  /** Mobile Recreation Programs in SCS format (168 entities) */
  mobileRecreationPrograms: _scsDataCache.mobileRecreationPrograms,

  /** Youth Programs in SCS format (68 entities) */
  youthPrograms: _scsDataCache.youthPrograms,

  /** Community Resource Guides in SCS format (484 entities) */
  resourceGuides: _scsDataCache.resourceGuides,
};

// Default export
export default {
  data: allSeattleData,
  opportunities: {
    all: allOpportunities,
    recreation: recreationOpportunities,
    community: communityResources,
  },
  metadata: packageMetadata,
};
