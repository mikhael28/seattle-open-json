/**
 * Property Data Types and Interfaces
 * 
 * This file contains comprehensive property data structures for:
 * 1. King County Assessor Data - Tax assessments, building details, sales history, permits
 * 2. Seattle SDCI Site Report Data - Zoning, overlays, environmental critical areas, SEPA, design review
 * 
 * Both datasets are typically used together for ADU planning and permit applications.
 */

// ============================================================================
// KING COUNTY ASSESSOR PROPERTY DATA
// ============================================================================

interface ParcelData {
  parcel: string;
  name: string;
  siteAddress: string;
  residentialArea: string;
  propertyName?: string;
  jurisdiction: string;
  levyCode: string;
  propertyType: string;
  platBlock?: string;
  platLot?: string;
  quarterSectionTownshipRange: string;
  legalDescription: {
    subdivision: string;
    platBlock?: string;
    platLot?: string;
  };
}

interface LandData {
  highestBestUseVacant: string;
  highestBestUseImproved: string;
  presentUse: string;
  landSqFt: number;
  acres: number;
  percentageUnusable?: number;
  unbuildable: boolean;
  restrictiveSizeShape: boolean;
  zoning: string;
  water: string;
  sewerSeptic: string;
  roadAccess: string;
  parking: string;
  streetSurface: string;
  views: {
    waterfront: boolean;
    rainier: boolean;
    territorial: boolean;
    olympics: boolean;
    cascades: boolean;
    seattleSkyline: boolean;
    pugetSound: boolean;
    lakeWashington: boolean;
    lakeSammamish: boolean;
    lakeRiverCreek: boolean;
    other: boolean;
  };
  waterfrontLocation?: string;
  waterfrontFootage: number;
  lotDepthFactor: number;
  waterfrontBank?: string;
  tideShore?: string;
  waterfrontRestrictedAccess?: string;
  waterfrontAccessRights: boolean;
  poorQuality: boolean;
  proximityInfluence: boolean;
  designations: {
    nuisances: boolean;
    historicSite: boolean;
    currentUse?: string;
    nbrBldgSites?: number;
    adjacentToGolfFairway: boolean;
    adjacentToGreenbelt: boolean;
    otherDesignation: boolean;
    deedRestrictions: boolean;
    developmentRightsPurchased: boolean;
    easements: boolean;
    nativeGrowthProtectionEasement: boolean;
    dnrLease: boolean;
  };
  topography?: string;
  trafficNoise?: string;
  airportNoise?: string;
  powerLines: boolean;
  otherNuisances: boolean;
  problems: {
    waterProblems: boolean;
    transportationConcurrency: boolean;
    otherProblems: boolean;
  };
  environmental: {
    environmental: boolean;
  };
}

interface Building {
  buildingNumber: number;
  yearBuilt: number;
  yearRenovated?: number;
  stories: number;
  livingUnits: number;
  grade: string;
  gradeVariant: number;
  condition: string;
  basementGrade?: string;
  firstFloor: number;
  halfFloor: number;
  secondFloor: number;
  upperFloor: number;
  finishedBasement: number;
  totalFinishedArea: number;
  totalBasement: number;
  basementGarage: number;
  unfinishedHalf: number;
  unfinishedFull: number;
  agla: number;
  attachedGarage: number;
  bedrooms: number;
  fullBaths: number;
  threeQuarterBaths: number;
  halfBaths: number;
  heatSource: string;
  heatSystem: string;
  deckAreaSqFt: number;
  openPorchSqFt: number;
  enclosedPorchSqFt: number;
  brickStone: number;
  fireplacesSingleStory: number;
  fireplacesMultiStory: number;
  fireplacesFreeStanding: number;
  fireplacesAdditional: number;
  additionalCost: number;
  obsolescence: number;
  netCondition: number;
  percentageComplete: number;
  daylightBasement?: string;
  viewUtilization?: string;
}

interface TaxRollHistory {
  account: string;
  valuedYear: number;
  taxYear: number;
  omitYear?: string;
  levyCode: string;
  appraisedLandValue: number;
  appraisedImpsValue: number;
  appraisedTotalValue: number;
  newDollars: number;
  taxableLandValue: number;
  taxableImpsValue: number;
  taxableTotalValue: number;
  taxValueReason?: string;
}

interface SalesHistory {
  exciseNumber: string;
  recordingNumber: string;
  documentDate: string;
  salePrice: number;
  sellerName: string;
  buyerName: string;
  instrument: string;
  saleReason: string;
}

interface ReviewHistory {
  taxYear: number;
  reviewNumber: string;
  reviewType: string;
  appealedValue: number;
  hearingDate: string;
  settlementValue: number;
  decision: string;
  status: string;
}

interface PermitHistory {
  permitNumber: string;
  permitDescription: string;
  type: string;
  issueDate: string;
  permitValue: number;
  issuingJurisdiction: string;
  reviewedDate?: string;
}

export interface KingCountyProperty {
  parcelData: ParcelData;
  landData: LandData;
  buildings: Building[];
  taxRollHistory: TaxRollHistory[];
  salesHistory: SalesHistory[];
  reviewHistory: ReviewHistory[];
  permitHistory: PermitHistory[];
  homeImprovementExemption?: any;
  noticeMailingDate?: string;
  lastUpdated?: string;
}

// Example King County property data
export const exampleProperty: KingCountyProperty = {
  parcelData: {
    parcel: "915760-0035",
    name: "LIU JING",
    siteAddress: "12741 1ST AVE NW 98177",
    residentialArea: "039-003 (NW Appraisal District)",
    jurisdiction: "SEATTLE",
    levyCode: "0010",
    propertyType: "R",
    platLot: "7",
    quarterSectionTownshipRange: "SE-24-26-3",
    legalDescription: {
      subdivision: "WALTERS SOUND VIEW DIV # 1",
      platLot: "7"
    }
  },
  landData: {
    highestBestUseVacant: "SINGLE FAMILY",
    highestBestUseImproved: "PRESENT USE",
    presentUse: "Single Family(Res Use/Zone)",
    landSqFt: 8160,
    acres: 0.19,
    unbuildable: false,
    restrictiveSizeShape: false,
    zoning: "NR2",
    water: "WATER DISTRICT",
    sewerSeptic: "PUBLIC",
    roadAccess: "PUBLIC",
    parking: "ADEQUATE",
    streetSurface: "PAVED",
    views: {
      waterfront: true,
      rainier: false,
      territorial: false,
      olympics: false,
      cascades: false,
      seattleSkyline: false,
      pugetSound: false,
      lakeWashington: false,
      lakeSammamish: false,
      lakeRiverCreek: false,
      other: false
    },
    waterfrontFootage: 0,
    lotDepthFactor: 0,
    waterfrontAccessRights: false,
    poorQuality: false,
    proximityInfluence: false,
    designations: {
      nuisances: true,
      historicSite: false,
      adjacentToGolfFairway: false,
      adjacentToGreenbelt: false,
      otherDesignation: false,
      deedRestrictions: false,
      developmentRightsPurchased: false,
      easements: false,
      nativeGrowthProtectionEasement: false,
      dnrLease: false
    },
    powerLines: false,
    otherNuisances: false,
    problems: {
      waterProblems: false,
      transportationConcurrency: false,
      otherProblems: false
    },
    environmental: {
      environmental: false
    }
  },
  buildings: [
    {
      buildingNumber: 1,
      yearBuilt: 1948,
      stories: 1,
      livingUnits: 1,
      grade: "7 Average",
      gradeVariant: 0,
      condition: "Good",
      firstFloor: 1160,
      halfFloor: 0,
      secondFloor: 0,
      upperFloor: 0,
      finishedBasement: 0,
      totalFinishedArea: 1160,
      totalBasement: 0,
      basementGarage: 0,
      unfinishedHalf: 0,
      unfinishedFull: 0,
      agla: 1160,
      attachedGarage: 0,
      bedrooms: 4,
      fullBaths: 1,
      threeQuarterBaths: 0,
      halfBaths: 0,
      heatSource: "Electricity",
      heatSystem: "Elec BB",
      deckAreaSqFt: 140,
      openPorchSqFt: 0,
      enclosedPorchSqFt: 0,
      brickStone: 0,
      fireplacesSingleStory: 0,
      fireplacesMultiStory: 0,
      fireplacesFreeStanding: 0,
      fireplacesAdditional: 0,
      additionalCost: 0,
      obsolescence: 0,
      netCondition: 0,
      percentageComplete: 0
    }
  ],
  taxRollHistory: [
    {
      account: "915760003508",
      valuedYear: 2025,
      taxYear: 2026,
      levyCode: "0010",
      appraisedLandValue: 559000,
      appraisedImpsValue: 150000,
      appraisedTotalValue: 709000,
      newDollars: 0,
      taxableLandValue: 559000,
      taxableImpsValue: 150000,
      taxableTotalValue: 709000
    }
  ],
  salesHistory: [
    {
      exciseNumber: "3133175",
      recordingNumber: "20210719001998",
      documentDate: "7/9/2021",
      salePrice: 665000,
      sellerName: "JONES DOUGLAS R+BRONGER JONES ELIZABETH",
      buyerName: "LIU JING",
      instrument: "Warranty Deed",
      saleReason: "None"
    }
  ],
  reviewHistory: [
    {
      taxYear: 2011,
      reviewNumber: "1002365",
      reviewType: "Local Appeal",
      appealedValue: 336000,
      hearingDate: "5/26/2011",
      settlementValue: 336000,
      decision: "SUSTAIN",
      status: "Completed"
    }
  ],
  permitHistory: [
    {
      permitNumber: "6913712-CN",
      permitDescription: "Construct detached accessory dwelling unit, accessory to a single-family residence, per DADU standard plan 6804831-SP.,,",
      type: "Remodel",
      issueDate: "8/17/2022",
      permitValue: 0,
      issuingJurisdiction: "SEATTLE"
    },
    {
      permitNumber: "6888572-CN",
      permitDescription: "Interior alterations to existing single family residence, subject to field inspection (STFI),",
      type: "Remodel",
      issueDate: "3/18/2022",
      permitValue: 120000,
      issuingJurisdiction: "SEATTLE"
    }
  ],
  noticeMailingDate: "09/18/2025",
  lastUpdated: "June 28, 2025"
};

// ============================================================================
// SEATTLE SDCI SITE REPORT DATA
// ============================================================================

export interface SeattlePropertyData {
    // Report Metadata
    reportGeneratedDate: string; // ISO date string
    
    // Development Site Information
    developmentSite: {
      id: string; // Development Site ID
      legalDescription: string;
      squareFootage: number; // GIS Calculated Area
      addresses: string[]; // Array of addresses in the development site
    };
    
    // King County Assessor Information
    kingCountyParcel: {
      pin: string; // Parcel Identification Number
      numberOfBuildings: number;
      yearBuilt: number[]; // Array to support multiple years
      presentUse: string;
    };
    
    // Land Use
    landUse: {
      zoningDesignation: string; // e.g., "NR2"
      zoningHistory: Array<{
        zone: string;
        ordinance?: string;
        date: string;
      }>;
      streetDesignation: boolean;
      urbanVillageOrCenter: boolean;
      manufacturingIndustrialCenter: boolean;
      publicBenefitFeatures: boolean;
      futureLandUse: string;
    };
    
    // Land Use Overlays
    overlays: {
      airportHeightDistrict: boolean;
      alkiParkingOverlay: boolean;
      frequentTransitServiceArea: boolean;
      withinHalfMileOfFrequentTransitStop: boolean;
      withinQuarterMileOfMajorTransitStop: boolean;
      withinHalfMileOfMajorTransitStop: boolean;
      historicDistrict: boolean;
      specialReviewDistrict: boolean;
      lightRailStationOverlay: boolean;
      mobileHomeParkOverlay: boolean;
      northgateOverlayDistrict: boolean;
      pikePineConservationCore: boolean;
      pikePineConservationOverlay: boolean;
      sandPointOverlayDistrict: boolean;
      southeastSeattleReinvestmentArea: boolean;
      southLakeUnionSeaportFlightCorridor: boolean;
      shorelineDistrict: boolean;
      stadiumTransitionAreaOverlay: boolean;
      universityDistrictParkingImpactArea: boolean;
      urbanHarborfrontHistoricChapterArea: boolean;
    };
    
    // Mandatory Housing Affordability (MHA) / Incentive Zoning
    mhaAndIncentiveZoning: {
      subjectToMHA: boolean;
      mhaFeeArea?: string; // e.g., "Low Areas"
      mhaApplicabilityReference?: string[]; // SMC references
      incentiveZoning: boolean;
    };
    
    // Design Review
    designReview: {
      squareFootageThreshold: string;
      mhaUpzonedFromSingleFamily: boolean;
      mhaUpzoneDate?: {
        start: string;
        end: string;
      };
      designReviewGuidelineArea: boolean;
      designReviewEquityArea: boolean;
    };
    
    // State Environmental Policy Act (SEPA)
    sepa: {
      unitCountThreshold: number;
      squareFootageThreshold: number;
      exemptionStatus?: {
        active: boolean;
        reason?: string;
        effectivePeriod?: {
          start: string;
          end: string;
        };
      };
      scenicRouteWithin500Feet: boolean;
      archaeologicalBufferArea: boolean;
      sdotConstructionHubCoordinationRequired: boolean;
    };
    
    // Environmentally Critical Areas (ECA)
    environmentallyCriticalAreas: {
      abandonedLandfill: boolean;
      floodProneArea: boolean;
      knownSlideAffectedProperty: boolean;
      knownSlideInitiationPoint: boolean;
      knownSlideScarp: boolean;
      liquefactionProneArea: boolean;
      peatSettlementProneArea: boolean;
      potentialSlide: boolean;
      riparianCorridor: boolean;
      steepSlope: boolean;
      wetland: boolean;
      wildlifeHabitatArea: boolean;
      heronHabitat: boolean;
      treeCanopy?: {
        present: boolean;
        percentage?: number;
      };
      tier1HeritageTree: boolean;
    };
    
    // Green Building
    greenBuilding: {
      standardApplies: boolean;
      standardReference?: string;
    };
    
    // Other City Departments
    otherDepartments: {
      adjacentToPark: boolean;
      historicCityLandmark: boolean;
      arterialsWithin100Feet: string[]; // "None" or array of arterial names
      streetscapeDesignConceptPlan: boolean;
    };
    
    // Additional Considerations
    additionalConsiderations: {
      fireHydrantWithin600Feet: boolean;
      lowFireFlowAreasInNRZones: boolean;
      opportunityZone: boolean;
      rainierGeneseeBusinessDistrict: boolean;
      unreinforcedMasonryBuilding: boolean;
    };
  }

// Example Seattle SDCI site report data
export const mockHouseData: SeattlePropertyData = {
    "reportGeneratedDate": "2025-10-01",
    "developmentSite": {
      "id": "DV1097285",
      "legalDescription": "LOT 7 WALTERS SOUND VIEW DIV # 1",
      "squareFootage": 8220.14,
      "addresses": [
        "12741 1ST AVE NW",
        "12743 1ST AVE NW"
      ]
    },
    "kingCountyParcel": {
      "pin": "9157600035",
      "numberOfBuildings": 1,
      "yearBuilt": [1948],
      "presentUse": "Single Family(Res Use/Zone)"
    },
    "landUse": {
      "zoningDesignation": "NR2",
      "zoningHistory": [
        {
          "zone": "NR2",
          "ordinance": "ORD126509",
          "date": "2022-06-15"
        },
        {
          "zone": "SF 7200",
          "date": "1994-05-01"
        }
      ],
      "streetDesignation": false,
      "urbanVillageOrCenter": false,
      "manufacturingIndustrialCenter": false,
      "publicBenefitFeatures": false,
      "futureLandUse": "Neighborhood Residential Areas"
    },
    "overlays": {
      "airportHeightDistrict": false,
      "alkiParkingOverlay": false,
      "frequentTransitServiceArea": true,
      "withinHalfMileOfFrequentTransitStop": true,
      "withinQuarterMileOfMajorTransitStop": false,
      "withinHalfMileOfMajorTransitStop": false,
      "historicDistrict": false,
      "specialReviewDistrict": false,
      "lightRailStationOverlay": false,
      "mobileHomeParkOverlay": false,
      "northgateOverlayDistrict": false,
      "pikePineConservationCore": false,
      "pikePineConservationOverlay": false,
      "sandPointOverlayDistrict": false,
      "southeastSeattleReinvestmentArea": false,
      "southLakeUnionSeaportFlightCorridor": false,
      "shorelineDistrict": false,
      "stadiumTransitionAreaOverlay": false,
      "universityDistrictParkingImpactArea": false,
      "urbanHarborfrontHistoricChapterArea": false
    },
    "mhaAndIncentiveZoning": {
      "subjectToMHA": false,
      "mhaFeeArea": "Low Areas",
      "mhaApplicabilityReference": [
        "SMC 23.58B.020",
        "SMC 23.58C.025"
      ],
      "incentiveZoning": false
    },
    "designReview": {
      "squareFootageThreshold": "Design Review Thresholds in effect (SMC 23.41.004)",
      "mhaUpzonedFromSingleFamily": false,
      "mhaUpzoneDate": {
        "start": "2018-07-01",
        "end": "2023-12-31"
      },
      "designReviewGuidelineArea": false,
      "designReviewEquityArea": false
    },
    "sepa": {
      "unitCountThreshold": 4,
      "squareFootageThreshold": 4000,
      "exemptionStatus": {
        "active": true,
        "reason": "Per State Bill 5412, SEPA exemption is temporarily in effect for all development containing new housing units",
        "effectivePeriod": {
          "start": "2023-07",
          "end": "2025-09"
        }
      },
      "scenicRouteWithin500Feet": false,
      "archaeologicalBufferArea": false,
      "sdotConstructionHubCoordinationRequired": false
    },
    "environmentallyCriticalAreas": {
      "abandonedLandfill": false,
      "floodProneArea": false,
      "knownSlideAffectedProperty": false,
      "knownSlideInitiationPoint": false,
      "knownSlideScarp": false,
      "liquefactionProneArea": false,
      "peatSettlementProneArea": false,
      "potentialSlide": false,
      "riparianCorridor": false,
      "steepSlope": false,
      "wetland": false,
      "wildlifeHabitatArea": false,
      "heronHabitat": false,
      "treeCanopy": {
        "present": true,
        "percentage": 43.4
      },
      "tier1HeritageTree": false
    },
    "greenBuilding": {
      "standardApplies": false,
      "standardReference": "SMC 23.58D"
    },
    "otherDepartments": {
      "adjacentToPark": false,
      "historicCityLandmark": false,
      "arterialsWithin100Feet": [],
      "streetscapeDesignConceptPlan": false
    },
    "additionalConsiderations": {
      "fireHydrantWithin600Feet": true,
      "lowFireFlowAreasInNRZones": false,
      "opportunityZone": false,
      "rainierGeneseeBusinessDistrict": false,
      "unreinforcedMasonryBuilding": false
    }
  };

// ============================================================================
// NOTES
// ============================================================================
// 
// Both example datasets (exampleProperty and mockHouseData) represent the same
// physical property at 12741 1ST AVE NW, Seattle.
// 
// - exampleProperty: King County Assessor perspective (tax, building details)
// - mockHouseData: Seattle SDCI perspective (zoning, overlays, regulations)
// 
// Together they provide a complete picture for ADU planning and permitting.
// ============================================================================