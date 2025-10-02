import { Module, ADUPlanningSession } from "../types/adu-planning";

/**
 * Default ADU Planning Modules
 * Based on Seattle's ADU permitting process workflow
 */

export const defaultModules: Module[] = [
  {
    id: "module-1",
    title: "Step 1: Property Eligibility & Analysis",
    description: "Verify if you can build an ADU at your address",
    status: "not-started",
    order: 1,
    unlocked: true,
    icon: "MapPin",
    estimatedTime: "30 minutes",
    majorTasks: [
      {
        id: "task-1-1",
        title: "Get Seattle Site Characteristics Report",
        description:
          "Enter your Seattle property address to begin the process; open the Property Site Characteristics Report and it will automatically download.",
        status: "not-started",
        order: 1,
        estimatedTime: "2 minutes",
        resources: [
          {
            title: "Property Site Characteristics Report",
            url: "https://maps.seattle.gov/sdcipermithistory/",
          },
        ],
      },
      {
        id: "task-1-2",
        title: "Get King County Asessor Information",
        description:
          "Get additional property information from the King County Assessor",
        status: "not-started",
        order: 2,
        estimatedTime: "3 minutes",
        resources: [
          {
            url: "https://blue.kingcounty.com/Assessor/eRealProperty/",
            title: "King County Assessor Property Information",
          },
        ],
      },
    ],
  },
  {
    id: "module-2",
    title: "Stage 2: Property Analysis",
    description:
      "Cross-reference property information across multiple databases",
    status: "not-started",
    order: 2,
    unlocked: false,
    icon: "Database",
    estimatedTime: "20-30 minutes",
    majorTasks: [
      {
        id: "task-2-1",
        title: "Zoning (Land Use)",
        description:
          "Verify zoning classification and land use permissions for your property",
        status: "not-started",
        order: 1,
        estimatedTime: "5 minutes",
        resources: [
          {
            title: "Seattle Zoning Lookup",
            url: "https://seattlecitygis.maps.arcgis.com/apps/webappviewer/index.html?id=f822b2c6498c4163b0cf908e2241e9c2",
          },
        ],
      },
      {
        id: "task-2-2",
        title: "Lot Size and Setback Requirements",
        description:
          "Determine lot dimensions, setback requirements, and buildable area",
        status: "not-started",
        order: 2,
        estimatedTime: "5 minutes",
      },
      {
        id: "task-2-3",
        title: "Environmental Regulations (ECA Critical Areas)",
        description:
          "Check for environmentally critical areas that may restrict development",
        status: "not-started",
        order: 3,
        estimatedTime: "10 minutes",
        subTasks: [
          {
            id: "subtask-2-3-1",
            title: "Check for Significant Trees",
            description:
              'Identify any trees over 6" diameter that may be protected',
            status: "not-started",
            required: true,
            order: 1,
            resources: [
              {
                title: "Seattle Tree Protection",
                url: "https://www.seattle.gov/sdci/codes/codes-we-enforce-(a-z)/trees-and-vegetation",
              },
            ],
          },
          {
            id: "subtask-2-3-2",
            title: "Verify Tree Setback Compliance",
            description:
              "If tree is more than 30' wide, structures must be 10' outside the drip line",
            status: "not-started",
            required: true,
            order: 2,
          },
        ],
        resources: [
          {
            title: "ECA Code",
            url: "https://www.seattle.gov/sdci/codes/codes-we-enforce-(a-z)/environmentally-critical-areas-(eca)-code",
          },
        ],
      },
      {
        id: "task-2-4",
        title: "Shoreline Property Check",
        description:
          "Determine if your property is along a shoreline (requires special permits)",
        status: "not-started",
        order: 4,
        estimatedTime: "3 minutes",
      },
      {
        id: "task-2-5",
        title: "Tree Inventory",
        description:
          "Complete inventory of all significant trees on the property",
        status: "not-started",
        order: 5,
        estimatedTime: "5 minutes",
      },
      {
        id: "task-2-6",
        title: "City Lights/Utilities Access",
        description:
          "Verify access to city utilities (water, sewer, electricity)",
        status: "not-started",
        order: 6,
        estimatedTime: "5 minutes",
        resources: [
          {
            title: "Seattle City Light",
            url: "https://www.seattle.gov/city-light",
          },
          {
            title: "Seattle Public Utilities",
            url: "https://www.seattle.gov/utilities",
          },
        ],
      },
      {
        id: "task-2-7",
        title: "Middle Housing Eligibility",
        description:
          "Check eligibility for DADU/ADU, quantity allowed, footage restrictions, and height limits",
        status: "not-started",
        order: 7,
        estimatedTime: "10 minutes",
        resources: [
          {
            title: "ADU Requirements",
            url: "https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units",
          },
        ],
      },
      {
        id: "task-2-8",
        title: "Summary and Decision",
        description:
          "Review all 7 data points and decide: Are you planning to build or remodel?",
        status: "not-started",
        order: 8,
        estimatedTime: "5 minutes",
      },
    ],
  },
  {
    id: "module-3",
    title: "Stage 3: Design Selection",
    description: "Choose between pre-approved expedited plans or custom design",
    status: "not-started",
    order: 3,
    unlocked: false,
    icon: "Home",
    estimatedTime: "15-30 minutes",
    majorTasks: [
      {
        id: "task-3-1",
        title: "Pre-Approved Plan Decision",
        description:
          "Decide if you want to use one of Seattle's expedited pre-approved ADU models",
        status: "not-started",
        order: 1,
        estimatedTime: "5 minutes",
        resources: [
          {
            title: "Pre-Approved ADU Plans",
            url: "https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units/pre-approved-plans",
          },
        ],
      },
      {
        id: "task-3-2",
        title: "Select Expedited Plan",
        description: "Choose from available pre-approved ADU plans",
        status: "not-started",
        order: 2,
        conditional: true,
        condition: "Using pre-approved plan",
        estimatedTime: "10 minutes",
      },
      {
        id: "task-3-3",
        title: "Define Custom ADU Details",
        description:
          "Specify dimensions, height, setbacks, floors, and foundation type for custom design",
        status: "not-started",
        order: 3,
        conditional: true,
        condition: "Using custom design",
        estimatedTime: "20 minutes",
        subTasks: [
          {
            id: "subtask-3-3-1",
            title: "Square Footage",
            description: "Define the total square footage of your ADU",
            status: "not-started",
            required: true,
            order: 1,
          },
          {
            id: "subtask-3-3-2",
            title: "Height Specifications",
            description:
              "Specify the height of the structure (must comply with zoning limits)",
            status: "not-started",
            required: true,
            order: 2,
          },
          {
            id: "subtask-3-3-3",
            title: "Setback Measurements",
            description: "Define setbacks from property lines",
            status: "not-started",
            required: true,
            order: 3,
          },
          {
            id: "subtask-3-3-4",
            title: "Number of Floors",
            description: "Specify how many floors/stories the ADU will have",
            status: "not-started",
            required: true,
            order: 4,
          },
          {
            id: "subtask-3-3-5",
            title: "Foundation Type",
            description:
              "Select foundation type (slab, crawl space, basement, etc.)",
            status: "not-started",
            required: true,
            order: 5,
          },
        ],
      },
    ],
  },
  {
    id: "module-4",
    title: "Stage 4: Site Plan",
    description: "Determine the exact location of your ADU on the property",
    status: "not-started",
    order: 4,
    unlocked: false,
    icon: "Map",
    estimatedTime: "20-40 minutes",
    majorTasks: [
      {
        id: "task-4-1",
        title: "Create Site Plan",
        description:
          "Place your ADU on the property map considering setbacks, utilities, and access",
        status: "not-started",
        order: 1,
        estimatedTime: "20 minutes",
        resources: [
          {
            title: "Site Plan Requirements",
            url: "https://www.seattle.gov/sdci/permits/tips/site-plan-requirements",
          },
        ],
      },
      {
        id: "task-4-2",
        title: "Verify Setback Compliance",
        description:
          "Ensure the ADU location meets all required setbacks from property lines",
        status: "not-started",
        order: 2,
        estimatedTime: "10 minutes",
      },
      {
        id: "task-4-3",
        title: "Utility Connection Planning",
        description:
          "Plan connections to water, sewer, and electrical services",
        status: "not-started",
        order: 3,
        estimatedTime: "10 minutes",
      },
    ],
  },
  {
    id: "module-5",
    title: "Stage 5: Construction Planning",
    description: "Determine how you will build your ADU",
    status: "not-started",
    order: 5,
    unlocked: false,
    icon: "Hammer",
    estimatedTime: "15-30 minutes",
    majorTasks: [
      {
        id: "task-5-1",
        title: "Construction Method Selection",
        description:
          "Choose between hiring a General Contractor (GC) or self-managing the project",
        status: "not-started",
        order: 1,
        estimatedTime: "5 minutes",
      },
      {
        id: "task-5-2",
        title: "General Contractor Information",
        description: "Provide information about your chosen General Contractor",
        status: "not-started",
        order: 2,
        conditional: true,
        condition: "Using General Contractor",
        estimatedTime: "10 minutes",
        subTasks: [
          {
            id: "subtask-5-2-1",
            title: "GC Name and License",
            description:
              "Enter the name and license number of your General Contractor",
            status: "not-started",
            required: true,
            order: 1,
          },
          {
            id: "subtask-5-2-2",
            title: "Verify Pre-Approval Status",
            description:
              "Check if your GC is on Seattle's pre-approved contractor list",
            status: "not-started",
            required: false,
            order: 2,
            resources: [
              {
                title: "Pre-Approved Contractors",
                url: "https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units/pre-approved-plans",
              },
            ],
          },
        ],
      },
      {
        id: "task-5-3",
        title: "Generate Project Checklist",
        description:
          "Based on all your inputs, generate a comprehensive checklist of tasks for your ADU project",
        status: "not-started",
        order: 3,
        estimatedTime: "5 minutes",
      },
    ],
  },
];

/**
 * Create a new ADU Planning Session
 */
export function createNewSession(): ADUPlanningSession {
  return {
    id: `session-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    modules: JSON.parse(JSON.stringify(defaultModules)), // Deep clone
    progressPercentage: 0,
    userData: {},
  };
}

/**
 * Calculate overall progress percentage
 */
export function calculateProgress(modules: Module[]): number {
  let totalTasks = 0;
  let completedTasks = 0;

  modules.forEach((module) => {
    module.majorTasks.forEach((task) => {
      totalTasks++;
      if (task.status === "completed") {
        completedTasks++;
      }

      // Count subtasks if they exist
      if (task.subTasks && task.subTasks.length > 0) {
        task.subTasks.forEach((subtask) => {
          totalTasks++;
          if (subtask.status === "completed") {
            completedTasks++;
          }
        });
      }
    });
  });

  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
}

/**
 * Update module unlocked status based on previous modules completion
 */
export function updateModuleUnlockStatus(
  modules: Module[],
  devMode: boolean = false
): Module[] {
  const updated = [...modules];

  for (let i = 0; i < updated.length; i++) {
    if (i === 0) {
      // First module is always unlocked
      updated[i].unlocked = true;
    } else if (devMode) {
      // In dev mode, unlock all modules
      updated[i].unlocked = true;
    } else {
      // Unlock if previous module has at least one completed task
      const previousModule = updated[i - 1];
      const hasProgress = previousModule.majorTasks.some(
        (task) => task.status === "completed"
      );
      updated[i].unlocked = hasProgress;
    }
  }

  return updated;
}

/**
 * LocalStorage helpers
 */
const STORAGE_KEY = "adu-planning-session";
const DEV_MODE_KEY = "adu-planning-dev-mode";

export function saveSessionToStorage(session: ADUPlanningSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Failed to save session to localStorage:", error);
  }
}

export function loadSessionFromStorage(): ADUPlanningSession | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      parsed.createdAt = new Date(parsed.createdAt);
      parsed.updatedAt = new Date(parsed.updatedAt);
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load session from localStorage:", error);
  }
  return null;
}

export function clearSessionStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DEV_MODE_KEY);
  } catch (error) {
    console.error("Failed to clear session from localStorage:", error);
  }
}

export function saveDevMode(devMode: boolean): void {
  try {
    localStorage.setItem(DEV_MODE_KEY, JSON.stringify(devMode));
  } catch (error) {
    console.error("Failed to save dev mode to localStorage:", error);
  }
}

export function loadDevMode(): boolean {
  try {
    const stored = localStorage.getItem(DEV_MODE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load dev mode from localStorage:", error);
  }
  return false;
}
