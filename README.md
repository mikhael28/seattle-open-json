# Seattle Open JSON

🏙️ An open-source npm package & MCP server collecting information about government offices and services provided by the City of Seattle and other organizations in the Puget Sound region.

> **🤖 MCP Server Available**: See [`/mcp-server`](/mcp-server) for a ready-to-use Model Context Protocol server that exposes civic entity search, activity lookup, and permit data APIs for AI agents and applications.

## 📋 Overview

Seattle Open JSON provides structured, machine-readable information about youth initiatives, community resources, and recreational opportunities in the Seattle area. The package includes both raw data and TypeScript interfaces for type-safe development.

![Seattle Open JSON Dashboard](open-data-1.png)
![Seattle Open JSON Permit Explorer](open-data-2.png)

## 🚀 Installation in front-end

```bash
npm install seattle-open-json
```

For instructions about the MCP server, please refer to the README in the `mcp-server` folder.

## 📊 Data Collections

**12 datasets** with detailed information about Seattle's community resources and permit data:

| Dataset                | Records  | Description                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| **Community Centers**  | 27+      | Seattle Parks & Recreation community centers with schedules, amenities, and contact info |
| **Farmers Markets**    | 20+      | Local farmers markets with locations, schedules, and vendor information                  |
| **Parks Catalog**      | 2,200+   | Complete catalog of Seattle parks with facilities and amenities                          |
| **Mobile Recreation**  | 150+     | Mobile recreation programming across Seattle neighborhoods                               |
| **P-Patch Gardens**    | 90+      | Community gardens with plot information and contact details                              |
| **Picnic Sites**       | 50+      | Reservable picnic areas with capacity and amenities                                      |
| **Public Spaces**      | 40+      | Privately-owned public spaces available for community use                                |
| **Youth Programs**     | 60+      | Comprehensive youth programs, activities, and opportunities                              |
| **Emerald City Guide** | 480+     | Community resources and services directory                                               |
| **Building Permits**   | 1,000+   | Building permit applications with project details, costs, and review timelines           |
| **Plan Comments**      | 100,000+ | Plan review comments and corrections from permit review process                          |
| **Plan Review**        | 800,000+ | Detailed plan review records with reviewer assignments and completion status             |

## 🌟 Seattle Civic Standard (SCS)

All datasets are available in the **Seattle Civic Standard** format - a unified interface for civic data with 6 core fields:

1. **id** - Unique identifier
2. **name** - Entity name
3. **type** - Entity category
4. **description** - Plain language description
5. **location** - Address and/or coordinates
6. **contact** - Contact information

Plus optional fields like `schedule`, `dates`, `cost`, `ageRange`, `accessibility`, and more.

### Quick Start

```typescript
import { scsData } from "seattle-open-json";

// Access all 3,176+ civic entities in unified format
const allEntities = scsData.getAllEntities();

// Filter by cost
const freePrograms = allEntities.filter((entity) =>
  entity.cost?.toLowerCase().includes("free")
);

// Filter by age
const teenActivities = allEntities.filter(
  (entity) =>
    entity.ageRange?.includes("13") || entity.ageRange?.includes("teen")
);
```

## 🔧 Usage Examples

### Basic Import

```typescript
import seattleData from "seattle-open-json";

console.log(seattleData.data.communityCenters);
console.log(seattleData.data.youthPrograms);
```

### Named Imports

```typescript
import {
  communityCenters,
  farmersMarkets,
  youthPrograms,
} from "seattle-open-json";

const activeCenters = communityCenters.filter(
  (center) => center["Open Status"] === "Open"
);
```

### Finding Youth Programs by Age

```typescript
import { youth_programs } from "seattle-open-json";

const teenPrograms = youth_programs.filter(
  (program) =>
    program.ageRange.includes("13") || program.ageRange.includes("teen")
);
```

### Analyzing Building Permits

```typescript
import { buildingPermits } from "seattle-open-json";

const highValueResidential = buildingPermits.filter(
  (permit) =>
    permit.PermitClassMapped === "Residential" && permit.EstProjectCost > 500000
);
```

## 🗂️ Available Exports

### SCS Data Collections

```typescript
import { scsData } from "seattle-open-json";

const allEntities = scsData.getAllEntities();
const markets = scsData.farmersMarkets;
const centers = scsData.communityCenters;
```

### Original Data Collections

- `communityCenters`, `farmersMarkets`, `parksCatalog`, `mobileRecreationProgramming`
- `pPatch`, `picnicSites`, `privatelyOwnedPublicSpaces`, `youth_programs`
- `emeraldCityResourceGuide`, `buildingPermits`, `planComments`, `planReview`

### TypeScript Types

```typescript
import type {
  CivicEntity,
  YouthProgram,
  CommunityCenter,
  BuildingPermit,
  PlanComment,
} from "seattle-open-json";
```

## 📈 Package Statistics

```typescript
import { packageMetadata } from "seattle-open-json";
console.log(packageMetadata.totalRecords);
```

## 🤖 MCP Server

The `/mcp-server` directory contains an Express + TypeScript implementation that exposes three MCP tools for AI agents:

- **`searchCivicEntities`** - Query civic entities by type, tag, neighborhood, or keyword
- **`searchActivities`** - Search activities across parks, mobile recreation, and youth programs
- **`getPermitDetails`** - Fetch permit records with plan comments and review cycles

See the [MCP Server README](/mcp-server/README.md) for setup and API documentation.

## 🤝 Contributing

This is a community-driven project! We welcome contributions to add new data sources, improve data quality, and enhance TypeScript definitions.

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **Repository**: [https://github.com/mikhael28/seattle-open-json](https://github.com/mikhael28/seattle-open-json)
- **npm Package**: [https://www.npmjs.com/package/seattle-open-json](https://www.npmjs.com/package/seattle-open-json)

---

Built with ❤️ for the Seattle community by [Michael Nightingale](https://github.com/mikhael28)
