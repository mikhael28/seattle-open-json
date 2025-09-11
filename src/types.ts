/**
 * Core types for Seattle Youth Open Data
 */

export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Location {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DateRange {
  start: string; // ISO date string
  end?: string; // ISO date string, optional for ongoing programs
}

export interface AgeRange {
  min: number;
  max: number;
}

export interface BaseYouthOpportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  contact: ContactInfo;
  location: Location;
  ageRange: AgeRange;
  cost: "free" | "paid" | "sliding-scale";
  costDetails?: string;
  tags: string[];
  lastUpdated: string; // ISO date string
  source: string; // URL or reference to data source
}

export interface YouthEvent extends BaseYouthOpportunity {
  type: "event";
  dateRange: DateRange;
  registrationRequired: boolean;
  registrationDeadline?: string; // ISO date string
  capacity?: number;
}

export interface YouthProgram extends BaseYouthOpportunity {
  type: "program";
  duration: string; // e.g., "6 weeks", "ongoing", "summer"
  schedule: string; // e.g., "Tuesdays 3-5pm", "Weekdays 9am-3pm"
  applicationRequired: boolean;
  applicationDeadline?: string; // ISO date string
}

export interface YouthJob extends BaseYouthOpportunity {
  type: "job";
  jobType: "paid" | "volunteer" | "internship";
  hourlyWage?: number;
  hoursPerWeek: string;
  applicationDeadline?: string; // ISO date string
  requirements: string[];
}

export interface MuseumPass extends BaseYouthOpportunity {
  type: "museum-pass";
  validDates: DateRange;
  includesTransport: boolean;
  groupSize?: {
    min: number;
    max: number;
  };
}

export type YouthOpportunity =
  | YouthEvent
  | YouthProgram
  | YouthJob
  | MuseumPass;

export interface DataCollection {
  metadata: {
    version: string;
    lastUpdated: string;
    totalEntries: number;
    categories: string[];
  };
  opportunities: YouthOpportunity[];
}

export interface SportsOpportunity extends YouthProgram {
  sportType: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "all-levels";
  equipmentProvided: boolean;
  equipmentNeeded?: string[];
}
