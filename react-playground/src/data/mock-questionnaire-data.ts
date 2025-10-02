import { QuestionnaireAnswers } from "../types/adu-planning";

/**
 * Mock completed questionnaire data
 * Represents a typical ADU (Detached Accessory Dwelling Unit) application
 */
export const mockCompletedQuestionnaire: QuestionnaireAnswers = {
  // Detail Information
  "application-name": "Backyard ADU - 1234 Maple Street",
  "project-description":
    "Construction of a new 800 sq ft detached accessory dwelling unit (DADU) in the backyard. The unit will include 2 bedrooms, 1 bathroom, kitchen, and living area. Modern energy-efficient design with heat pump and solar-ready roof.",

  // Project Information
  "new-building": true,
  "additions-changes": false,
  "temporary-structure": false,
  demolition: false,
  "change-use": false,
  "master-use-permit": false,
  "subdividing-property": false,
  "lot-boundary": false,
  variance: false,
  "curb-cut": false,
  "grading-drainage": true,
  "shoreline-exemption": false,
  "standard-plan": true,

  // Standard Plan Information
  "standard-plan-number": "DADU-2023-A",
  "stfi-or-dadu": true,

  // Project Location Information
  "property-work-location":
    "Rear of property, approximately 15 feet from rear property line and 5 feet from side property lines. Will be located in the northeast corner of the backyard.",
  "right-of-way-work": false,
  "primary-property-use": "single-family",
  "project-value": 275000,

  // Floating Residence Information
  "is-floating-residence": false,
  "floating-residence-registration": "",

  // Curb Cut Information
  "curb-cut-count": 0,
  "curb-cut-details": "",

  // Parking
  "existing-onsite-parking": 2,
  "existing-offsite-parking": 0,
  "existing-accessible-parking": 0,
  "proposed-onsite-parking": 3,
  "proposed-offsite-parking": 0,
  "offsite-parking-location": "",
  "proposed-accessible-parking": 0,
  "existing-bicycle-parking": 0,
  "proposed-bicycle-parking": 2,

  // Tenant Information
  "residential-renters": false,

  // Vacant Building Information
  "has-vacant-building": false,
  "vacant-building-case-number": "",

  // Ground Disturbance
  "eca-area": "no",
  "hard-surface-replacement": "yes",
  "earth-disturbance": "yes",

  // Building Code Information
  "building-code-used": "2012 RCB",
  "substantial-alteration": false,
  "changing-envelope": false,
  "action-type": "new",
  "existing-building-stories": 0,
  "existing-below-grade-stories": 0,
  "proposed-building-stories": 1,
  "proposed-below-grade-stories": 0,
  "number-of-mezzanines": 0,
  "is-high-rise": false,
  "change-building-use": false,
  "main-existing-use": "",
  "existing-occupancy": "",
  "new-standard-plan": false,

  // Fire Protection Systems
  "sprinklers-nfpa-13": false,
  "sprinklers-nfpa-13r": true,
  "partial-fire-protection": false,
  "fire-alarm": true,
  "other-fire-protection": false,
  "other-sprinkler-type": "",

  // Energy Code
  "semi-heated-unheated": false,
  "compliance-category": "residential",
  "compliance-path": "prescriptive",
  "commercial-kitchen-hood": false,
  "fume-hood": false,
  "spray-paint-booth": false,
  "mechanical-systems-description":
    "Air source heat pump for heating and cooling (Mitsubishi Mini-Split 18,000 BTU). Heat pump water heater (50 gallon). Energy recovery ventilator (ERV) for fresh air. LED lighting throughout.",

  // Housing Units
  "housing-units-table": [
    {
      "housing-type": "single-family",
      "existing-units": 1,
      "removed-units": 0,
      "added-units": 0,
      "sleeping-rooms": 0,
    },
    {
      "housing-type": "dadu",
      "existing-units": 0,
      "removed-units": 0,
      "added-units": 1,
      "sleeping-rooms": 2,
    },
  ],

  // Related Projects
  "related-projects-table": [
    {
      "record-type": "permit",
      "record-number": "6789012-BP",
      relationship: "Original house construction permit from 1985",
    },
  ],
};

/**
 * Another mock example - Attached ADU (AADU)
 */
export const mockAADUQuestionnaire: QuestionnaireAnswers = {
  "application-name": "Basement AADU Conversion - 5678 Oak Avenue",
  "project-description":
    "Converting existing basement space into an attached accessory dwelling unit. Includes adding separate entrance, kitchen, bathroom, and bedroom. Improving egress windows to meet code.",

  "new-building": false,
  "additions-changes": true,
  "temporary-structure": false,
  demolition: false,
  "change-use": true,
  "master-use-permit": false,
  "subdividing-property": false,
  "lot-boundary": false,
  variance: false,
  "curb-cut": false,
  "grading-drainage": false,
  "shoreline-exemption": false,
  "standard-plan": false,

  "standard-plan-number": "",
  "stfi-or-dadu": false,

  "property-work-location":
    "Basement level of existing single-family home. New exterior entrance on north side of house.",
  "right-of-way-work": false,
  "primary-property-use": "single-family",
  "project-value": 125000,

  "is-floating-residence": false,
  "floating-residence-registration": "",

  "curb-cut-count": 0,
  "curb-cut-details": "",

  "existing-onsite-parking": 1,
  "existing-offsite-parking": 0,
  "existing-accessible-parking": 0,
  "proposed-onsite-parking": 2,
  "proposed-offsite-parking": 0,
  "offsite-parking-location": "",
  "proposed-accessible-parking": 0,
  "existing-bicycle-parking": 0,
  "proposed-bicycle-parking": 1,

  "residential-renters": false,

  "has-vacant-building": false,
  "vacant-building-case-number": "",

  "eca-area": "unknown",
  "hard-surface-replacement": "no",
  "earth-disturbance": "no",

  "building-code-used": "2012 RCB",
  "substantial-alteration": true,
  "changing-envelope": true,
  "action-type": "addition",
  "existing-building-stories": 2,
  "existing-below-grade-stories": 1,
  "proposed-building-stories": 2,
  "proposed-below-grade-stories": 1,
  "number-of-mezzanines": 0,
  "is-high-rise": false,
  "change-building-use": true,
  "main-existing-use": "residential",
  "existing-occupancy": "r",
  "new-standard-plan": false,

  "sprinklers-nfpa-13": false,
  "sprinklers-nfpa-13r": false,
  "partial-fire-protection": false,
  "fire-alarm": true,
  "other-fire-protection": false,
  "other-sprinkler-type": "",

  "semi-heated-unheated": false,
  "compliance-category": "residential",
  "compliance-path": "prescriptive",
  "commercial-kitchen-hood": false,
  "fume-hood": false,
  "spray-paint-booth": false,
  "mechanical-systems-description":
    "Extending existing forced air heating system to basement unit. Adding mini-split heat pump for additional heating/cooling. Electric baseboard backup heat.",

  "housing-units-table": [
    {
      "housing-type": "single-family",
      "existing-units": 1,
      "removed-units": 0,
      "added-units": 0,
      "sleeping-rooms": 0,
    },
    {
      "housing-type": "adu",
      "existing-units": 0,
      "removed-units": 0,
      "added-units": 1,
      "sleeping-rooms": 1,
    },
  ],

  "related-projects-table": [],
};

/**
 * Minimal mock data - for testing sparse data
 */
export const mockMinimalQuestionnaire: QuestionnaireAnswers = {
  "application-name": "Quick ADU Project",
  "project-description": "Building a small DADU",
  "new-building": true,
  "primary-property-use": "single-family",
  "is-floating-residence": false,
  "residential-renters": false,
  "has-vacant-building": false,
  "eca-area": "no",
  "hard-surface-replacement": "no",
  "earth-disturbance": "no",
  "building-code-used": "2012 RCB",
  "action-type": "new",
  "housing-units-table": [],
  "related-projects-table": [],
};
