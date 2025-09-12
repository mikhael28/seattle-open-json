/**
 * Seattle Youth Open Data - Main exports
 *
 * A community-driven collection of JSON data about youth initiatives,
 * events, and opportunities in the Seattle area.
 */

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

// Export data loading utilities

// Import all data objects from various src files
import { communityCenters } from "./data/community-centers";
import { farmersMarkets } from "./data/farmers-markets";
import { parksCatalog } from "./data/parks-catalog";
import { mobileRecreationProgramming } from "./data/mobile-recreation-programming";
import { pPatch } from "./data/p-patch";
import { picnicSites } from "./data/picnic-sites";
import { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces";
import {
  seattleYouthOrganization,
  programs,
  services,
  locations,
  serviceAtLocations,
  contacts,
  taxonomyTerms,
  attributes,
  costOptions,
  requiredDocuments,
  organizationIdentifiers,
  serviceCapacities,
  metadataRecords,
  taxonomies,
  metaTableDescriptions,
  phoneNumbers,
  addresses,
  schedules,
  languages,
  accessibilityFeatures,
  serviceAreas,
  additionalUrls,
  fundingSources,
  seattleYouthHSDSExample,
} from "./hsds/hsds-example";
import { youth_programs } from "./data/youth-programs";
import { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide";

// Export individual data collections
export { communityCenters } from "./data/community-centers";
export { farmersMarkets } from "./data/farmers-markets";
export { parksCatalog } from "./data/parks-catalog";
export { mobileRecreationProgramming } from "./data/mobile-recreation-programming";
export { pPatch } from "./data/p-patch";
export { picnicSites } from "./data/picnic-sites";
export { privatelyOwnedPublicSpaces } from "./data/privately-owned-public-spaces";
// Export HSDS example data collections
export {
  seattleYouthOrganization,
  programs,
  services,
  locations,
  serviceAtLocations,
  contacts,
  taxonomyTerms,
  attributes,
  costOptions,
  requiredDocuments,
  organizationIdentifiers,
  serviceCapacities,
  metadataRecords,
  taxonomies,
  metaTableDescriptions,
  phoneNumbers,
  addresses,
  schedules,
  languages,
  accessibilityFeatures,
  serviceAreas,
  additionalUrls,
  fundingSources,
  seattleYouthHSDSExample,
} from "./hsds/hsds-example";
export { youth_programs } from "./data/youth-programs";
export { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide";

// Export HSDS (Human Services Data Specification) types and interfaces
export type {
  Organization,
  Service,
  ServiceAtLocation,
  Address,
  Phone,
  Contact,
  Schedule,
  Language,
  Accessibility,
  Program,
  Funding,
  TaxonomyTerm,
  Attribute,
  ServiceArea,
  Url,
  CostOption,
  RequiredDocument,
  Metadata,
  MetaTableDescription,
  Location,
  Taxonomy,
  OrganizationIdentifier,
  Unit,
  ServiceCapacity,
} from "./hsds/hsds";

// Combined dataset with all opportunities
export const allSeattleData = {
  communityCenters,
  farmersMarkets,
  parksCatalog,
  mobileRecreationProgramming,
  pPatch,
  picnicSites,
  privatelyOwnedPublicSpaces,
  seattleYouthOrganization,
  youth_programs,
  emeraldCityResourceGuide,
  // HSDS example data
  hsdsExample: seattleYouthHSDSExample,
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
  version: "1.0.3",
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
  ],
  lastUpdated: new Date().toISOString(),
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
