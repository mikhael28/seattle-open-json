/**
 * Seattle Civic Standard Model (SCS Model)
 * Version: 1.0.0
 *
 * A simple, practical framework for standardizing civic data across local governments.
 * Designed to be so simple that any government employee can understand and implement it.
 */

// ===== LOCATION TYPES =====

/**
 * Geographic coordinates
 */
export interface Coordinates {
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
}

/**
 * Location information - can be as simple as an address string,
 * or include coordinates for mapping
 */
export interface LocationInfo {
  /** Street address or location name */
  address: string;
  /** Optional coordinates for mapping */
  coordinates?: Coordinates;
}

// ===== CONTACT TYPES =====

/**
 * Contact information - at least one method should be provided
 */
export interface ContactInfo {
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Website URL */
  website?: string;
}

// ===== SCHEDULE TYPES =====

/**
 * Operating schedule - keep it simple and human-readable
 */
export interface ScheduleInfo {
  /** Day(s) of operation (e.g., "Monday-Friday", "Weekends", "Tuesday, Thursday") */
  day: string;
  /** Hours of operation (e.g., "9:00 AM - 5:00 PM", "24/7") */
  hours: string;
}

/**
 * Date range for programs or events
 */
export interface DateRange {
  /** Start date (YYYY-MM-DD format recommended but not required) */
  start: string;
  /** End date (YYYY-MM-DD format recommended but not required) */
  end: string;
}

// ===== CORE SCS MODEL =====

/**
 * The Seattle Civic Standard Model
 *
 * Every civic entity needs just 6 core fields to be SCS-compliant:
 * 1. id - unique identifier
 * 2. name - what it's called
 * 3. type - what kind of thing it is
 * 4. description - what it is
 * 5. location - where it is
 * 6. contact - how to get more info
 *
 * Everything else is optional but recommended when applicable.
 */
export interface CivicEntity {
  // ===== REQUIRED CORE FIELDS (6) =====

  /** Unique identifier (can be simple like "program-001" or "ballard-cc") */
  id: string;

  /** Name of the entity */
  name: string;

  /** Type of entity (e.g., "Community Center", "Youth Program", "Park", "Service") */
  type: string;

  /** Plain English description of what this is */
  description: string;

  /** Where it is - can be simple address string or include coordinates */
  location: string | LocationInfo;

  /** How to get more information - at least one contact method */
  contact: ContactInfo;

  // ===== RECOMMENDED OPTIONAL FIELDS =====

  /** Operating schedule - when it's open or operates */
  schedule?: ScheduleInfo[];

  /** Date range for programs or seasonal facilities */
  dates?: DateRange;

  /** Cost information (e.g., "Free", "$25", "$10-20 sliding scale") */
  cost?: string;

  /** Age range (e.g., "All ages", "6-12 years", "Adults 18+") */
  ageRange?: string;

  /** Accessibility information (can be simple string or more detailed) */
  accessibility?: string;

  /** Tags for categorization and filtering */
  tags?: string[];

  /** When this data was last updated (YYYY-MM-DD recommended) */
  lastUpdated?: string;

  // ===== FULLY OPTIONAL FIELDS =====

  /** Additional notes or special information */
  notes?: string;

  /** Features or amenities available (e.g., ["gym", "pool", "wifi"]) */
  features?: string[];

  /** Size or capacity (can be a number or descriptive string) */
  size?: string | number;

  /** Eligibility or requirements to participate or access */
  eligibility?: string;

  /** How to register or access this entity */
  howToAccess?: string;

  /** Registration information */
  registration?: string;

  /** Organization or department that manages this */
  organization?: string;

  /** Languages available */
  languages?: string[];

  /** Neighborhood or district */
  neighborhood?: string;

  /** Hours per week (for programs) */
  hoursPerWeek?: number;

  /** Session or activity count */
  sessionCount?: number;

  /** Additional URLs or resources */
  links?: string[];
}

// ===== COLLECTION TYPE =====

/**
 * A collection of civic entities
 * Useful for packaging multiple entities together
 */
export interface CivicEntityCollection {
  /** Name of this collection */
  name: string;

  /** Description of what's in this collection */
  description?: string;

  /** The civic entities */
  entities: CivicEntity[];

  /** Metadata about the collection */
  metadata?: {
    /** Total number of entities */
    total: number;
    /** When this collection was last updated */
    lastUpdated: string;
    /** Source or publisher */
    source?: string;
    /** Version */
    version?: string;
  };
}

// ===== HELPER TYPES =====

/**
 * Simple query/filter interface for searching civic entities
 */
export interface CivicEntityQuery {
  /** Filter by type */
  type?: string | string[];
  /** Filter by tags */
  tags?: string | string[];
  /** Text search in name or description */
  search?: string;
  /** Filter by neighborhood */
  neighborhood?: string;
}
