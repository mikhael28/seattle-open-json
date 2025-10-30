/**
 * Seattle Customer Support Service Request Types
 *
 * Represents service requests or tickets submitted through various city channels
 * including Find It Fix It app, web intake, phone, or in-person.
 */

/**
 * Customer Support Ticket Interface
 *
 * Data structure for Seattle 311/Find It Fix It service requests (camelCase format)
 */
export interface CustomerSupportTicket {
  /** Unique service request identifier (e.g., "25-00274957") */
  serviceRequestNumber: string;

  /** Type of service request (e.g., "Unauthorized Encampment", "Parking Enforcement") */
  serviceRequestType: string;

  /** City department responsible for handling the request */
  cityDepartment: string;

  /** Date and time when the request was created */
  createdDate: string;

  /** Method through which the request was received (e.g., "Find It Fix It Apps", "Citizen Web Intake App") */
  methodReceived: string;

  /** Current status of the request (e.g., "Closed", "Open", "In Progress") */
  status: string;

  /** Street address or location description */
  location: string;

  /** X coordinate in State Plane projection */
  xValue: number;

  /** Y coordinate in State Plane projection */
  yValue: number;

  /** Latitude coordinate (WGS84) */
  latitude: number | string;

  /** Longitude coordinate (WGS84) */
  longitude: number | string;

  /** Combined latitude/longitude in POINT format */
  latitudeLongitude: string;

  /** ZIP code for the request location */
  zipCode: number | string;

  /** Seattle City Council district number */
  councilDistrict: number | string;

  /** Seattle Police Department precinct name */
  policePrecinct: string;

  /** Community reporting area name */
  communityReportingArea: string;
}
