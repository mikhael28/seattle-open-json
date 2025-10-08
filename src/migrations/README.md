## Seattle Civic Standard (SCS) Migration Scripts

This directory contains migration scripts that convert existing Seattle youth data schemas into the Seattle Civic Standard (SCS) format.

### Overview

Each data source in the Seattle Youth Data project has its own unique schema. These migration scripts analyze each schema and map it to the standardized SCS `CivicEntity` interface, ensuring compliance with the **6 core required fields**:

1. **id** - A unique identifier
2. **name** - What it's called
3. **type** - What kind of thing it is
4. **description** - What it is in plain English
5. **location** - Where it is (address and/or coordinates)
6. **contact** - How to get more information

### Migration Scripts

| Script | Source Data | Notes |
|--------|-------------|-------|
| `migrate-farmers-markets.ts` | Farmers Markets | Converts GIS coordinate data to lat/lng |
| `migrate-p-patch.ts` | P-Patch Community Gardens | Converts GIS coordinate data to lat/lng |
| `migrate-community-centers.ts` | Community Centers | Parses complex weekly schedules |
| `migrate-parks-catalog.ts` | Parks & Recreation Activities | Handles enrollment, fees, and grade ranges |
| `migrate-picnic-sites.ts` | Picnic Shelter Reservations | Extracts features and capacity info |
| `migrate-privately-owned-public-spaces.ts` | Public Spaces | Parses coordinate strings |
| `migrate-mobile-recreation-programming.ts` | Mobile Recreation Programs | Converts GIS coordinate data |
| `migrate-youth-programs.ts` | Youth Programs | Already well-structured, minimal conversion |
| `migrate-emerald-city-resource-guide.ts` | Community Resources | Already close to SCS format |

### Usage

#### Migrate Individual Datasets

```typescript
import { migrateAllFarmersMarkets } from './migrations/migrate-farmers-markets';
import { farmersMarkets } from './data/farmers-markets';

const scsCompliantMarkets = migrateAllFarmersMarkets(farmersMarkets);
```

#### Migrate All Data at Once

```typescript
import { migrateAllSeattleData } from './migrations';

const allMigratedData = migrateAllSeattleData();

// Access individual datasets
console.log(allMigratedData.farmersMarkets);
console.log(allMigratedData.communityCenters);
```

#### Get All Entities as a Single Array

```typescript
import { getAllMigratedEntities } from './migrations';

const allEntities = getAllMigratedEntities();
// Returns a flat array of all CivicEntity objects
```

### Migration Details

#### Coordinate Conversion

Several data sources (Farmers Markets, P-Patch, Mobile Recreation) use Washington State Plane North (EPSG:2926) coordinates. The migration scripts include a conversion function to transform these to WGS84 latitude/longitude:

```typescript
function convertStateProxyToLatLng(x: number, y: number): { lat: number; lng: number }
```

**Note:** This is a simplified approximation. For production use, consider using a proper coordinate transformation library like `proj4js`.

#### Schedule Parsing

Community Centers have complex schedule data with separate fields for each day of the week. The migration script consolidates this into the SCS `ScheduleInfo[]` format:

```typescript
{
  day: "Monday",
  hours: "9:00 AM - 5:00 PM"
}
```

#### ID Generation

Most migration scripts generate slug-friendly IDs from entity names:

```typescript
function createId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `prefix-${slug}`;
}
```

### Validation

After migration, all entities conform to the SCS model with:
- ✅ All 6 required fields populated
- ✅ Optional recommended fields when data is available
- ✅ Consistent structure across all data sources
- ✅ Human-readable descriptions
- ✅ Proper location formatting (string or LocationInfo with coordinates)

### Output Example

```typescript
{
  id: "farmers-market-ballard-15",
  name: "Ballard Farmers Market",
  type: "Farmers Market",
  description: "Ballard Farmers Market operated by Seattle Farmers Market Association. Open Sunday from 9 am - 2 pm. Year Round.",
  location: {
    address: "22nd Ave NW / NW Market St",
    coordinates: { lat: 47.6682, lng: -122.3842 }
  },
  contact: {
    website: "http://www.sfmamarkets.com/visit-ballard-farmers-market"
  },
  schedule: [
    { day: "Sunday", hours: "9 am - 2 pm" }
  ],
  organization: "Seattle Farmers Market Association",
  tags: ["farmers market", "local food", "community"],
  cost: "Free to attend"
}
```

### Future Improvements

- Use proper coordinate transformation library (proj4js)
- Add data validation/linting
- Generate migration reports showing coverage statistics
- Add support for exporting to JSON/CSV
- Create automated tests for each migration script
