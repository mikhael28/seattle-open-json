import type { CivicTicket } from "seattle-open-json";
import { loadScsData } from "seattle-open-json/scs";

export interface TicketSearchFilters {
  search?: string;
  status?: string | string[];
  department?: string;
  requestType?: string;
  neighborhood?: string;
  precinct?: string;
  councilDistrict?: string | number;
  fromDate?: string;
  toDate?: string;
  limit?: number;
}

const MAX_LIMIT = 100;

let cachedTickets: CivicTicket[] | null = null;

async function getTickets(): Promise<CivicTicket[]> {
  if (!cachedTickets) {
    const scsData = await loadScsData();
    cachedTickets = scsData.customerSupportTickets;
  }
  return cachedTickets;
}

function normalizeArray(value?: string | string[]): string[] | undefined {
  if (!value) return undefined;
  const items = Array.isArray(value) ? value : value.split(",");
  return items
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
}

function ticketToSearchableText(ticket: CivicTicket): string {
  const location =
    typeof ticket.location === "string"
      ? ticket.location
      : ticket.location?.address ?? "";
  const tags = ticket.tags?.join(" ") ?? "";

  return [
    ticket.name,
    ticket.description,
    ticket.type,
    ticket.ticketNumber,
    ticket.requestType,
    ticket.assignedDepartment ?? "",
    ticket.neighborhood ?? "",
    ticket.precinct ?? "",
    location,
    tags,
    ticket.notes ?? "",
  ]
    .join(" \n ")
    .toLowerCase();
}

export async function searchTickets(
  filters: TicketSearchFilters
): Promise<CivicTicket[]> {
  const tickets = await getTickets();
  const normalizedStatuses = normalizeArray(filters.status);
  const searchText = filters.search?.toLowerCase().trim();
  const department = filters.department?.toLowerCase().trim();
  const requestType = filters.requestType?.toLowerCase().trim();
  const neighborhood = filters.neighborhood?.toLowerCase().trim();
  const precinct = filters.precinct?.toLowerCase().trim();
  const councilDistrict = filters.councilDistrict?.toString();
  const limit = Math.min(filters.limit ?? 50, MAX_LIMIT);

  let results = tickets;

  // Filter by status
  if (normalizedStatuses?.length) {
    results = results.filter((ticket) =>
      normalizedStatuses.includes(ticket.ticketStatus?.toLowerCase() ?? "")
    );
  }

  // Filter by department
  if (department) {
    results = results.filter((ticket) =>
      ticket.assignedDepartment?.toLowerCase().includes(department)
    );
  }

  // Filter by request type
  if (requestType) {
    results = results.filter((ticket) =>
      ticket.requestType?.toLowerCase().includes(requestType)
    );
  }

  // Filter by neighborhood
  if (neighborhood) {
    results = results.filter((ticket) =>
      ticket.neighborhood?.toLowerCase().includes(neighborhood)
    );
  }

  // Filter by precinct
  if (precinct) {
    results = results.filter((ticket) =>
      ticket.precinct?.toLowerCase().includes(precinct)
    );
  }

  // Filter by council district
  if (councilDistrict) {
    results = results.filter((ticket) =>
      ticket.councilDistrict?.toString() === councilDistrict
    );
  }

  // Filter by date range
  if (filters.fromDate) {
    const fromDate = new Date(filters.fromDate);
    results = results.filter((ticket) => {
      if (!ticket.createdDate) return false;
      const ticketDate = new Date(ticket.createdDate);
      return ticketDate >= fromDate;
    });
  }

  if (filters.toDate) {
    const toDate = new Date(filters.toDate);
    results = results.filter((ticket) => {
      if (!ticket.createdDate) return false;
      const ticketDate = new Date(ticket.createdDate);
      return ticketDate <= toDate;
    });
  }

  // Text search
  if (searchText) {
    results = results.filter((ticket) =>
      ticketToSearchableText(ticket).includes(searchText)
    );
  }

  return results.slice(0, limit);
}

export async function getTicketStats(): Promise<{
  totalTickets: number;
  byStatus: Record<string, number>;
  byDepartment: Record<string, number>;
  byRequestType: Record<string, number>;
  topRequestTypes: { type: string; count: number }[];
  topDepartments: { department: string; count: number }[];
}> {
  const tickets = await getTickets();
  
  const byStatus: Record<string, number> = {};
  const byDepartment: Record<string, number> = {};
  const byRequestType: Record<string, number> = {};

  tickets.forEach((ticket) => {
    // Count by status
    const status = ticket.ticketStatus || "Unknown";
    byStatus[status] = (byStatus[status] || 0) + 1;

    // Count by department
    const dept = ticket.assignedDepartment || "Unassigned";
    byDepartment[dept] = (byDepartment[dept] || 0) + 1;

    // Count by request type
    const type = ticket.requestType || "Unknown";
    byRequestType[type] = (byRequestType[type] || 0) + 1;
  });

  // Get top 10 request types
  const topRequestTypes = Object.entries(byRequestType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([type, count]) => ({ type, count }));

  // Get top 10 departments
  const topDepartments = Object.entries(byDepartment)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([department, count]) => ({ department, count }));

  return {
    totalTickets: tickets.length,
    byStatus,
    byDepartment,
    byRequestType,
    topRequestTypes,
    topDepartments,
  };
}
