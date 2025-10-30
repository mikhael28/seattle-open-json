/**
 * Seattle Youth Open Data - Lightweight Main Entry Point
 * 
 * This is a tree-shakeable entry point that only exports types and utilities.
 * Data must be imported explicitly from individual modules to avoid bundling unused data.
 * 
 * Usage:
 * ```typescript
 * // Import only what you need - tree-shakeable
 * import { CivicEntity } from 'seattle-open-json';
 * import { communityCenters } from 'seattle-open-json/community-centers';
 * import { youthPrograms } from 'seattle-open-json/youth-programs';
 * 
 * // Or import the lazy-loaded SCS data
 * import { loadScsData } from 'seattle-open-json/scs';
 * const scsData = await loadScsData();
 * ```
 */

// Export all TypeScript types (zero runtime cost)
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

// Export data-specific interfaces (zero runtime cost)
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

// Export permit data interfaces (zero runtime cost)
export type {
  BuildingPermit,
  PlanComment,
  PlanReview,
} from "./permit-data/permit-types.js";

// Export only migration functions (lightweight utilities)
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

// Export a function to get package metadata without loading data
export function getPackageMetadata() {
  return {
    name: "seattle-open-json",
    description: "Community-driven collection of youth opportunities and resources in Seattle",
    version: "1.3.7",
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
    dataSources: {
      communityCenters: "seattle-open-json/community-centers",
      farmersMarkets: "seattle-open-json/farmers-markets",
      parksCatalog: "seattle-open-json/parks-catalog",
      mobileRecreation: "seattle-open-json/mobile-recreation",
      pPatch: "seattle-open-json/p-patch",
      picnicSites: "seattle-open-json/picnic-sites",
      publicSpaces: "seattle-open-json/public-spaces",
      youthPrograms: "seattle-open-json/youth-programs",
      resourceGuide: "seattle-open-json/resource-guide",
      buildingPermits: "seattle-open-json/building-permits",
      planComments: "seattle-open-json/plan-comments",
      planReview: "seattle-open-json/plan-review",
      customerSupport: "seattle-open-json/customer-support",
      scsData: "seattle-open-json/scs",
    },
    lastUpdated: new Date().toISOString(),
  };
}

// Provide a warning for the old default export pattern
const legacyWarning = () => {
  console.warn(
    "⚠️ seattle-open-json: The default export loads all data and is deprecated.\n" +
    "For better performance and smaller bundles, import data explicitly:\n\n" +
    "import { communityCenters } from 'seattle-open-json/community-centers';\n" +
    "import { loadScsData } from 'seattle-open-json/scs';\n\n" +
    "See documentation for migration guide."
  );
};

export default {
  get data() {
    legacyWarning();
    throw new Error("Direct data access is deprecated. Import data from specific submodules.");
  },
  get opportunities() {
    legacyWarning(); 
    throw new Error("Direct data access is deprecated. Import data from specific submodules.");
  },
  metadata: getPackageMetadata(),
};
