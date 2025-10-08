import { BuildingPermit } from "../permit-data/permit-types";
import buildingPermitsData from "../permit-data/building-permits-2025-raw.json";

export type { BuildingPermit } from "../permit-data/permit-types";

export const buildingPermits: BuildingPermit[] =
  buildingPermitsData as BuildingPermit[];
