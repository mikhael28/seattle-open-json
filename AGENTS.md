# Seattle Civic Standard Interfaces

## Core Model
- `CivicEntity` with supporting types `Coordinates`, `LocationInfo`, `ContactInfo`, `ScheduleInfo`, `DateRange`
- Collection and query helpers: `CivicEntityCollection`, `CivicEntityQuery`

## Dataset-Specific Interfaces
- Community datasets: `CommunityCenter`, `FarmersMarket`, `MobileRecreationProgramming`, `PPatch`
- Recreation and space datasets: `PicnicSite`, `PrivatelyOwnedPublicSpace`, `ParksCatalog`
- Program and resource datasets: `YouthProgram`, `EmeraldCityResourceGuide`

## Permit Data Interfaces
- Permit types from `permit-data`: `BuildingPermit`, `PlanComment`, `PlanReview`

## MCP Server
- `/mcp-server` Express+TypeScript service exposing SCS entity, activity, and permit query tools backed by `seattle-open-json@1.3.3`
- MCP Tools:
  - `searchCivicEntities` — filters civic entities with type, tag, neighborhood, and keyword inputs
  - `searchActivities` — keyword search across parks, mobile recreation, and youth program feeds
  - `getPermitDetails` — fetches permit record, plan comments, and review cycles by permit number
