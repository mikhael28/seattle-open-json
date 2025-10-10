import { BuildingPermit } from "../permit-data/permit-types.js";
import buildingPermitsData from "../permit-data/building-permits-2025-raw.json" with { type: "json" };

export type { BuildingPermit } from "../permit-data/permit-types.js";

export const buildingPermits: BuildingPermit[] =
  buildingPermitsData as BuildingPermit[];
