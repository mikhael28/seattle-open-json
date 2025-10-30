/**
 * Migration script: Customer Support Tickets to Seattle Civic Standard (SCS)
 *
 * Converts Seattle 311/Find It Fix It service request data to SCS-compliant CivicTicket format.
 * This represents a new pattern in SCS - instead of static entities (like community centers),
 * CivicTickets represent dynamic work items with lifecycle tracking.
 */

import type { CivicTicket } from "../scs-model.js";
import type { CustomerSupportTicket } from "../data/customer-support-types.js";

/**
 * Creates a ticket ID from the service request number
 */
function createTicketId(ticketNumber: string): string {
  // Clean up the ticket number to make it URL-safe
  const cleanNumber = ticketNumber.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  return `ticket-${cleanNumber}`;
}

/**
 * Generates a human-readable name for the ticket
 */
function generateTicketName(ticket: CustomerSupportTicket): string {
  return `${ticket.serviceRequestType} - ${ticket.serviceRequestNumber}`;
}

/**
 * Builds a comprehensive description for the service request
 */
function buildDescription(ticket: CustomerSupportTicket): string {
  const requestType = ticket.serviceRequestType;
  const department = ticket.cityDepartment;
  const method = ticket.methodReceived;
  const status = ticket.status;

  let description = `Service request for ${requestType.toLowerCase()} submitted via ${method}`;

  if (ticket.communityReportingArea && ticket.communityReportingArea !== "") {
    description += ` in the ${ticket.communityReportingArea} area`;
  }

  description += `. Handled by ${department}. Current status: ${status}.`;

  return description;
}

/**
 * Parses location information from the ticket
 */
function parseLocation(
  ticket: CustomerSupportTicket
): string | { address: string; coordinates?: { lat: number; lng: number } } {
  const address = ticket.location;

  // If no location provided, return a fallback
  if (!address || address.trim() === "") {
    return "Location not specified";
  }

  // Check if we have valid coordinates
  const lat = ticket.latitude;
  const lng = ticket.longitude;

  if (lat && lng && lat !== "" && lng !== "" && lat !== 0 && lng !== 0) {
    const latNum = typeof lat === "string" ? parseFloat(lat) : lat;
    const lngNum = typeof lng === "string" ? parseFloat(lng) : lng;

    if (!isNaN(latNum) && !isNaN(lngNum)) {
      return {
        address: address,
        coordinates: {
          lat: latNum,
          lng: lngNum,
        },
      };
    }
  }

  // Return just the address if coordinates aren't available
  return address;
}

/**
 * Extracts contact information for the handling department
 */
function extractContact(ticket: CustomerSupportTicket): {
  phone?: string;
  email?: string;
  website?: string;
} {
  // Map departments to their general contact info
  // In a real implementation, this could be expanded with actual department contacts
  const departmentMap: Record<string, { phone?: string; website?: string }> = {
    "SEA-City of Seattle": {
      website:
        "https://www.seattle.gov/customer-service-bureau/find-it-fix-it-mobile-app",
    },
    "SPD-Seattle Police Department": {
      phone: "(206) 625-5011",
      website: "https://www.seattle.gov/police",
    },
    "SDOT-Seattle Department of Transportation": {
      phone: "(206) 684-7623",
      website: "https://www.seattle.gov/transportation",
    },
    "SPU-Seattle Public Utilities": {
      phone: "(206) 684-3000",
      website: "https://www.seattle.gov/utilities",
    },
    "FAS-Finance and Administrative Services": {
      phone: "(206) 684-0444",
      website: "https://www.seattle.gov/fas",
    },
  };

  const deptInfo = departmentMap[ticket.cityDepartment];

  return {
    website: deptInfo?.website || "https://www.seattle.gov",
    phone: deptInfo?.phone,
  };
}

/**
 * Builds tags for categorization
 */
function buildTags(ticket: CustomerSupportTicket): string[] {
  const tags: string[] = ["service-request", "civic-ticket"];

  // Add request type as a tag
  const requestType = ticket.serviceRequestType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  tags.push(requestType);

  // Add status
  tags.push(ticket.status.toLowerCase());

  // Add method
  if (ticket.methodReceived) {
    const method = ticket.methodReceived
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    tags.push(method);
  }

  // Add area if available
  if (ticket.communityReportingArea && ticket.communityReportingArea !== "") {
    const area = ticket.communityReportingArea
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    tags.push(area);
  }

  return tags;
}

/**
 * Migrates a single Customer Support Ticket to CivicTicket (SCS-compliant)
 */
export function migrateCustomerSupportTicket(
  ticket: CustomerSupportTicket
): CivicTicket {
  const ticketNumber = ticket.serviceRequestNumber;
  const createdDate = ticket.createdDate;

  const civicTicket: CivicTicket = {
    // Required CivicEntity fields
    id: createTicketId(ticketNumber),
    name: generateTicketName(ticket),
    type: "Service Request",
    description: buildDescription(ticket),
    location: parseLocation(ticket),
    contact: extractContact(ticket),

    // Required CivicTicket fields
    ticketNumber: ticketNumber,
    ticketStatus: ticket.status,
    createdDate: createdDate,
    requestType: ticket.serviceRequestType,

    // Optional CivicTicket fields
    methodReceived: ticket.methodReceived || undefined,
    assignedDepartment: ticket.cityDepartment || undefined,
    source: "Find It Fix It / Seattle 311",
    precinct: ticket.policePrecinct || undefined,
    councilDistrict: ticket.councilDistrict || undefined,

    // Additional SCS fields
    tags: buildTags(ticket),
    organization: ticket.cityDepartment || "City of Seattle",
    neighborhood: ticket.communityReportingArea || undefined,

    // Add ZIP code as a note if available
    notes:
      ticket.zipCode && ticket.zipCode !== ""
        ? `ZIP Code: ${ticket.zipCode}`
        : undefined,
  };

  return civicTicket;
}

/**
 * Migrates all customer support tickets to SCS format
 */
export function migrateAllCustomerSupportTickets(
  tickets: CustomerSupportTicket[]
): CivicTicket[] {
  return tickets.map(migrateCustomerSupportTicket);
}
