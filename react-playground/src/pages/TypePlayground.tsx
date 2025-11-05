import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

// Import sample data
import { buildingPermits } from 'seattle-open-json/building-permits';
import { planComments } from 'seattle-open-json/plan-comments';
import { planReview } from 'seattle-open-json/plan-review';
import { customerSupport } from 'seattle-open-json/customer-support';

interface TypeDefinition {
  name: string;
  description: string;
  category: string;
  typeDefinition: string;
  sampleData: any[];
}

const typeDefinitions: TypeDefinition[] = [
  {
    name: 'CivicEntity',
    description: 'The Seattle Civic Standard Model - Core interface for any civic entity (community centers, programs, services)',
    category: 'Core Types',
    typeDefinition: `/**
 * The Seattle Civic Standard Model
 *
 * Every civic entity needs just 6 core fields to be SCS-compliant:
 * 1. id - unique identifier
 * 2. name - what it's called
 * 3. type - what kind of thing it is
 * 4. description - what it is
 * 5. location - where it is
 * 6. contact - how to get more info
 */
interface CivicEntity {
  /** Unique identifier */
  id: string;
  /** Name of the entity */
  name: string;
  /** Type of entity (e.g., "Community Center", "Youth Program", "Park") */
  type: string;
  /** Plain English description */
  description: string;
  /** Where it is - can be simple address string or include coordinates */
  location: string | LocationInfo;
  /** How to get more information */
  contact: ContactInfo;
  /** Operating schedule */
  schedule?: ScheduleInfo[];
  /** Date range for programs or seasonal facilities */
  dates?: DateRange;
  /** Cost information */
  cost?: string;
  /** Age range */
  ageRange?: string;
  /** Accessibility information */
  accessibility?: string;
  /** Tags for categorization */
  tags?: string[];
  /** Last updated date */
  lastUpdated?: string;
  /** Additional notes */
  notes?: string;
  /** Features or amenities */
  features?: string[];
  /** Size or capacity */
  size?: string | number;
  /** Eligibility requirements */
  eligibility?: string;
  /** How to access */
  howToAccess?: string;
  /** Registration information */
  registration?: string;
  /** Managing organization */
  organization?: string;
  /** Languages available */
  languages?: string[];
  /** Neighborhood or district */
  neighborhood?: string;
  /** Hours per week (for programs) */
  hoursPerWeek?: number;
  /** Session or activity count */
  sessionCount?: number;
  /** Additional URLs */
  links?: string[];
}`,
    sampleData: []
  },
  {
    name: 'LocationInfo',
    description: 'Geographic location information with optional coordinates',
    category: 'Core Types',
    typeDefinition: `/**
 * Location information - can be as simple as an address string,
 * or include coordinates for mapping
 */
interface LocationInfo {
  /** Street address or location name */
  address: string;
  /** Optional coordinates for mapping */
  coordinates?: Coordinates;
}

interface Coordinates {
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
}`,
    sampleData: []
  },
  {
    name: 'ContactInfo',
    description: 'Contact information with phone, email, and website',
    category: 'Core Types',
    typeDefinition: `/**
 * Contact information - at least one method should be provided
 */
interface ContactInfo {
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Website URL */
  website?: string;
}`,
    sampleData: []
  },
  {
    name: 'ScheduleInfo',
    description: 'Operating schedule information',
    category: 'Core Types',
    typeDefinition: `/**
 * Operating schedule - keep it simple and human-readable
 */
interface ScheduleInfo {
  /** Day(s) of operation (e.g., "Monday-Friday", "Weekends") */
  day: string;
  /** Hours of operation (e.g., "9:00 AM - 5:00 PM", "24/7") */
  hours: string;
}`,
    sampleData: []
  },
  {
    name: 'CivicTicket',
    description: 'Specialized SCS interface for tracking work requests and tickets (311, permits, case management)',
    category: 'Core Types',
    typeDefinition: `/**
 * CivicTicket - A specialized SCS interface for tracking work requests and tickets
 */
interface CivicTicket extends CivicEntity {
  /** Ticket/request number */
  ticketNumber: string;
  /** Current status */
  ticketStatus: string;
  /** Date created */
  createdDate: string;
  /** Type of request */
  requestType: string;
  /** Method received */
  methodReceived?: string;
  /** Last updated */
  updatedDate?: string;
  /** Date closed */
  closedDate?: string;
  /** Assigned department */
  assignedDepartment?: string;
  /** Assigned to */
  assignedTo?: string;
  /** Priority level */
  priority?: string;
  /** Source system */
  source?: string;
  /** Resolution notes */
  resolution?: string;
  /** Reporter name */
  reportedBy?: string;
  /** Related ticket IDs */
  relatedTickets?: string[];
  /** Status history */
  statusHistory?: Array<{
    status: string;
    date: string;
    notes?: string;
  }>;
  /** SLA deadline */
  slaDeadline?: string;
  /** Estimated resolution time */
  estimatedResolution?: string;
  /** Time spent */
  timeSpent?: string | number;
  /** Geographic precinct */
  precinct?: string;
  /** Council district */
  councilDistrict?: number | string;
}`,
    sampleData: []
  },
  {
    name: 'BuildingPermit',
    description: 'Building permit data from Seattle Department of Construction and Inspections',
    category: 'Permit Data',
    typeDefinition: `/**
 * Interface for building permits data
 */
interface BuildingPermit {
  /** Permit number identifier */
  PermitNum: string;
  /** Classification of the permit */
  PermitClass: string;
  /** Mapped permit class */
  PermitClassMapped: string;
  /** Mapped permit type */
  PermitTypeMapped: string;
  /** Description of the permit type */
  PermitTypeDesc: string;
  /** Detailed description of the project */
  Description: string;
  /** Number of housing units */
  HousingUnits: number;
  /** Number of housing units removed */
  HousingUnitsRemoved: number;
  /** Number of housing units added */
  HousingUnitsAdded: number;
  /** Estimated project cost */
  EstProjectCost: number;
  /** Date the permit was applied for */
  AppliedDate: string;
  /** Date the permit was issued */
  IssuedDate: string;
  /** Date the permit expires */
  ExpiresDate: string;
  /** Date the project was completed */
  CompletedDate: string;
  /** Current status of the permit */
  StatusCurrent: string;
  /** Related MUP number */
  RelatedMup: string;
  /** Original address */
  OriginalAddress1: string;
  /** Original city */
  OriginalCity: string;
  /** Original state */
  OriginalState: string;
  /** Original ZIP code */
  OriginalZip: number;
  /** Contractor company name */
  ContractorCompanyName: string;
  /** Link to permit details */
  Link: string;
  /** Latitude coordinate */
  Latitude: number;
  /** Longitude coordinate */
  Longitude: number;
  /** Location coordinates as string */
  Location1: string;
  /** Total days for plan review */
  TotalDaysPlanReview: number;
  /** Days for initial plan review */
  DaysInitialPlanReview: number;
  /** Days for city plan review */
  DaysPlanReviewCity: number;
  /** Days out for corrections */
  DaysOutCorrections: number;
  /** Number of review cycles */
  NumberReviewCycles: number;
  /** Date initial review completed */
  InitialReviewCompleteDate: string;
  /** Date plan review completed */
  PlanReviewCompleteDate: string;
  /** Days to issue permit in city */
  DaysIssuePermitCity: number | string;
  /** Date ready to issue */
  ReadyToIssueDate: string;
  /** Zoning classification */
  Zoning: string;
  /** Type of dwelling unit */
  DwellingUnitType: string;
  /** Whether it's a standard plan */
  StandardPlan: number;
  /** Whether it's a dependent building */
  DependentBuilding: number;
  /** Parent permit number */
  ParentPermitNum: string;
  /** Housing category classification */
  HousingCategory: string;
}`,
    sampleData: buildingPermits.slice(0, 5)
  },
  {
    name: 'PlanComment',
    description: 'Plan review comments for building permits',
    category: 'Permit Data',
    typeDefinition: `/**
 * Interface for plan comments data
 */
interface PlanComment {
  /** Permit number identifier */
  PermitNum: string;
  /** Title of the document */
  DocumentTitle: string;
  /** URL to the document */
  URL: string;
  /** Subject of the comment */
  Subject: string;
  /** Type of review */
  ReviewType: string;
  /** Review cycle number */
  ReviewCycle: number;
  /** The actual comment text */
  Comment: string;
  /** Date of the document */
  DocumentDate: string;
}`,
    sampleData: planComments.slice(0, 5)
  },
  {
    name: 'PlanReview',
    description: 'Plan review process data for building permits',
    category: 'Permit Data',
    typeDefinition: `/**
 * Interface for plan review data
 */
interface PlanReview {
  /** Permit number identifier */
  PermitNum: string;
  /** Review cycle number */
  ReviewCycle: number;
  /** Type of review */
  ReviewType: string;
  /** Review team */
  ReviewTeam: string;
  /** Name of the reviewer */
  Reviewer: string;
  /** Date review team was assigned */
  ReviewTeamAssignDate: string;
  /** Date reviewer was assigned */
  ReviewerAssignDate: string;
  /** Date reviewer finished */
  ReviewerFinishDate: string;
  /** Description of review result */
  ReviewResultDesc: string;
  /** Review complexity code */
  ReviewComplexity: string;
  /** Description of review complexity */
  ReviewComplexityDesc: string;
  /** Review priority */
  ReviewPriority: string;
  /** Green building project indicator */
  GreenBuildingProject: string;
  /** Classification of the permit */
  PermitClass: string;
  /** Mapped permit class */
  PermitClassMapped: string;
  /** Mapped permit type */
  PermitTypeMapped: string;
  /** Description of permit type */
  PermitTypeDesc: string;
  /** Detailed description of the project */
  Description: string;
  /** Total days for plan review */
  TotalDaysPlanReview: string | number;
  /** Days for initial plan review */
  DaysInitialPlanReview: number;
  /** Days for city plan review */
  DaysPlanReviewCity: number;
  /** Days out for corrections */
  DaysOutCorrections: string | number;
  /** Number of review cycles */
  NumberReviewCycles: number;
  /** Date permit was applied for */
  AppliedDate: string;
  /** Date initial review completed */
  InitialReviewCompleteDate: string;
  /** Date plan review completed */
  PlanReviewCompleteDate: string;
  /** Date ready to issue */
  ReadyIssueDate: string;
  /** Date permit was issued */
  IssuedDate: string;
  /** Related MUP number */
  RelatedMup: string;
  /** Number of housing units removed */
  HousingUnitsRemoved: number;
  /** Number of housing units added */
  HousingUnitsAdded: number;
  /** Total number of housing units */
  HousingUnits: number;
  /** Zoning classification */
  Zoning: string;
  /** Type of dwelling unit */
  DwellingUnitType: string;
  /** Whether it's a standard plan */
  StandardPlan: boolean;
  /** Whether it's a dependent building */
  DependentBuilding: number;
  /** Parent permit number */
  ParentPermitNum: string;
  /** Original address */
  OriginalAddress1: string;
  /** Original city */
  OriginalCity: string;
  /** Original state */
  OriginalState: string;
  /** Original ZIP code */
  OriginalZip: string | number;
  /** Contractor company name */
  ContractorCompanyName: string;
  /** Link to permit details */
  Link: string;
  /** Latitude coordinate */
  Latitude: number;
  /** Longitude coordinate */
  Longitude: number;
  /** Housing category classification */
  HousingCategory: string;
}`,
    sampleData: planReview.slice(0, 5)
  },
  {
    name: 'CustomerSupportTicket',
    description: 'Customer support tickets from Seattle 311 and Find It Fix It',
    category: 'Service Requests',
    typeDefinition: `/**
 * Customer Support Ticket Interface
 *
 * Data structure for Seattle 311/Find It Fix It service requests
 */
interface CustomerSupportTicket {
  /** Unique service request identifier */
  serviceRequestNumber: string;
  /** Type of service request */
  serviceRequestType: string;
  /** City department responsible */
  cityDepartment: string;
  /** Date and time created */
  createdDate: string;
  /** Method received */
  methodReceived: string;
  /** Current status */
  status: string;
  /** Street address or location */
  location: string;
  /** X coordinate (State Plane) */
  xValue: number;
  /** Y coordinate (State Plane) */
  yValue: number;
  /** Latitude (WGS84) */
  latitude: number | string;
  /** Longitude (WGS84) */
  longitude: number | string;
  /** Combined lat/long POINT format */
  latitudeLongitude: string;
  /** ZIP code */
  zipCode: number | string;
  /** Council district number */
  councilDistrict: number | string;
  /** Police precinct name */
  policePrecinct: string;
  /** Community reporting area */
  communityReportingArea: string;
}`,
    sampleData: customerSupport.slice(0, 5)
  }
];

const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
};

const TypeCard: React.FC<{ type: TypeDefinition }> = ({ type }) => {
  const hasSampleData = type.sampleData.length > 0;
  const sampleDataJson = hasSampleData ? JSON.stringify(type.sampleData, null, 2) : '';

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{type.name}</h3>
            <p className="text-sm text-blue-600 mb-2">{type.category}</p>
          </div>
          <CopyButton text={type.typeDefinition} label="Copy Type" />
        </div>
        <p className="text-gray-600 text-sm">{type.description}</p>
      </div>

      <div className={`${hasSampleData ? 'lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0' : ''}`}>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">TypeScript Interface</h4>
          <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm border border-gray-200">
            <code className="text-gray-800">{type.typeDefinition}</code>
          </pre>
        </div>

        {hasSampleData && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700">
                Sample Data (First 5 Records)
              </h4>
              <CopyButton text={sampleDataJson} label="Copy Sample Data" />
            </div>
            <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm border border-gray-200 max-h-96">
              <code className="text-gray-800">{sampleDataJson}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const TypePlayground: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Service Requests');

  const allCategories = Array.from(new Set(typeDefinitions.map(t => t.category)));
  // Reorder to put Service Requests first
  const orderedCategories = allCategories.sort((a, b) => {
    if (a === 'Service Requests') return -1;
    if (b === 'Service Requests') return 1;
    return a.localeCompare(b);
  });
  const categories = ['All', ...orderedCategories];
  const filteredTypes = selectedCategory === 'All'
    ? typeDefinitions
    : typeDefinitions.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">TypeScript Type Playground</h1>
          <p className="text-gray-600 text-lg mb-4">
            Copy TypeScript interfaces and sample data from the seattle-open-json package.
            Perfect for hackathons, prototyping, and working with AI assistants.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Tip:</strong> Copy these interfaces directly into your AI chat prompts to help generate
              mock data or UI components. Sample data is included where available to give your AI context.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredTypes.map(type => (
            <TypeCard key={type.name} type={type} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About seattle-open-json</h3>
          <p className="text-gray-600 text-sm mb-3">
            An open collection of JSON data about branches of government and services provided
            by the City of Seattle and other government entities in the Puget Sound Region.
          </p>
          <a
            href="https://github.com/mikhael28/seattle-open-json"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TypePlayground;
