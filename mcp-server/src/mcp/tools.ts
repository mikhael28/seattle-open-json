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
import {
  searchTickets,
  getTicketStats,
  type TicketSearchFilters,
} from "../services/ticketService.js";

export const toolNames = [
  "searchCivicEntities",
  "searchActivities",
  "getPermitDetails",
  "searchCustomerTickets",
  "getTicketStatistics",
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

const ticketSearchSchema = z.object({
  search: z.string().optional(),
  status: z.union([z.string(), z.array(z.string())]).optional(),
  department: z.string().optional(),
  requestType: z.string().optional(),
  neighborhood: z.string().optional(),
  precinct: z.string().optional(),
  councilDistrict: z.union([z.string(), z.number()]).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const ticketStatsSchema = z.object({});

type CivicSearchInput = z.infer<typeof civicSearchSchema>;
type ActivitySearchInput = z.infer<typeof activitySearchSchema>;
type PermitDetailsInput = z.infer<typeof permitDetailsSchema>;
type TicketSearchInput = z.infer<typeof ticketSearchSchema>;
type TicketStatsInput = z.infer<typeof ticketStatsSchema>;

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
  searchCustomerTickets: {
    description:
      "Search Seattle 311/Find It Fix It customer support tickets with filters for status, department, type, location, and date range.",
    schema: ticketSearchSchema,
    handler: async (input: unknown) => {
      const parsed = ticketSearchSchema.parse(input) as TicketSearchInput;
      return searchTickets(parsed as TicketSearchFilters);
    },
  },
  getTicketStatistics: {
    description:
      "Get aggregate statistics about Seattle 311 customer support tickets including totals by status, department, and request type.",
    schema: ticketStatsSchema,
    handler: async (_input: unknown) => {
      return getTicketStats();
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
