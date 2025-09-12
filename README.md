# Seattle Open JSON

🏙️ A comprehensive, community-driven collection of JSON data about youth initiatives, community resources, and recreational opportunities in the Seattle area.

## 📋 Overview

Seattle Open JSON provides structured, machine-readable information about youth initiatives, community resources, and recreational opportunities in the Seattle area. This package includes both raw data collections and comprehensive TypeScript interfaces for type-safe development.

## 🚀 Installation

```bash
npm install seattle-open-json
```

## 📊 Data Collections

This package contains **11 comprehensive datasets** with detailed information about Seattle's community resources:

| Dataset                | Records | Description                                                                              |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------- |
| **Community Centers**  | 27+     | Seattle Parks & Recreation community centers with schedules, amenities, and contact info |
| **Farmers Markets**    | 20+     | Local farmers markets with locations, schedules, and vendor information                  |
| **Parks Catalog**      | 400+    | Complete catalog of Seattle parks with facilities and amenities                          |
| **Mobile Recreation**  | 150+    | Mobile recreation programming across Seattle neighborhoods                               |
| **P-Patch Gardens**    | 90+     | Community gardens with plot information and contact details                              |
| **Picnic Sites**       | 200+    | Reservable picnic areas with capacity and amenities                                      |
| **Public Spaces**      | 40+     | Privately-owned public spaces available for community use                                |
| **Youth Programs**     | 1000+   | Comprehensive youth programs, activities, and opportunities                              |
| **Emerald City Guide** | 1400+   | Community resources and services directory                                               |
| **HSDS Example**       | 1       | Human Services Data Specification compliant organization data                            |

## 🔧 Usage

### Basic Import

```typescript
import seattleData from "seattle-open-json";

// Access all data
console.log(seattleData.data);

// Access specific collections
console.log(seattleData.data.communityCenters);
console.log(seattleData.data.youthPrograms);

// Access metadata
console.log(seattleData.metadata);
```

### Named Imports

```typescript
import {
  communityCenters,
  farmersMarkets,
  youthPrograms,
  packageMetadata,
} from "seattle-open-json";

// Use individual collections
const activeCenters = communityCenters.filter(
  (center) => center["Open Status"] === "Open"
);

const weekendMarkets = farmersMarkets.filter(
  (market) =>
    market.ACTIVEDAY.includes("Saturday") || market.ACTIVEDAY.includes("Sunday")
);
```

### Categorized Access

```typescript
import { recreationOpportunities, communityResources } from "seattle-open-json";

// Recreation-focused data (community centers, parks, mobile programming)
const recreationData = recreationOpportunities;

// Community resources (farmers markets, P-patches, youth programs, etc.)
const communityData = communityResources;
```

## 📝 TypeScript Interfaces

### Core Data Types

```typescript
// Youth Programs
interface YouthProgram {
  id: string;
  organizationName: string;
  programDescription: string;
  activityName: string;
  activityDescription: string;
  location: string;
  ageRange: string;
  dates: string;
  day: string;
  times: string;
  cost: string;
  url: string;
  lastUpdated: string;
}

// Community Centers
interface CommunityCenter {
  OBJECTID: number;
  "Offical Name": string;
  Address: string;
  "Short Name": string;
  "CC Phone Number": string;
  "Open Status": string;
  "Scheduling Season": string;
  // ... additional schedule and amenity fields
}

// Farmers Markets
interface FarmersMarket {
  OBJECTID: number;
  NAME: string;
  LOCATION: string;
  ORGANIZATI: string;
  ACTIVEDAY: string;
  MONTHS: string;
  HOURS: string;
  WEBSITE: string;
  PHONE: string;
  x: number;
  y: number;
}

// Community Resources
interface EmeraldCityResourceGuide {
  name: string;
  website?: string;
  phone?: string;
  address?: string;
  hours?: string;
  description: string;
  categories: string[];
}
```

### HSDS (Human Services Data Specification) Types

For organizations following the HSDS standard:

```typescript
import {
  Organization,
  Service,
  Location,
  Contact,
  Program,
  Schedule
} from "seattle-open-json";

// Fully compliant HSDS organization structure
const organization: Organization = {
  id: string;
  name: string;
  description: string;
  email?: string;
  website?: string;
  // ... additional HSDS fields
};
```

### Using HSDS Mock Data

```typescript
import {
  seattleYouthHSDSExample,
  programs,
  services,
  locations,
  contacts,
} from "seattle-open-json";

// Access complete HSDS dataset
console.log(seattleYouthHSDSExample.organization);
console.log(seattleYouthHSDSExample.services);

// Access individual HSDS collections
const youthPrograms = programs.filter((program) =>
  program.name.toLowerCase().includes("youth")
);

const contactInfo = contacts.find(
  (contact) => contact.name === "Program Director"
);

// Find services by location
const seattleServices = services.filter((service) =>
  locations.some(
    (location) => location.id === service.id && location.city === "Seattle"
  )
);
```

## 🎯 Common Use Cases

### Finding Youth Programs by Age

```typescript
import { youth_programs } from "seattle-open-json";

const teenPrograms = youth_programs.filter(
  (program) =>
    program.ageRange.includes("13") ||
    program.ageRange.includes("teen") ||
    program.ageRange.includes("14-18")
);
```

### Finding Open Community Centers

```typescript
import { communityCenters } from "seattle-open-json";

const openCenters = communityCenters.filter(
  (center) => center["Open Status"] === "Open"
);

const centersWithGyms = communityCenters.filter(
  (center) => center["Gym"] === "Yes"
);
```

### Finding Weekend Activities

```typescript
import { farmersMarkets, mobileRecreationProgramming } from "seattle-open-json";

const weekendMarkets = farmersMarkets.filter(
  (market) =>
    market.ACTIVEDAY.toLowerCase().includes("saturday") ||
    market.ACTIVEDAY.toLowerCase().includes("sunday")
);

const weekendRecreation = mobileRecreationProgramming.filter(
  (program) =>
    program["Day of Week"].includes("Saturday") ||
    program["Day of Week"].includes("Sunday")
);
```

### Searching Community Resources

```typescript
import { emeraldCityResourceGuide } from "seattle-open-json";

const mentalHealthResources = emeraldCityResourceGuide.filter((resource) =>
  resource.categories.some(
    (category) =>
      category.toLowerCase().includes("mental health") ||
      category.toLowerCase().includes("counseling")
  )
);

const foodResources = emeraldCityResourceGuide.filter((resource) =>
  resource.categories.some(
    (category) =>
      category.toLowerCase().includes("food") ||
      category.toLowerCase().includes("nutrition")
  )
);
```

## 🗂️ Available Exports

### Data Collections

- `communityCenters` - Seattle community centers
- `farmersMarkets` - Local farmers markets
- `parksCatalog` - Complete parks catalog
- `mobileRecreationProgramming` - Mobile recreation programs
- `pPatch` - Community gardens
- `picnicSites` - Reservable picnic areas
- `privatelyOwnedPublicSpaces` - POPS locations
- `youth_programs` - Youth programs and activities
- `emeraldCityResourceGuide` - Community resources directory
- `seattleYouthOrganization` - HSDS example organization

### HSDS Mock Data Collections

Complete HSDS-compliant example data for testing and development:

- `programs` - Example youth programs
- `services` - Detailed service offerings
- `locations` - Physical locations and addresses
- `serviceAtLocations` - Service-location relationships
- `contacts` - Contact information
- `taxonomyTerms` - Service categorization
- `attributes` - Additional service attributes
- `costOptions` - Pricing information
- `requiredDocuments` - Required documentation
- `organizationIdentifiers` - Organization IDs
- `serviceCapacities` - Capacity information
- `metadataRecords` - Data provenance
- `taxonomies` - Taxonomy definitions
- `metaTableDescriptions` - Schema descriptions
- `phoneNumbers` - Phone contact details
- `addresses` - Physical addresses
- `schedules` - Operating schedules
- `languages` - Supported languages
- `accessibilityFeatures` - Accessibility information
- `serviceAreas` - Geographic coverage
- `additionalUrls` - Additional web resources
- `fundingSources` - Funding information
- `seattleYouthHSDSExample` - Complete HSDS dataset

### Aggregated Collections

- `allSeattleData` - All datasets combined
- `recreationOpportunities` - Recreation-focused data
- `communityResources` - Community service data
- `allOpportunities` - All opportunities combined

### TypeScript Types

All interfaces are exported for type-safe development:

- Core data types: `YouthProgram`, `CommunityCenter`, `FarmersMarket`, etc.
- HSDS types: `Organization`, `Service`, `Location`, `Contact`, etc.

### Metadata

- `packageMetadata` - Package information and statistics

## 📈 Package Statistics

```typescript
import { packageMetadata } from "seattle-open-json";

console.log(packageMetadata.totalRecords);
// {
//   communityCenters: 27,
//   farmersMarkets: 23,
//   parksCatalog: 485,
//   mobileRecreationProgramming: 156,
//   pPatch: 91,
//   picnicSites: 201,
//   privatelyOwnedPublicSpaces: 40,
//   youth_programs: 1105,
//   emeraldCityResourceGuide: 1421,
//   total: 2018
// }
```

## 🤝 Contributing

This is a community-driven project! We welcome contributions to:

- Add new data sources
- Improve data quality
- Enhance TypeScript definitions
- Add utility functions

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **Repository**: [https://github.com/mikhael28/seattle-open-json](https://github.com/mikhael28/seattle-open-json)
- **npm Package**: [https://www.npmjs.com/package/seattle-open-json](https://www.npmjs.com/package/seattle-open-json)

---

Built with ❤️ for the Seattle community by [Michael Nightingale](https://github.com/mikhael28)
