/**
 * Seattle Youth Open Data - Main exports
 *
 * A community-driven collection of JSON data about youth initiatives,
 * events, and opportunities in the Seattle area.
 */

// Export Seattle Civic Standard Model interfaces
export type {
  CivicEntity,
  CivicTicket,
  Coordinates,
  LocationInfo,
  ContactInfo,
  ScheduleInfo,
  DateRange,
  CivicEntityCollection,
  CivicEntityQuery,
} from "./scs-model.js";

// Export data-specific interfaces
export type { CommunityCenter } from "./data/community-centers.js";
export type { FarmersMarket } from "./data/farmers-markets.js";
export type { MobileRecreationProgramming } from "./data/mobile-recreation-programming.js";
export type { PPatch } from "./data/p-patch.js";
export type { PicnicSite } from "./data/picnic-sites.js";
export type { PrivatelyOwnedPublicSpace } from "./data/privately-owned-public-spaces.js";
export type { YouthProgram } from "./data/youth-programs.js";
export type { EmeraldCityResourceGuide } from "./data/emerald-city-resource-guide.js";
export type { ParksCatalog } from "./data/parks-catalog.js";
export type { CustomerSupportTicket } from "./data/customer-support-types.js";

// Export permit data interfaces
export type {
  BuildingPermit,
  PlanComment,
  PlanReview,
} from "./permit-data/permit-types.js";

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
  migrateAllCustomerSupportTickets,
  migrateCustomerSupportTicket,
} from "./migrations/index.js";

// Export data loading utilities

// Import all data objects from various src files
import { communityCenters } from "./data/community-centers.js";
import { farmersMarkets } from "./data/farmers-markets.js";
import { parksCatalog } from "./data/parks-catalog.js";
import { mobileRecreationProgramming } from "./data/mobile-recreation-programming.js";
import { pPatch } from "./data/p-patch.js";
import { picnicSites } from "./data/picnic-sites.js";
import { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces.js";
import { youth_programs } from "./data/youth-programs.js";
import { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide.js";

// Import permit data objects
import { buildingPermits } from "./data/building-permits.js";
import { planComments } from "./data/plan-comments.js";
import { planReview } from "./data/plan-review.js";

// Import customer support data
import { customerSupport } from "./data/customer-support.js";

// Export individual data collections
export { communityCenters } from "./data/community-centers.js";
export { farmersMarkets } from "./data/farmers-markets.js";
export { parksCatalog } from "./data/parks-catalog.js";
export { mobileRecreationProgramming } from "./data/mobile-recreation-programming.js";
export { pPatch } from "./data/p-patch.js";
export { picnicSites } from "./data/picnic-sites.js";
export { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces.js";
export { youth_programs } from "./data/youth-programs.js";
export { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide.js";

// Export permit data collections
export { buildingPermits } from "./data/building-permits.js";
export { planComments } from "./data/plan-comments.js";
export { planReview } from "./data/plan-review.js";

// Export customer support data collection
export { customerSupport } from "./data/customer-support.js";

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
  customerSupport,
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
    customerSupport: customerSupport.length,
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
    "Customer Support Tickets",
  ],
  lastUpdated: new Date().toISOString(),
};

// Seattle Civic Standard (SCS) pre-migrated data - NEW in v1.2.0
import {
  migrateAllSeattleData,
  getAllMigratedEntities,
} from "./migrations/index.js";

const _scsDataCache = migrateAllSeattleData();
const _allEntitiesCache = getAllMigratedEntities();

/**
 * Pre-migrated Seattle Civic Standard (SCS) data
 * All datasets converted to the unified CivicEntity format
 */
export const scsData = {
  /** All SCS entities as a flat array (3,176+ entities, plus customer support tickets) */
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

  /** Customer Support Tickets in SCS CivicTicket format (100,000+ tickets) */
  customerSupportTickets: _scsDataCache.customerSupportTickets,
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
