import { SeattleTip, seattleTips } from "./seattle-tips-data";

export type QuestionType =
  | "text"
  | "textarea"
  | "boolean"
  | "select"
  | "number"
  | "table";

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  options?: SelectOption[];
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  tipNumber?: string;
  tip?: SeattleTip;
  options?: SelectOption[]; // For select type
  columns?: TableColumn[]; // For table type
  placeholder?: string;
  helpText?: string;
}

export interface QuestionnaireSection {
  title: string;
  questions: Question[];
}

// Helper function to find tip by number
function findTip(tipNumber: string): SeattleTip | undefined {
  return seattleTips.find((tip) => tip.number === tipNumber);
}

export const applicationDetailQuestionnaire: QuestionnaireSection[] = [
  {
    title: "Detail Information",
    questions: [
      {
        id: "application-name",
        label: "Application Name",
        type: "text",
        required: true,
      },
      {
        id: "project-description",
        label: "Tell us about your project",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Project Information",
    questions: [
      {
        id: "new-building",
        label: "I'm constructing a new building",
        type: "boolean",
        required: true,
      },
      {
        id: "additions-changes",
        label: "I'm making additions or changes to an existing building",
        type: "boolean",
        required: true,
        tipNumber: "306",
        tip: findTip("306"),
      },
      {
        id: "temporary-structure",
        label: "I'm putting up a temporary structure (e.g., tent or booth)",
        type: "boolean",
        required: true,
        tipNumber: "337",
        tip: findTip("337"),
      },
      {
        id: "demolition",
        label: "I'm tearing down a building",
        type: "boolean",
        required: true,
      },
      {
        id: "change-use",
        label:
          "I'm changing the use of a building (e.g., from office to retail space)",
        type: "boolean",
        required: true,
        tipNumber: "201",
        tip: findTip("201"),
      },
      {
        id: "master-use-permit",
        label: "I need a master use permit",
        type: "boolean",
        required: true,
        tipNumber: "213C",
        tip: findTip("213C"),
      },
      {
        id: "subdividing-property",
        label: "I'm subdividing a property",
        type: "boolean",
        required: true,
        tipNumber: "213B",
        tip: findTip("213B"),
      },
      {
        id: "lot-boundary",
        label: "I'm changing a lot boundary",
        type: "boolean",
        required: true,
      },
      {
        id: "variance",
        label: "I need a variance from the zoning code",
        type: "boolean",
        required: true,
        tipNumber: "2204",
        tip: findTip("2204"),
      },
      {
        id: "curb-cut",
        label: "I'm installing a curb cut (ramp from sidewalk to street)",
        type: "boolean",
        required: true,
        tipNumber: "502",
        tip: findTip("502"),
      },
      {
        id: "grading-drainage",
        label: "I'm doing grading or installing drainage",
        type: "boolean",
        required: true,
      },
      {
        id: "shoreline-exemption",
        label: "I need a shoreline exemption to remove a hazardous tree",
        type: "boolean",
        required: true,
        tipNumber: "310",
        tip: findTip("310"),
      },
      {
        id: "standard-plan",
        label: "I'm planning on using an existing approved standard plan set",
        type: "boolean",
        required: true,
        tipNumber: "316",
        tip: findTip("316"),
      },
    ],
  },
  {
    title: "Standard Plan Information",
    questions: [
      {
        id: "standard-plan-number",
        label: "Standard Plan #",
        type: "text",
        required: false,
      },
      {
        id: "stfi-or-dadu",
        label:
          "I think my project qualifies as subject-to-field-inspection or a DADU standard plan",
        type: "boolean",
        required: false,
      },
    ],
  },
  {
    title: "Project Location Information",
    questions: [
      {
        id: "property-work-location",
        label: "Where on your property are you working?",
        type: "textarea",
        required: false,
      },
      {
        id: "right-of-way-work",
        label: "Is work in the right-of-way (street or alley) required?",
        type: "boolean",
        required: true,
      },
      {
        id: "primary-property-use",
        label: "Choose the Primary Property Use",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "single-family", label: "Single Family / Duplex" },
          { value: "multi-family", label: "Multi-Family" },
          { value: "commercial", label: "Commercial" },
          { value: "vacant-land", label: "Vacant Land" },
          { value: "industrial", label: "Industrial" },
          { value: "institutional", label: "Institutional" },
        ],
      },
      {
        id: "project-value",
        label: "Project Value",
        type: "number",
        required: false,
        placeholder: "$",
      },
    ],
  },

  {
    title: "Floating Residence Information",
    questions: [
      {
        id: "is-floating-residence",
        label: "Is this building a Floating Residence?",
        type: "boolean",
        required: true,
      },
      {
        id: "floating-residence-registration",
        label: "Registration or Verification Number",
        type: "text",
        required: false,
      },
    ],
  },
  {
    title: "Curb Cut Information",
    questions: [
      {
        id: "curb-cut-count",
        label: "Number of Curb Cuts for This Permit",
        type: "number",
        required: false,
      },
      {
        id: "curb-cut-details",
        label: "Curb Cut Size and Location",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "Parking",
    questions: [
      {
        id: "existing-onsite-parking",
        label: "Number of Existing Onsite Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "existing-offsite-parking",
        label: "Number of Existing Offsite Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "existing-accessible-parking",
        label: "Number of Existing Accessible Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "proposed-onsite-parking",
        label: "Number of Proposed Onsite Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "proposed-offsite-parking",
        label: "Number of Proposed Offsite Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "offsite-parking-location",
        label: "Offsite Parking Location",
        type: "text",
        required: false,
      },
      {
        id: "proposed-accessible-parking",
        label: "Number of Proposed Accessible Parking Spaces",
        type: "number",
        required: false,
      },
      {
        id: "existing-bicycle-parking",
        label: "Number of Existing Bicycle Parking Spots",
        type: "number",
        required: false,
      },
      {
        id: "proposed-bicycle-parking",
        label: "Number of Proposed Bicycle Parking Spots",
        type: "number",
        required: false,
      },
    ],
  },
  {
    title: "Tenant Information",
    questions: [
      {
        id: "residential-renters",
        label:
          "Are there residential (non-commercial) renters currently living in the property?",
        type: "boolean",
        required: true,
        helpText:
          "This question is asked to determine if the Tenant Relocation Assistance Ordinance (TRAO) applies to your project. TRAO provides residential renters with advance notice of the planned development and relocation assistance to qualifying low-income households that are displaced by demolition, substantial rehabilitation, or change of use. To learn more about TRAO, visit: https://www.seattle.gov/sdci/codes/codes-we-enforce-(a-z)/tenant-relocation-assistance-ordinance. It is extremely important that you provide accurate information at this time. You will not have another opportunity to change your answer after you submit your application.",
      },
    ],
  },
  {
    title: "Vacant Building Information",
    questions: [
      {
        id: "has-vacant-building",
        label: "Does the site have a vacant building?",
        type: "boolean",
        required: true,
      },
      {
        id: "vacant-building-case-number",
        label: "Vacant building monitoring case number",
        type: "text",
        required: false,
        placeholder: "#######-VB",
        helpText:
          "If an active vacant building monitoring case number is assigned, provide the case number, formatted as #######-VB.",
      },
    ],
  },
  {
    title: "Ground Disturbance",
    questions: [
      {
        id: "eca-area",
        label:
          "Is your development site in an environmentally critical area (ECA)?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unknown", label: "Unknown" },
        ],
      },
      {
        id: "hard-surface-replacement",
        label: "New and Replaced Hard Surface > 750 sq ft?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "earth-disturbance",
        label: "Are you doing more than 750 square feet of earth disturbance?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    title: "Building Code Information",
    questions: [
      {
        id: "building-code-used",
        label: "What building code was used for your design?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "2012 SBC", label: "2012 SBC" },
          { value: "2012 RBC", label: "2012 RBC" },
          { value: "2012 RC", label: "2012 RC" },
          { value: "2012 RCB", label: "2012 RCB" },
          { value: "2012 RCR", label: "2012 RCR" },
          { value: "2012 RCS", label: "2012 RCS" },
          { value: "2012 RCT", label: "2012 RCT" },
          { value: "2012 RCV", label: "2012 RCV" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "substantial-alteration",
        label: "Is this a substantial alteration?",
        type: "boolean",
        required: false,
      },
      {
        id: "changing-envelope",
        label: "Are you changing the envelope?",
        type: "boolean",
        required: false,
      },
      {
        id: "action-type",
        label: "Action Type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "--Select--" },
          { value: "new", label: "New Construction" },
          { value: "addition", label: "Addition / Alteration" },
          { value: "change-use", label: "Change Use" },
          { value: "temp", label: "Temp" },
        ],
      },
      {
        id: "existing-building-stories",
        label: "Number of Existing Building Stories",
        type: "number",
        required: false,
      },
      {
        id: "existing-below-grade-stories",
        label: "Number of Existing Below-Grade Building Stories",
        type: "number",
        required: false,
      },
      {
        id: "proposed-building-stories",
        label: "Number of Proposed Building Stories",
        type: "number",
        required: false,
      },
      {
        id: "proposed-below-grade-stories",
        label: "Number of Proposed Below-Grade Building Stories",
        type: "number",
        required: false,
      },
      {
        id: "number-of-mezzanines",
        label: "Number of Mezzanines",
        type: "number",
        required: false,
      },
      {
        id: "is-high-rise",
        label: "Is this a high-rise?",
        type: "boolean",
        required: false,
      },
      {
        id: "change-building-use",
        label: "Will you change the building use or occupancy?",
        type: "boolean",
        required: false,
      },
      {
        id: "main-existing-use",
        label: "Main Existing Use of Building (Incomplete Options)",
        type: "select",
        required: false,
        options: [
          { value: "", label: "--Select--" },
          { value: "residential", label: "Residential" },
          { value: "commercial", label: "Commercial" },
          { value: "industrial", label: "Industrial" },
          { value: "mixed", label: "Mixed Use" },
        ],
      },
      {
        id: "existing-occupancy",
        label: "Existing Occupancy (Incomplete Options)",
        type: "select",
        required: false,
        options: [
          { value: "", label: "--Select--" },
          { value: "a", label: "A - Assembly" },
          { value: "b", label: "B - Business" },
          { value: "e", label: "E - Educational" },
          { value: "f", label: "F - Factory/Industrial" },
          { value: "h", label: "H - High Hazard" },
          { value: "i", label: "I - Institutional" },
          { value: "m", label: "M - Mercantile" },
          { value: "r", label: "R - Residential" },
          { value: "s", label: "S - Storage" },
          { value: "u", label: "U - Utility" },
        ],
      },
      {
        id: "new-standard-plan",
        label: "Will your application include a new standard plan?",
        type: "boolean",
        required: false,
      },
    ],
  },
  {
    title: "Fire Protection Systems",
    questions: [
      {
        id: "sprinklers-nfpa-13",
        label: "Sprinklers Meet NFPA 13",
        type: "boolean",
        required: false,
      },
      {
        id: "sprinklers-nfpa-13r",
        label: "Sprinklers Meet NFPA 13R",
        type: "boolean",
        required: false,
      },
      {
        id: "partial-fire-protection",
        label: "Partial Fire Protection System",
        type: "boolean",
        required: false,
      },
      {
        id: "fire-alarm",
        label: "Fire Alarm",
        type: "boolean",
        required: false,
      },
      {
        id: "other-fire-protection",
        label: "Other Fire Protection System",
        type: "boolean",
        required: false,
      },
      {
        id: "other-sprinkler-type",
        label: "Other Type of Sprinkler System",
        type: "text",
        required: false,
      },
    ],
  },
  {
    title: "Energy Code",
    questions: [
      {
        id: "semi-heated-unheated",
        label: "Portion of Building Semi-Heated or Unheated",
        type: "boolean",
        required: false,
      },
      {
        id: "compliance-category",
        label: "Compliance Category",
        type: "select",
        required: false,
        options: [
          { value: "", label: "--Select--" },
          { value: "residential", label: "Residential" },
          { value: "commercial", label: "Commercial" },
        ],
      },
      {
        id: "compliance-path",
        label: "Compliance Path",
        type: "select",
        required: false,
        options: [
          { value: "", label: "--Select--" },
          { value: "prescriptive", label: "Prescriptive" },
          { value: "performance", label: "Performance" },
          { value: "total-building", label: "Total Building Performance" },
        ],
      },
      {
        id: "commercial-kitchen-hood",
        label: "Is there a commercial kitchen hood exhaust system?",
        type: "boolean",
        required: false,
      },
      {
        id: "fume-hood",
        label: "Is there a fume hood?",
        type: "boolean",
        required: false,
      },
      {
        id: "spray-paint-booth",
        label: "Is there a spray paint booth?",
        type: "boolean",
        required: false,
      },
      {
        id: "mechanical-systems-description",
        label: "Describe Mechanical Systems Being Installed (if any)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "Special Programs",
    questions: [],
  },
  {
    title: "Housing Units",
    questions: [
      {
        id: "housing-units-table",
        label: "Housing Units Information",
        type: "table",
        required: false,
        helpText:
          "Please enter the following information (a housing unit could be an apartment or a single-family house). For land use projects, enter the information for your site. For construction projects, enter the information for your building. You only need to enter the sleeping room information if you are building a congregate residence.",
        columns: [
          {
            id: "housing-type",
            label: "Type of Housing Unit",
            type: "select",
            options: [
              { value: "single-family", label: "Single Family" },
              { value: "townhouse", label: "Townhouse" },
              { value: "apartment", label: "Apartment" },
              { value: "adu", label: "ADU" },
              { value: "dadu", label: "DADU" },
              { value: "congregate", label: "Congregate Residence" },
            ],
          },
          {
            id: "existing-units",
            label: "Number of Existing Units",
            type: "number",
          },
          {
            id: "removed-units",
            label: "Number of Removed Units",
            type: "number",
          },
          {
            id: "added-units",
            label: "Number of Added Units",
            type: "number",
          },
          {
            id: "sleeping-rooms",
            label: "Number of Sleeping Rooms",
            type: "number",
          },
        ],
      },
    ],
  },
  {
    title: "Related Projects",
    questions: [
      {
        id: "related-projects-table",
        label: "Related SDCI Projects",
        type: "table",
        required: false,
        helpText:
          "Please tell us about any other SDCI permits or records that relate to this project.",
        columns: [
          {
            id: "record-type",
            label: "Related Record Type",
            type: "select",
            options: [
              { value: "permit", label: "Building Permit" },
              { value: "mup", label: "Master Use Permit" },
              { value: "land-use", label: "Land Use Application" },
              { value: "code-compliance", label: "Code Compliance" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "record-number",
            label: "Record Number",
            type: "text",
          },
          {
            id: "relationship",
            label: "Relationship Description",
            type: "text",
          },
        ],
      },
    ],
  },
];

// Export a flat list of all questions for easy access
export const allQuestions: Question[] = applicationDetailQuestionnaire.flatMap(
  (section) => section.questions
);

// Helper to get question by ID
export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

// Helper to get all questions with tips
export function getQuestionsWithTips(): Question[] {
  return allQuestions.filter((q) => q.tip !== undefined);
}
