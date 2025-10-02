/**
 * Site Map Requirements Interface
 *
 * This interface defines the required items for a Basic Site Plan,
 * which is a visual document showing the proposed plan in a construction permit.
 */

export interface TreeInfo {
  location: string;
  species: string;
  diameterAt45Feet: number; // in inches
  tier: 1 | 2 | 3 | 4;
  isOffsite: boolean;
  canopyOverhang: boolean;
  rootsExtending: boolean;
}

export interface TreeProtection {
  /** Tree protection area per SMC 25.11.060.A */
  protectionArea: string;
  /** Tree protection fencing requirements */
  hasFencing: boolean;
  /** SDCI's Tree and Vegetation Protection Detail must be included */
  hasProtectionDetail: boolean;
}

export interface SiteMapRequirement {
  id: number;
  category: string;
  description: string;
  required: boolean;
  completed: boolean;
}

export interface SiteMapChecklist {
  // 1. Address of project
  projectAddress: {
    required: true;
    value?: string;
    completed: boolean;
  };

  // 2. Legal description of the property
  legalDescription: {
    required: true;
    value?: string;
    completed: boolean;
  };

  // 3. King County Assessor's parcel number
  parcelNumber: {
    required: true;
    value?: string;
    label: "Property tax account number";
    completed: boolean;
  };

  // 4. North arrow pointing to the top of sheet
  northArrow: {
    required: true;
    pointsToTop: boolean;
    completed: boolean;
  };

  // 5. Property lines and dimensions
  propertyLines: {
    required: true;
    existing?: {
      lines: string[];
      dimensions: string[];
    };
    proposed?: {
      lines: string[];
      dimensions: string[];
    };
    completed: boolean;
  };

  // 6. General location, size, and shape of structures
  structures: {
    required: true;
    existing?: Array<{
      type:
        | "building"
        | "retaining wall"
        | "patio"
        | "deck"
        | "porch"
        | "rockery";
      location: string;
      size: string;
      shape: string;
    }>;
    proposed?: Array<{
      type:
        | "building"
        | "retaining wall"
        | "patio"
        | "deck"
        | "porch"
        | "rockery";
      location: string;
      size: string;
      shape: string;
    }>;
    completed: boolean;
  };

  // 7. Setback distances from structures to property lines
  setbacks: {
    required: true;
    existing?: Array<{
      structureType: string;
      frontSetback: number;
      sideSetback: number;
      rearSetback: number;
      distanceBetweenStructures?: number;
    }>;
    proposed?: Array<{
      structureType: string;
      frontSetback: number;
      sideSetback: number;
      rearSetback: number;
      distanceBetweenStructures?: number;
    }>;
    completed: boolean;
  };

  // 8. Right-of-ways, including adjacent street(s) and alleys
  rightOfWays: {
    required: true;
    adjacentStreets?: string[];
    alleys?: string[];
    completed: boolean;
  };

  // 9. Location and dimensions of driveways, parking, and paved areas
  pavedAreas: {
    required: true;
    existing?: Array<{
      type: "driveway" | "parking area" | "paved area";
      location: string;
      dimensions: string;
    }>;
    proposed?: Array<{
      type: "driveway" | "parking area" | "paved area";
      location: string;
      dimensions: string;
    }>;
    completed: boolean;
  };

  // 10. Tree Protection (SMC Chapter 25.11)
  treeProtection: {
    required: boolean; // Only if project is subject to SMC Chapter 25.11
    applicableToProject: boolean;
    trees?: TreeInfo[];
    protection?: TreeProtection[];
    completed: boolean;
  };
}

export const SITE_MAP_REQUIREMENTS: SiteMapRequirement[] = [
  {
    id: 1,
    category: "Basic Information",
    description: "Address of project",
    required: true,
    completed: false,
  },
  {
    id: 2,
    category: "Basic Information",
    description: "Legal description of the property",
    required: true,
    completed: false,
  },
  {
    id: 3,
    category: "Basic Information",
    description:
      "King County Assessor's parcel number (property tax account number)",
    required: true,
    completed: false,
  },
  {
    id: 4,
    category: "Orientation",
    description: "North arrow pointing to the top of sheet",
    required: true,
    completed: false,
  },
  {
    id: 5,
    category: "Property Boundaries",
    description: "Property lines and dimensions (existing and proposed)",
    required: true,
    completed: false,
  },
  {
    id: 6,
    category: "Structures",
    description:
      "General location, size, and shape of any structures presently on the site and proposed for construction (buildings, retaining walls, patios, decks, porches, rockeries)",
    required: true,
    completed: false,
  },
  {
    id: 7,
    category: "Setbacks",
    description:
      "Front, side and rear distances from structures to property lines, and distances between structures, porches and decks (existing and proposed)",
    required: true,
    completed: false,
  },
  {
    id: 8,
    category: "Right-of-Ways",
    description:
      "Right-of-ways, including adjacent street(s) name(s) and alleys",
    required: true,
    completed: false,
  },
  {
    id: 9,
    category: "Paved Areas",
    description:
      "Location and dimensions of all driveways, parking areas, and other paved areas (existing and proposed)",
    required: true,
    completed: false,
  },
  {
    id: 10,
    category: "Tree Protection (SMC 25.11)",
    description:
      "Location, species, and diameter at 4.5 feet above ground of all Tier 1-4 trees (including off-site trees with overhanging canopies or roots extending onto lot)",
    required: false, // Only if subject to SMC Chapter 25.11
    completed: false,
  },
  {
    id: 11,
    category: "Tree Protection (SMC 25.11)",
    description:
      "Tree protection area per SMC 25.11.060.A for all Tier 1-4 trees that will be retained during development",
    required: false,
    completed: false,
  },
  {
    id: 12,
    category: "Tree Protection (SMC 25.11)",
    description:
      "Tree protection fencing for all Tier 1-4 trees that will be retained. SDCI's Tree and Vegetation Protection Detail must be included in plan set",
    required: false,
    completed: false,
  },
];

/**
 * Helper function to check if all required items are completed
 */
export function isSiteMapComplete(checklist: SiteMapChecklist): boolean {
  const requiredItems = [
    checklist.projectAddress.completed,
    checklist.legalDescription.completed,
    checklist.parcelNumber.completed,
    checklist.northArrow.completed,
    checklist.propertyLines.completed,
    checklist.structures.completed,
    checklist.setbacks.completed,
    checklist.rightOfWays.completed,
    checklist.pavedAreas.completed,
  ];

  // Add tree protection if applicable
  if (checklist.treeProtection.applicableToProject) {
    requiredItems.push(checklist.treeProtection.completed);
  }

  return requiredItems.every((item) => item === true);
}

/**
 * Helper function to get completion percentage
 */
export function getSiteMapCompletionPercentage(
  checklist: SiteMapChecklist
): number {
  const totalRequired = checklist.treeProtection.applicableToProject ? 10 : 9;

  let completed = 0;
  if (checklist.projectAddress.completed) completed++;
  if (checklist.legalDescription.completed) completed++;
  if (checklist.parcelNumber.completed) completed++;
  if (checklist.northArrow.completed) completed++;
  if (checklist.propertyLines.completed) completed++;
  if (checklist.structures.completed) completed++;
  if (checklist.setbacks.completed) completed++;
  if (checklist.rightOfWays.completed) completed++;
  if (checklist.pavedAreas.completed) completed++;
  if (
    checklist.treeProtection.applicableToProject &&
    checklist.treeProtection.completed
  ) {
    completed++;
  }

  return Math.round((completed / totalRequired) * 100);
}

// ============================================================================
// ENHANCED SITE PLAN INTERFACES
// ============================================================================

/**
 * Enhanced Site Map Checklist
 *
 * Includes everything required on the basic site plans plus additional items
 * (11-22) required for an enhanced site plan.
 */
export interface EnhancedSiteMapChecklist extends SiteMapChecklist {
  // 11. Location of any easements including King County Recording number
  easements: {
    required: true;
    items?: Array<{
      location: string;
      type: string;
      kingCountyRecordingNumber: string;
    }>;
    completed: boolean;
  };

  // 12. Location of pedestrian path to each dwelling unit and primary entrance
  pedestrianPaths: {
    required: true;
    paths?: Array<{
      dwellingUnit: string;
      pathLocation: string;
      primaryEntranceLocation: string;
    }>;
    completed: boolean;
  };

  // 13. Elevations and contour lines with labeled contour intervals
  elevationsAndContours: {
    required: true;
    hasSlopingSite: boolean;
    hasEarthGrading: boolean;
    contourInterval: number; // in feet (typically 2-foot intervals)
    elevations?: string[];
    completed: boolean;
  };

  // 14. Proposed and existing street trees and landscaping in public ROW
  streetTreesAndLandscaping: {
    required: true;
    existing?: Array<{
      type: "tree" | "landscaping";
      location: string;
      species?: string;
      inPublicRightOfWay: true;
    }>;
    proposed?: Array<{
      type: "tree" | "landscaping";
      location: string;
      species?: string;
      inPublicRightOfWay: true;
    }>;
    completed: boolean;
  };

  // 15. Sewer mains (sanitary only {PPS} and/or combined sewers {PS})
  sewerMains: {
    required: true;
    sanitarySewerPPS?: Array<{
      location: string;
      size: string;
    }>;
    combinedSewerPS?: Array<{
      location: string;
      size: string;
    }>;
    completed: boolean;
  };

  // 16. Storm drains {PSD}, catch basins, and inlets
  stormDrainage: {
    required: true;
    stormDrainsPSD?: Array<{
      location: string;
      size: string;
    }>;
    catchBasins?: Array<{
      location: string;
    }>;
    inlets?: Array<{
      location: string;
    }>;
    completed: boolean;
  };

  // 17. Water mains, fire hydrants, and water meters
  waterInfrastructure: {
    required: true;
    waterMains?: Array<{
      location: string;
      size: string;
    }>;
    fireHydrants?: Array<{
      location: string;
    }>;
    waterMeters?: Array<{
      location: string;
    }>;
    completed: boolean;
  };

  // 18. Power poles, street lights, signal and transit poles, etc.
  utilityInfrastructure: {
    required: true;
    items?: Array<{
      type:
        | "power pole"
        | "street light"
        | "signal pole"
        | "transit pole"
        | "overhead system"
        | "bus zone"
        | "street sign"
        | "other";
      location: string;
      description?: string;
      adjacentToProperty: true;
    }>;
    completed: boolean;
  };

  // 19. All other elements between pavement edge and property line
  pavementToPropertyElements: {
    required: true;
    items?: Array<{
      type:
        | "side sewer"
        | "electrical duct"
        | "electrical vault"
        | "electrical conduit"
        | "handhole"
        | "ditch"
        | "culvert"
        | "curb ramp"
        | "other";
      location: string;
      description?: string;
    }>;
    completed: boolean;
  };

  // 20. On-site stormwater treatment, infiltration, or detention systems
  stormwaterSystems: {
    required: true;
    hasSystems: boolean;
    systems?: Array<{
      type: "treatment" | "infiltration" | "detention";
      location: string;
      size: string;
      capacity?: string;
    }>;
    completed: boolean;
  };

  // 21. Calculations demonstrating compliance with Land Use Code standards
  landUseCompliance: {
    required: true;
    calculations?: Array<{
      standard: string;
      calculation: string;
      result: string;
      compliant: boolean;
    }>;
    completed: boolean;
  };

  // 22. For street improvement plans (SIPs) - reference to standard plans
  streetImprovementPlans: {
    required: boolean; // Only if SIPs are needed
    applicableToProject: boolean;
    referencesStandardPlans: boolean; // Standard plans 002 and 003
    usesStandardSymbols: boolean;
    usesStandardAbbreviations: boolean;
    seattleDOTApproval?: boolean;
    completed: boolean;
  };
}

export const ENHANCED_SITE_MAP_REQUIREMENTS: SiteMapRequirement[] = [
  // Include all basic requirements (1-10)
  ...SITE_MAP_REQUIREMENTS,
  // Additional enhanced requirements (11-22)
  {
    id: 11,
    category: "Easements",
    description:
      "Location of any easements including King County Recording number",
    required: true,
    completed: false,
  },
  {
    id: 12,
    category: "Access & Circulation",
    description:
      "Location of the pedestrian path to each dwelling unit and the primary entrance to each building",
    required: true,
    completed: false,
  },
  {
    id: 13,
    category: "Topography",
    description:
      "Elevations and contour lines with labeled contour intervals on sloping sites or where earth grading is proposed (2-foot intervals)",
    required: true,
    completed: false,
  },
  {
    id: 14,
    category: "Landscaping",
    description:
      "All proposed and existing street trees and other landscaping in the public right-of-way",
    required: true,
    completed: false,
  },
  {
    id: 15,
    category: "Utilities - Sewer",
    description:
      "Sewer mains (sanitary only {PPS} and/or combined sewers {PS})",
    required: true,
    completed: false,
  },
  {
    id: 16,
    category: "Utilities - Storm Drainage",
    description: "Storm drains {PSD}, catch basins, and inlets",
    required: true,
    completed: false,
  },
  {
    id: 17,
    category: "Utilities - Water",
    description: "Water mains, fire hydrants, and water meters",
    required: true,
    completed: false,
  },
  {
    id: 18,
    category: "Utilities - Power & Transit",
    description:
      "Power poles, street lights, signal and transit poles, overhead system, bus zones, street signs, etc. adjacent to the subject property",
    required: true,
    completed: false,
  },
  {
    id: 19,
    category: "Infrastructure Elements",
    description:
      "All other elements between the pavement edge and property line (such as side sewer, electrical ducts and vaults, electrical conduits, handholes, ditches, culverts, curb ramps, etc.)",
    required: true,
    completed: false,
  },
  {
    id: 20,
    category: "Stormwater Management",
    description:
      "On-site stormwater treatment, infiltration, or detention systems",
    required: true,
    completed: false,
  },
  {
    id: 21,
    category: "Code Compliance",
    description:
      "Calculations demonstrating compliance with applicable Land Use Code development standards",
    required: true,
    completed: false,
  },
  {
    id: 22,
    category: "Street Improvement Plans",
    description:
      "For street improvement plans (SIPs) refer to the City of Seattle's standard plans. Standard plans 002 and 003 provide information related to standard symbols and abbreviations",
    required: false, // Only if SIPs are needed
    completed: false,
  },
];

/**
 * Helper function to check if all required items in enhanced site map are completed
 */
export function isEnhancedSiteMapComplete(
  checklist: EnhancedSiteMapChecklist
): boolean {
  // Check basic requirements first
  const basicComplete = isSiteMapComplete(checklist);

  // Check enhanced requirements
  const enhancedRequiredItems = [
    checklist.easements.completed,
    checklist.pedestrianPaths.completed,
    checklist.elevationsAndContours.completed,
    checklist.streetTreesAndLandscaping.completed,
    checklist.sewerMains.completed,
    checklist.stormDrainage.completed,
    checklist.waterInfrastructure.completed,
    checklist.utilityInfrastructure.completed,
    checklist.pavementToPropertyElements.completed,
    checklist.stormwaterSystems.completed,
    checklist.landUseCompliance.completed,
  ];

  // Add SIP if applicable
  if (checklist.streetImprovementPlans.applicableToProject) {
    enhancedRequiredItems.push(checklist.streetImprovementPlans.completed);
  }

  return basicComplete && enhancedRequiredItems.every((item) => item === true);
}

/**
 * Helper function to get enhanced site map completion percentage
 */
export function getEnhancedSiteMapCompletionPercentage(
  checklist: EnhancedSiteMapChecklist
): number {
  // Calculate total required items
  let totalRequired = checklist.treeProtection.applicableToProject ? 10 : 9; // Basic
  totalRequired += checklist.streetImprovementPlans.applicableToProject
    ? 12
    : 11; // Enhanced

  let completed = 0;

  // Count basic items
  if (checklist.projectAddress.completed) completed++;
  if (checklist.legalDescription.completed) completed++;
  if (checklist.parcelNumber.completed) completed++;
  if (checklist.northArrow.completed) completed++;
  if (checklist.propertyLines.completed) completed++;
  if (checklist.structures.completed) completed++;
  if (checklist.setbacks.completed) completed++;
  if (checklist.rightOfWays.completed) completed++;
  if (checklist.pavedAreas.completed) completed++;
  if (
    checklist.treeProtection.applicableToProject &&
    checklist.treeProtection.completed
  ) {
    completed++;
  }

  // Count enhanced items
  if (checklist.easements.completed) completed++;
  if (checklist.pedestrianPaths.completed) completed++;
  if (checklist.elevationsAndContours.completed) completed++;
  if (checklist.streetTreesAndLandscaping.completed) completed++;
  if (checklist.sewerMains.completed) completed++;
  if (checklist.stormDrainage.completed) completed++;
  if (checklist.waterInfrastructure.completed) completed++;
  if (checklist.utilityInfrastructure.completed) completed++;
  if (checklist.pavementToPropertyElements.completed) completed++;
  if (checklist.stormwaterSystems.completed) completed++;
  if (checklist.landUseCompliance.completed) completed++;
  if (
    checklist.streetImprovementPlans.applicableToProject &&
    checklist.streetImprovementPlans.completed
  ) {
    completed++;
  }

  return Math.round((completed / totalRequired) * 100);
}

/**
 * Type guard to check if a checklist is an enhanced checklist
 */
export function isEnhancedChecklist(
  checklist: SiteMapChecklist | EnhancedSiteMapChecklist
): checklist is EnhancedSiteMapChecklist {
  return "easements" in checklist;
}

// ============================================================================
// ENVIRONMENTAL CRITICAL AREA SITE PLAN INTERFACES
// ============================================================================

/**
 * Environmental Critical Area Site Map Checklist
 *
 * Includes everything required on the basic and enhanced site plans plus
 * additional items (23-29) required for an environmental critical area site plan.
 *
 * IMPORTANT: Must be prepared and stamped by a state of Washington licensed surveyor.
 */
export interface EnvironmentalCriticalAreaSiteMapChecklist
  extends EnhancedSiteMapChecklist {
  /** Required: Must be prepared and stamped by a WA licensed surveyor */
  surveyorCertification: {
    required: true;
    surveyorName?: string;
    licenseNumber?: string;
    stampDate?: string;
    isStamped: boolean;
    completed: boolean;
  };

  // 23. Terrain and stormwater-flow characteristics
  terrainAndStormwaterFlow: {
    required: true;
    onSite?: {
      terrain: string;
      stormwaterFlow: string;
    };
    adjacentSitesWithin25Feet?: {
      terrain: string;
      stormwaterFlow: string;
    };
    abuttingRightOfWaysAndEasements?: {
      terrain: string;
      stormwaterFlow: string;
      fullWidthDocumented: boolean;
    };
    completed: boolean;
  };

  // 24. Location of all grading activities and drainage control facilities
  gradingAndDrainageControl: {
    required: true;
    gradingActivitiesInProgress?: Array<{
      location: string;
      description: string;
    }>;
    existingDrainageControl?: {
      onSite?: Array<{
        type: "natural" | "artificial";
        location: string;
        description: string;
      }>;
      adjacentLandsWithin25Feet?: Array<{
        type: "natural" | "artificial";
        location: string;
        description: string;
      }>;
      abuttingRightOfWaysAndEasements?: Array<{
        type: "natural" | "artificial";
        location: string;
        description: string;
        fullWidthDocumented: boolean;
      }>;
    };
    completed: boolean;
  };

  // 25. Location and boundaries of all ECAs and their buffers
  environmentalCriticalAreas: {
    required: true;
    hasECAs: boolean;
    onSite?: Array<{
      ecaType: string;
      location: string;
      boundaries: string;
      bufferWidth: number;
      totalSquareFootage: number;
      percentageOfSite: number;
    }>;
    adjacentLandWithin25Feet?: Array<{
      ecaType: string;
      location: string;
      boundaries: string;
      bufferWidth: number;
    }>;
    completed: boolean;
  };

  // 26. Proposed location and boundaries of non-disturbance fenced areas
  nonDisturbanceAreas: {
    required: true;
    onSite?: Array<{
      location: string;
      boundaries: string;
      fenceType: string;
      bufferWidth?: number;
    }>;
    adjacentLandsWithin25Feet?: Array<{
      location: string;
      boundaries: string;
      fenceType: string;
      bufferWidth?: number;
    }>;
    completed: boolean;
  };

  // 27. Location and identification of ordinary high water mark / mean higher high water mark
  waterMarks: {
    required: boolean; // Only if water bodies within 200 feet
    hasWaterBodiesWithin200Feet: boolean;
    waterBodies?: Array<{
      type: "fresh water" | "marine water";
      location: string;
      distanceFromProperty: number;
      markType: "ordinary high water mark" | "mean higher high water mark";
      markLocation: string;
      riparianManagementArea?: {
        location: string;
        boundaries: string;
      };
    }>;
    completed: boolean;
  };

  // 28. Location of floodplain and floodway
  floodplainAndFloodway: {
    required: boolean; // Only if site is in flood zone
    inFloodZone: boolean;
    floodplainLocation?: string;
    floodwayLocation?: string;
    baseFloodElevation?: string;
    floodZoneType?: "AE" | "VE" | "other";
    completed: boolean;
  };

  // 29. Location and identification of shoreline environment
  shorelineEnvironment: {
    required: boolean; // Only if within 200 feet of shoreline
    within200FeetOfShoreline: boolean;
    freshWaterOrdinaryHighWaterMark?: {
      location: string;
      distance: number;
    };
    marineWaterMeanHigherHighWaterMark?: {
      location: string;
      distance: number;
    };
    shorelineDesignations?: Array<{
      designation: string;
      location: string;
      description: string;
    }>;
    completed: boolean;
  };
}

export const ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS: SiteMapRequirement[] =
  [
    // Include all basic and enhanced requirements (1-22)
    ...ENHANCED_SITE_MAP_REQUIREMENTS,
    // Additional environmental critical area requirements (23-29)
    {
      id: 23,
      category: "Environmental - Terrain & Stormwater",
      description:
        "Terrain and stormwater-flow characteristics within the site, on adjacent sites within 25 feet of the site's property lines, and on the full width of abutting public and private rights-of-way and easements",
      required: true,
      completed: false,
    },
    {
      id: 24,
      category: "Environmental - Grading & Drainage",
      description:
        "Location of all grading activities in progress and all natural and artificial existing drainage control facilities or systems on site or on adjacent lands within 25 feet of the site's property lines, and in the full width of abutting public and private rights-of-way and easements",
      required: true,
      completed: false,
    },
    {
      id: 25,
      category: "Environmental - Critical Areas",
      description:
        "Location and boundaries of all ECAs and their buffers on-site and on adjacent land within 25 feet of the site's property lines, noting both total square footage and percentage of site",
      required: true,
      completed: false,
    },
    {
      id: 26,
      category: "Environmental - Non-Disturbance Areas",
      description:
        "Proposed location and boundaries of all required non-disturbance fenced areas and buffers on site and on adjacent lands within 25 feet of the site's property lines",
      required: true,
      completed: false,
    },
    {
      id: 27,
      category: "Environmental - Water Marks",
      description:
        "Location and identification of the ordinary high water mark (for fresh water) or the mean higher high water mark (for marine water) of all water bodies and watercourses within 200 feet of the site's property lines, and the location and identification of the associated riparian management areas on the project site",
      required: false, // Only if water bodies within 200 feet
      completed: false,
    },
    {
      id: 28,
      category: "Environmental - Floodplain",
      description:
        "Location of floodplain and floodway, base flood elevation, and flood zone type (AE or VE)",
      required: false, // Only if in flood zone
      completed: false,
    },
    {
      id: 29,
      category: "Environmental - Shoreline",
      description:
        "Location and identification of the shoreline environment if any portion of the site is within 200 feet of the ordinary high water mark (for fresh water) and mean higher high water mark (for marine water) of a state shoreline. Show all designations appropriately",
      required: false, // Only if within 200 feet of shoreline
      completed: false,
    },
  ];

/**
 * Helper function to check if all required items in environmental critical area site map are completed
 */
export function isEnvironmentalCriticalAreaSiteMapComplete(
  checklist: EnvironmentalCriticalAreaSiteMapChecklist
): boolean {
  // Check enhanced requirements first (which includes basic)
  const enhancedComplete = isEnhancedSiteMapComplete(checklist);

  // Check surveyor certification (critical requirement)
  if (!checklist.surveyorCertification.completed) {
    return false;
  }

  // Check environmental requirements
  const environmentalRequiredItems = [
    checklist.terrainAndStormwaterFlow.completed,
    checklist.gradingAndDrainageControl.completed,
    checklist.environmentalCriticalAreas.completed,
    checklist.nonDisturbanceAreas.completed,
  ];

  // Add conditional environmental requirements
  if (checklist.waterMarks.hasWaterBodiesWithin200Feet) {
    environmentalRequiredItems.push(checklist.waterMarks.completed);
  }
  if (checklist.floodplainAndFloodway.inFloodZone) {
    environmentalRequiredItems.push(checklist.floodplainAndFloodway.completed);
  }
  if (checklist.shorelineEnvironment.within200FeetOfShoreline) {
    environmentalRequiredItems.push(checklist.shorelineEnvironment.completed);
  }

  return (
    enhancedComplete &&
    environmentalRequiredItems.every((item) => item === true)
  );
}

/**
 * Helper function to get environmental critical area site map completion percentage
 */
export function getEnvironmentalCriticalAreaSiteMapCompletionPercentage(
  checklist: EnvironmentalCriticalAreaSiteMapChecklist
): number {
  // Calculate total required items
  let totalRequired = checklist.treeProtection.applicableToProject ? 10 : 9; // Basic
  totalRequired += checklist.streetImprovementPlans.applicableToProject
    ? 12
    : 11; // Enhanced
  totalRequired += 1; // Surveyor certification (always required)
  totalRequired += 4; // Core environmental items (23-26)

  // Add conditional environmental items
  if (checklist.waterMarks.hasWaterBodiesWithin200Feet) totalRequired++;
  if (checklist.floodplainAndFloodway.inFloodZone) totalRequired++;
  if (checklist.shorelineEnvironment.within200FeetOfShoreline) totalRequired++;

  let completed = 0;

  // Count basic items
  if (checklist.projectAddress.completed) completed++;
  if (checklist.legalDescription.completed) completed++;
  if (checklist.parcelNumber.completed) completed++;
  if (checklist.northArrow.completed) completed++;
  if (checklist.propertyLines.completed) completed++;
  if (checklist.structures.completed) completed++;
  if (checklist.setbacks.completed) completed++;
  if (checklist.rightOfWays.completed) completed++;
  if (checklist.pavedAreas.completed) completed++;
  if (
    checklist.treeProtection.applicableToProject &&
    checklist.treeProtection.completed
  ) {
    completed++;
  }

  // Count enhanced items
  if (checklist.easements.completed) completed++;
  if (checklist.pedestrianPaths.completed) completed++;
  if (checklist.elevationsAndContours.completed) completed++;
  if (checklist.streetTreesAndLandscaping.completed) completed++;
  if (checklist.sewerMains.completed) completed++;
  if (checklist.stormDrainage.completed) completed++;
  if (checklist.waterInfrastructure.completed) completed++;
  if (checklist.utilityInfrastructure.completed) completed++;
  if (checklist.pavementToPropertyElements.completed) completed++;
  if (checklist.stormwaterSystems.completed) completed++;
  if (checklist.landUseCompliance.completed) completed++;
  if (
    checklist.streetImprovementPlans.applicableToProject &&
    checklist.streetImprovementPlans.completed
  ) {
    completed++;
  }

  // Count environmental items
  if (checklist.surveyorCertification.completed) completed++;
  if (checklist.terrainAndStormwaterFlow.completed) completed++;
  if (checklist.gradingAndDrainageControl.completed) completed++;
  if (checklist.environmentalCriticalAreas.completed) completed++;
  if (checklist.nonDisturbanceAreas.completed) completed++;
  if (
    checklist.waterMarks.hasWaterBodiesWithin200Feet &&
    checklist.waterMarks.completed
  ) {
    completed++;
  }
  if (
    checklist.floodplainAndFloodway.inFloodZone &&
    checklist.floodplainAndFloodway.completed
  ) {
    completed++;
  }
  if (
    checklist.shorelineEnvironment.within200FeetOfShoreline &&
    checklist.shorelineEnvironment.completed
  ) {
    completed++;
  }

  return Math.round((completed / totalRequired) * 100);
}

/**
 * Type guard to check if a checklist is an environmental critical area checklist
 */
export function isEnvironmentalCriticalAreaChecklist(
  checklist:
    | SiteMapChecklist
    | EnhancedSiteMapChecklist
    | EnvironmentalCriticalAreaSiteMapChecklist
): checklist is EnvironmentalCriticalAreaSiteMapChecklist {
  return "environmentalCriticalAreas" in checklist;
}
