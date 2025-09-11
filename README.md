# Seattle Youth Open Data

🏙️ A community-driven collection of JSON data about youth initiatives, events, and opportunities in the Seattle area.

## 📋 Overview

Seattle Youth Open Data provides structured, machine-readable information about youth initiatives, community resources, and recreational opportunities in the Seattle area. This package includes both raw data collections and comprehensive TypeScript interfaces for type-safe development.

## 🚀 Installation

```bash
npm install seattle-open-json
```

## 📖 Usage

### Basic Usage

```javascript
import seattleYouthData, {
  communityCenters,
  farmersMarkets,
  parksCatalog,
  allSeattleData,
} from "seattle-open-json";

// Get all data as a structured object
const allData = seattleYouthData.data;

// Access specific data collections
const centers = communityCenters;
const markets = farmersMarkets;
const parks = parksCatalog;

// Get combined datasets
const recreationSpots = seattleYouthData.opportunities.recreation;
const communityResources = seattleYouthData.opportunities.community;

// Get metadata
console.log(seattleYouthData.metadata);
```

### Working with Specific Data Types

```javascript
import {
  communityCenters,
  mobileRecreationProgramming,
  pPatch,
  picnicSites,
  youth_programs,
} from "seattle-open-json";

// Find open community centers
const openCenters = communityCenters.filter(
  center => center["Open Status"] === "Open"
);

// Find active recreation programs
const activePrograms = mobileRecreationProgramming.filter(
  program => program["Program Status"] === "Active"
);

// Find P-Patch gardens in specific neighborhoods
const magnoliaPatches = pPatch.filter(
  patch => patch.NEIGHB_NAME === "Magnolia"
);

// Find youth programs by age range
const teenPrograms = youth_programs.filter(
  program => program.ageRange.includes("13") || program.ageRange.includes("teen")
);

// Find free youth programs
const freePrograms = youth_programs.filter(
  program => program.cost.toLowerCase().includes("free")
);
```

### TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import {
  CommunityCenter,
  FarmersMarket,
  MobileRecreationProgramming,
  PPatch,
  PicnicSite,
  PrivatelyOwnedPublicSpace,
  ParksCatalog,
  YouthProgram as YouthProgramInterface,
  YouthOpportunity,
  YouthProgram as YouthProgramHSDS,
  SportsOpportunity,
  youth_programs,
} from "seattle-open-json";

// Type-safe data access
function findOpenCenters(centers: CommunityCenter[]): CommunityCenter[] {
  return centers.filter(center => center["Open Status"] === "Open");
}

// Working with HSDS-compliant data
function processYouthPrograms(programs: YouthProgramHSDS[]): YouthProgramHSDS[] {
  return programs.filter(program => program.ageRange.min >= 13);
}

// Working with structured youth programs
function findProgramsByAge(programs: YouthProgramInterface[], ageQuery: string): YouthProgramInterface[] {
  return programs.filter(program => program.ageRange.includes(ageQuery));
}

// Type-safe geographic data
function findNearbyParks(parks: ParksCatalog[], zipCode: string): ParksCatalog[] {
  return parks.filter(park => park.ZIP_CODE === zipCode);
}
```

## 📊 API Reference

### Data Collections

The package exports the following data collections:

| Export | Type | Description | Records |
|--------|------|-------------|---------|
| `communityCenters` | `CommunityCenter[]` | Seattle Parks community centers with schedules and amenities | 26+ |
| `farmersMarkets` | `FarmersMarket[]` | Farmers markets across Seattle with times and locations | 20+ |
| `parksCatalog` | `ParksCatalog[]` | Comprehensive parks database with facilities and features | 400+ |
| `mobileRecreationProgramming` | `MobileRecreationProgramming[]` | Mobile recreation programs and activities | 100+ |
| `pPatch` | `PPatch[]` | Community gardens and P-Patch locations | 90+ |
| `organizationData` | `object[]` | Youth organizations and resources | 50+ |
| `picnicSites` | `PicnicSite[]` | Reservable picnic areas and shelters | 200+ |
| `privatelyOwnedPublicSpaces` | `PrivatelyOwnedPublicSpace[]` | POPS locations downtown | 60+ |
| `youth_programs` | `YouthProgram[]` | Structured youth programs with detailed information | 300+ |

### TypeScript Interfaces

#### Core Data Types
```typescript
// Community centers with operating hours and amenities
interface CommunityCenter {
  OBJECTID: number;
  "Offical Name": string;
  Address: string;
  "Open Status": string;
  // ... extensive operating hours and facility data
}

// Farmers markets with schedules
interface FarmersMarket {
  OBJECTID: number;
  NAME: string;
  LOCATION: string;
  ACTIVEDAY: string;
  MONTHS: string;
  HOURS: string;
  // ... contact and coordinate data
}

// Parks with comprehensive facility information
interface ParksCatalog {
  OBJECTID: number;
  NAME: string;
  PARK_TYPE: string;
  ACREAGE: number;
  // ... extensive facilities and features data
}

// Structured youth programs with detailed activity information
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
```

#### HSDS-Compliant Types
The package also exports Human Services Data Specification (HSDS) types:
```typescript
interface Organization {
  id: string;
  name: string;
  description: string;
  // ... full HSDS organization schema
}

interface Service {
  id: string;
  organization_id: string;
  name: string;
  description: string;
  // ... full HSDS service schema
}
```

#### Youth-Focused Types
```typescript
interface BaseYouthOpportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  contact: ContactInfo;
  location: Location;
  ageRange: AgeRange;
  cost: "free" | "paid" | "sliding-scale";
  tags: string[];
  lastUpdated: string;
  source: string;
}

// Specialized opportunity types
interface YouthProgram extends BaseYouthOpportunity {
  type: "program";
  duration: string;
  schedule: string;
  applicationRequired: boolean;
}

interface YouthEvent extends BaseYouthOpportunity {
  type: "event";
  dateRange: DateRange;
  registrationRequired: boolean;
}
```

### Combined Exports

The package also provides convenient combined datasets:

```typescript
// All data in a structured object
const allSeattleData = {
  communityCenters,
  farmersMarkets,
  parksCatalog,
  mobileRecreationProgramming,
  pPatch,
  organizationData,
  picnicSites,
  privatelyOwnedPublicSpaces,
  seattleYouthOrganization,
  youth_programs,
};

// Pre-filtered arrays for common use cases
const recreationOpportunities = [
  ...communityCenters,
  ...parksCatalog,
  ...mobileRecreationProgramming,
];

const communityResources = [
  ...farmersMarkets,
  ...pPatch,
  ...picnicSites,
  ...privatelyOwnedPublicSpaces,
  ...organizationData,
  ...youth_programs,
];

// Complete combined dataset
const allOpportunities = [
  ...recreationOpportunities,
  ...communityResources,
];
```

### Package Metadata

```typescript
const packageMetadata = {
  name: "seattle-open-json",
  description: "Community-driven collection of youth opportunities and resources in Seattle",
  version: "1.0.0",
  totalRecords: {
    communityCenters: number,
    farmersMarkets: number,
    // ... counts for each data collection
    total: number,
  },
  categories: string[],
  lastUpdated: string, // ISO timestamp
};
```

## 🗂️ Data Categories

### Community Centers
- **26+ locations** across Seattle with detailed operating hours
- Facility amenities, capacity information, and emergency services
- Neighborhood-specific programming and accessibility features

### Recreation & Parks
- **400+ parks** in the Seattle Parks catalog with comprehensive facility data
- **100+ mobile recreation programs** with schedules and locations
- **200+ picnic sites** available for reservation

### Community Resources
- **20+ farmers markets** with seasonal schedules and vendor information
- **90+ P-Patch community gardens** with plot availability and contact details
- **60+ privately owned public spaces** (POPS) in downtown Seattle
- **50+ youth organizations** and mental health resources
- **300+ structured youth programs** with detailed activity descriptions

### Data Standards
- **HSDS-compliant** organization and service data
- Geographic coordinates and address standardization
- Consistent contact information and scheduling formats

## 🤝 Contributing

We welcome community contributions! Help us keep this data current and comprehensive.

### Adding New Opportunities

1. **Fork the repository**
2. **Add your data** to the appropriate JSON file in `/data/`
3. **Follow the schema** defined in `/src/types.ts`
4. **Validate your data** using `npm run validate-data`
5. **Submit a pull request**

### Data Guidelines

- ✅ **Accurate Information** - Verify all details before submitting
- ✅ **Current Data** - Include application deadlines and date ranges
- ✅ **Complete Contact Info** - Provide multiple ways to reach organizers
- ✅ **Specific Locations** - Include full addresses when possible
- ✅ **Clear Descriptions** - Help families understand what's offered

### File Structure

```
data/
├── sports/           # Youth sports programs
├── museums/          # Museum passes and programs
├── jobs/            # Employment opportunities
├── programs/        # General youth programs
└── events/          # One-time events
```

### Example Contribution

```json
{
  "id": "unique-identifier-2025",
  "type": "program",
  "title": "Your Program Name",
  "description": "Detailed description of the program...",
  "organization": "Organization Name",
  "contact": {
    "email": "contact@example.org",
    "phone": "(206) 555-0123",
    "website": "https://example.org"
  },
  "location": {
    "name": "Location Name",
    "address": "123 Main St",
    "city": "Seattle",
    "zipCode": "98101"
  },
  "ageRange": { "min": 10, "max": 16 },
  "cost": "free",
  "tags": ["tag1", "tag2"],
  "lastUpdated": "2025-09-11T00:00:00Z",
  "source": "https://source-url.com"
}
```

## 🛠️ Development

### Setup

```bash
git clone https://github.com/your-username/seattle-open-json.git
cd seattle-open-json
npm install
```

### Scripts

```bash
npm run build          # Compile TypeScript
npm run dev            # Watch mode for development
npm run validate-data  # Validate all JSON files
npm run test           # Run tests
npm run lint           # Lint code
npm run format         # Format code
```

### Data Validation

All data is automatically validated against the schema:

```bash
npm run validate-data
```

This checks for:

- Required fields
- Proper data types
- Valid date formats
- Consistent structure

## 📦 Publishing to NPM

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Install via `npm install -g npm`
3. **Authentication**: Login with `npm login`

### Pre-Publication Checklist

```bash
# 1. Ensure all tests pass
npm test

# 2. Build the package
npm run build

# 3. Validate data integrity
npm run validate-data

# 4. Check package contents
npm pack --dry-run

# 5. Verify package.json is correct
cat package.json
```

### Publishing Steps

#### 1. Update Version
```bash
# For patch releases (bug fixes)
npm version patch

# For minor releases (new features)
npm version minor

# For major releases (breaking changes)
npm version major
```

#### 2. Publish to NPM
```bash
# Publish to public npm registry
npm publish

# For scoped packages (if applicable)
npm publish --access public
```

#### 3. Verify Publication
```bash
# Check package on npm
npm view seattle-open-json

# Test installation
npm install seattle-open-json
```

### Package.json Configuration

Ensure your `package.json` includes these essential fields:

```json
{
  "name": "seattle-open-json",
  "version": "1.0.0",
  "description": "Community-driven collection of youth opportunities and resources in Seattle",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/**/*",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "seattle",
    "youth",
    "data",
    "community",
    "resources",
    "typescript",
    "hsds"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/seattle-youth-data.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/seattle-youth-data/issues"
  },
  "homepage": "https://github.com/your-username/seattle-youth-data#readme",
  "license": "MIT"
}
```

### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Version Management Best Practices

- **Semantic Versioning**: Follow [semver.org](https://semver.org)
  - `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- **Breaking Changes**: Increment major version
- **New Features**: Increment minor version  
- **Bug Fixes**: Increment patch version
- **Pre-releases**: Use `-alpha`, `-beta`, `-rc` suffixes

### Distribution Tags

```bash
# Publish as latest (default)
npm publish

# Publish as beta
npm publish --tag beta

# Publish as next
npm publish --tag next
```

## 📄 Data Sources

This package aggregates information from:

- Seattle Parks and Recreation
- YMCA of Greater Seattle
- Local museums and cultural institutions
- Community organizations
- Government youth programs

**Note**: Always verify current information with the providing organization before registering or applying.

## 📈 Roadmap

- [ ] Add more sports programs
- [ ] Include academic enrichment programs
- [ ] Add multilingual support
- [ ] Create web-based data browser
- [ ] Add geographic search capabilities
- [ ] Include public transit information

## ⚖️ License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

- **Issues**: [GitHub Issues](https://github.com/your-username/seattle-open-json/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/seattle-open-json/discussions)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

---

Made with ❤️ for Seattle youth and families. Help us grow this resource by contributing data about youth opportunities in your community!
