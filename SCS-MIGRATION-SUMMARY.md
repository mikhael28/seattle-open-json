# Seattle Civic Standard (SCS) Migration Summary

## Overview

This document summarizes the migration of Seattle Youth Data schemas to the Seattle Civic Standard (SCS) format. Nine unique data schemas have been analyzed and migration scripts have been created to transform them into SCS-compliant `CivicEntity` objects.

## What is the Seattle Civic Standard?

The Seattle Civic Standard (SCS) is a simple, practical framework for structuring civic data. It requires just **6 core fields**:

1. **id** - A unique identifier
2. **name** - What it's called
3. **type** - What kind of thing it is
4. **description** - What it is in plain English
5. **location** - Where it is (address and/or coordinates)
6. **contact** - How to get more information

Beyond these core fields, SCS supports optional fields like `schedule`, `cost`, `ageRange`, `accessibility`, and more.

## Migration Scripts Created

### 1. Farmers Markets (`migrate-farmers-markets.ts`)
- **Source Schema**: `FarmersMarket` interface with GIS coordinates
- **Key Transformations**:
  - Converts Washington State Plane coordinates (x, y) to lat/lng
  - Combines ACTIVEDAY, HOURS, and MONTHS into schedule
  - Maps ORGANIZATI to organization field
  - Generates descriptive text from structured fields

**Example Output**:
```json
{
  "id": "farmers-market-15",
  "name": "Ballard Farmers Market",
  "type": "Farmers Market",
  "location": {
    "address": "22nd Ave NW / NW Market St",
    "coordinates": { "lat": 47.6682, "lng": -122.3842 }
  },
  "schedule": [
    { "day": "Sunday", "hours": "9 am - 2 pm" }
  ],
  "cost": "Free to attend"
}
```

### 2. P-Patch Community Gardens (`migrate-p-patch.ts`)
- **Source Schema**: `PPatch` interface with GIS coordinates
- **Key Transformations**:
  - Converts State Plane coordinates to lat/lng
  - Extracts plot count and size information
  - Maps DEPT to managing organization
  - Handles affiliation data

### 3. Community Centers (`migrate-community-centers.ts`)
- **Source Schema**: `CommunityCenter` with complex weekly schedule
- **Key Transformations**:
  - Parses 7-day schedule with separate fields for each day
  - Consolidates "Open on [Day]" and "Open Hours on [Day]" into schedule array
  - Extracts capacity and emergency generator info into features
  - Maps neighborhood and district data

### 4. Parks Catalog (`migrate-parks-catalog.ts`)
- **Source Schema**: `ParksCatalog` with enrollment and fee data
- **Key Transformations**:
  - Formats age ranges from min/max values
  - Parses enrollment limits
  - Consolidates fee information
  - Maps grade levels to eligibility
  - Extracts instructor and session info

### 5. Picnic Sites (`migrate-picnic-sites.ts`)
- **Source Schema**: `PicnicSite` with capacity and photo data
- **Key Transformations**:
  - Extracts table counts into features
  - Maps ADA accessibility info
  - Collects photo URLs into links array
  - Formats capacity as size

### 6. Privately Owned Public Spaces (`migrate-privately-owned-public-spaces.ts`)
- **Source Schema**: `PrivatelyOwnedPublicSpace` with coordinate strings
- **Key Transformations**:
  - Parses location strings "(lat, lng)" into coordinates
  - Maps Benefit field to type and features
  - Preserves historical names
  - Adds neighborhood context

### 7. Mobile Recreation Programming (`migrate-mobile-recreation-programming.ts`)
- **Source Schema**: `MobileRecreationProgramming` with GIS data
- **Key Transformations**:
  - Converts State Plane coordinates
  - Parses date ranges from start/end dates
  - Maps program category to tags
  - Preserves partnership information

### 8. Youth Programs (`migrate-youth-programs.ts`)
- **Source Schema**: `YouthProgram` (already well-structured!)
- **Key Transformations**:
  - Minimal changes needed - schema already close to SCS
  - Maps activityName and programDescription to name/description
  - Generates smart tags based on activity type
  - Preserves all existing metadata

### 9. Emerald City Resource Guide (`migrate-emerald-city-resource-guide.ts`)
- **Source Schema**: `EmeraldCityResourceGuide` (very close to SCS!)
- **Key Transformations**:
  - Minimal changes needed
  - Parses hours into schedule format
  - Determines type from categories
  - Maps categories to tags

## File Structure

```
seattle-youth-data/
├── src/
│   ├── scs-model.ts                 # Core SCS TypeScript interfaces
│   ├── migrations/
│   │   ├── README.md                # Migration documentation
│   │   ├── index.ts                 # Main export file
│   │   ├── migrate-farmers-markets.ts
│   │   ├── migrate-p-patch.ts
│   │   ├── migrate-community-centers.ts
│   │   ├── migrate-parks-catalog.ts
│   │   ├── migrate-picnic-sites.ts
│   │   ├── migrate-privately-owned-public-spaces.ts
│   │   ├── migrate-mobile-recreation-programming.ts
│   │   ├── migrate-youth-programs.ts
│   │   └── migrate-emerald-city-resource-guide.ts
│   └── data/                        # Original data schemas (unchanged)
├── scripts/
│   └── generate-scs-data.ts         # Script to generate JSON outputs
└── scs-data/                        # Generated SCS-compliant JSON files (created on run)
```

## Usage

### Install Dependencies

```bash
npm install
```

This will install:
- `typescript` - TypeScript compiler
- `tsx` - TypeScript execution engine
- `@types/node` - Node.js type definitions

### Generate SCS Data

```bash
npm run generate:scs
```

This script will:
1. Run all migration functions
2. Generate individual JSON files for each dataset
3. Create a combined `all-seattle-civic-entities.json` file
4. Output migration statistics

### Programmatic Usage

```typescript
import { migrateAllSeattleData, getAllMigratedEntities } from './src/migrations';

// Get all migrated data organized by type
const allData = migrateAllSeattleData();
console.log(allData.farmersMarkets);

// Get all entities as a flat array
const allEntities = getAllMigratedEntities();
console.log(`Total entities: ${allEntities.length}`);
```

### Individual Dataset Migration

```typescript
import { migrateAllFarmersMarkets } from './src/migrations/migrate-farmers-markets';
import { farmersMarkets } from './src/data/farmers-markets';

const scsMarkets = migrateAllFarmersMarkets(farmersMarkets);
```

## Output Files

When you run `npm run generate:scs`, the following files are created in `scs-data/`:

- `farmers-markets.json` - All farmers markets in SCS format
- `p-patches.json` - All P-Patch community gardens
- `community-centers.json` - All community centers
- `parks-catalog.json` - All parks & recreation activities
- `picnic-sites.json` - All reservable picnic shelters
- `privately-owned-public-spaces.json` - All public spaces
- `mobile-recreation-programs.json` - All mobile recreation programs
- `youth-programs.json` - All youth programs
- `resource-guides.json` - All community resource listings
- `all-seattle-civic-entities.json` - Combined collection with metadata
- `migration-summary.json` - Statistics and metadata

## Data Statistics

After migration, you'll have access to all civic entities in a standardized format. Typical counts:
- Farmers Markets: ~17 entities
- P-Patches: ~86 entities
- Community Centers: ~25+ entities
- Parks Activities: 1000+ entities
- Picnic Sites: 100+ entities
- And more...

## Benefits of SCS Format

### For Developers
- ✅ Single, consistent interface to learn
- ✅ Works across all Seattle civic data sources
- ✅ TypeScript types included
- ✅ Easy to filter, search, and display

### For Applications
- ✅ Build once, works with all civic data
- ✅ Easy to combine different data sources
- ✅ Ready for maps (coordinates included where available)
- ✅ Ready for calendars (schedules standardized)

### For Data Publishers
- ✅ Simple to implement (just 6 required fields)
- ✅ No complex database needed
- ✅ Works with spreadsheets
- ✅ Extensible - add custom fields as needed

## Technical Details

### Coordinate Conversion

Several datasets use Washington State Plane North (EPSG:2926) coordinates. A simplified conversion function is included:

```typescript
function convertStateProxyToLatLng(x: number, y: number): { lat: number; lng: number }
```

**Note**: This is an approximation. For production use, consider using `proj4js` or a similar library for accurate coordinate transformation.

### Type Safety

All migration functions are fully typed with TypeScript. The core `CivicEntity` interface ensures type safety:

```typescript
interface CivicEntity {
  // Required
  id: string;
  name: string;
  type: string;
  description: string;
  location: string | LocationInfo;
  contact: ContactInfo;

  // Optional
  schedule?: ScheduleInfo[];
  dates?: DateRange;
  cost?: string;
  ageRange?: string;
  // ... and more
}
```

## Next Steps

### Recommended Improvements

1. **Coordinate Accuracy**: Implement `proj4js` for precise coordinate transformations
2. **Data Validation**: Add JSON Schema validation for SCS compliance
3. **Testing**: Create unit tests for each migration function
4. **Coverage Reports**: Generate reports showing which fields are populated
5. **Export Formats**: Add CSV, GeoJSON export options
6. **API**: Create a simple API to serve SCS data

### Integration Ideas

- Build a map showing all civic entities
- Create a calendar view of programs and events
- Build a search/filter interface
- Generate neighborhood guides
- Create accessibility-focused views
- Build age-appropriate program finders

## Questions?

For more information about the Seattle Civic Standard, see:
- `seattle-civic-standard.md` - Full SCS specification
- `src/scs-model.ts` - TypeScript interface definitions
- `src/migrations/README.md` - Detailed migration documentation

## License

MIT License - See LICENSE file for details
