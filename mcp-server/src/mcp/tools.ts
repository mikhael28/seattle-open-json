import { z } from "zod";
import {
  searchActivities,
  type ActivitySource,
} from "../services/activityService.js";
import {
  searchCivicEntities,
  type CivicSearchFilters,
} from "../services/civicService.js";
import { getPermitDetails } from "../services/permitService.js";

export const toolNames = [
  "searchCivicEntities",
  "searchActivities",
  "getPermitDetails",
] as const;

export type ToolName = (typeof toolNames)[number];

const activitySourceEnum = z.enum([
  "parksCatalog",
  "mobileRecreationProgramming",
  "youthPrograms",
]);

const civicSearchSchema = z.object({
  search: z.string().optional(),
  type: z.union([z.string(), z.array(z.string())]).optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  neighborhood: z.string().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const activitySearchSchema = z.object({
  keyword: z.string().min(1, "Keyword is required."),
  sources: z.array(activitySourceEnum).optional(),
  limit: z.number().int().positive().max(50).optional(),
});

const permitDetailsSchema = z.object({
  permitNumber: z.string().min(3, "Permit number is required."),
});

type CivicSearchInput = z.infer<typeof civicSearchSchema>;
type ActivitySearchInput = z.infer<typeof activitySearchSchema>;
type PermitDetailsInput = z.infer<typeof permitDetailsSchema>;

type ToolRegistry = {
  [name in ToolName]: {
    description: string;
    schema: z.ZodTypeAny;
    handler: (input: unknown) => Promise<unknown> | unknown;
  };
};

const registry: ToolRegistry = {
  searchCivicEntities: {
    description:
      "Search Seattle Civic Standard entities with optional filters like type, tags, and keywords.",
    schema: civicSearchSchema,
    handler: (input: unknown) => {
      const parsed = civicSearchSchema.parse(input) as CivicSearchInput;
      return searchCivicEntities(parsed as CivicSearchFilters);
    },
  },
  searchActivities: {
    description:
      "Find recreation activities, mobile programs, and youth opportunities by keyword.",
    schema: activitySearchSchema,
    handler: (input: unknown) => {
      const parsed = activitySearchSchema.parse(input) as ActivitySearchInput;
      return searchActivities(parsed);
    },
  },
  getPermitDetails: {
    description:
      "Fetch building permit records along with plan comments and review cycles by permit number.",
    schema: permitDetailsSchema,
    handler: (input: unknown) => {
      const parsed = permitDetailsSchema.parse(input) as PermitDetailsInput;
      return getPermitDetails(parsed.permitNumber);
    },
  },
};

export function listTools() {
  return toolNames.map((name) => ({
    name,
    description: registry[name].description,
  }));
}

export async function executeTool(
  toolName: ToolName,
  payload: unknown
) {
  const tool = registry[toolName];
  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return tool.handler(payload);
}
