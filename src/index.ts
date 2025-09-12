/**
 * Seattle Youth Open Data - Main exports
 *
 * A community-driven collection of JSON data about youth initiatives,
 * events, and opportunities in the Seattle area.
 */

// Export data-specific interfaces
export type { CommunityCenter } from "./community-centers";
export type { FarmersMarket } from "./farmers-markets";
export type { MobileRecreationProgramming } from "./mobile-recreation-programming";
export type { PPatch } from "./p-patch";
export type { PicnicSite } from "./picnic-sites";
export type { PrivatelyOwnedPublicSpace } from "./privately-owned-public-spaces";
export type { YouthProgram } from "./youth-programs";
export type { EmeraldCityResourceGuide } from "./data/emerald-city-resource-guide";
export type { ParksCatalog } from "./parks-catalog";

// Export data loading utilities

// Import all data objects from various src files
import { communityCenters } from "./community-centers";
import { farmersMarkets } from "./farmers-markets";
import { parksCatalog } from "./parks-catalog";
import { mobileRecreationProgramming } from "./mobile-recreation-programming";
import { pPatch } from "./p-patch";
import { picnicSites } from "./picnic-sites";
import { privatelyOwnedPublicSpaces } from "./privately-owned-public-spaces";
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
} from "./hsds-example";
import { youth_programs } from "./youth-programs";
import { emeraldCityResourceGuide } from "./data/emerald-city-resource-guide";

// Export individual data collections
export { communityCenters } from "./community-centers";
export { farmersMarkets } from "./farmers-markets";
export { parksCatalog } from "./parks-catalog";
export { mobileRecreationProgramming } from "./mobile-recreation-programming";
export { pPatch } from "./p-patch";
export { picnicSites } from "./picnic-sites";
export { privatelyOwnedPublicSpaces } from "./privately-owned-public-spaces";
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
} from "./hsds-example";
export { youth_programs } from "./youth-programs";
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
} from "./hsds";

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
