/**
 * Example HSDS Data for a Seattle-based Youth Organization
 * This demonstrates how the HSDS schema is used in practice
 */

import type {
  Organization,
  Service,
  Location,
  ServiceAtLocation,
  Address,
  Phone,
  Contact,
  Schedule,
  Language,
  Accessibility,
  Program,
  Funding,
  TaxonomyTerm,
  Attribute,
  ServiceArea,
  Url,
} from "./hsds";

// Main Organization
export const seattleYouthOrganization: Organization = {
  id: "org-001",
  name: "Seattle Youth Opportunities Center",
  alternate_name: "SYOC",
  description:
    "Seattle Youth Opportunities Center is a nonprofit organization dedicated to empowering youth ages 12-24 through education, career development, and community engagement programs. We provide safe spaces, mentorship, and resources to help young people reach their full potential.",
  email: "info@seattleyouthcenter.org",
  website: "https://www.seattleyouthcenter.org",
  year_incorporated: 2010,
  legal_status: "501(c)(3) nonprofit",
  logo: "https://www.seattleyouthcenter.org/logo.png",
  uri: "https://opencorporates.com/companies/us_wa/seattle-youth-opportunities-center",
  additional_websites: [
    {
      id: "url-001",
      entity_id: "org-001",
      entity_type: "organization",
      label: "Facebook Page",
      url: "https://www.facebook.com/SeattleYouthOpp",
    },
    {
      id: "url-002",
      entity_id: "org-001",
      entity_type: "organization",
      label: "Instagram",
      url: "https://www.instagram.com/seattleyouthcenter",
    },
  ],
  funding: [
    {
      id: "fund-001",
      organization_id: "org-001",
      source: "City of Seattle Human Services Department",
    },
    {
      id: "fund-002",
      organization_id: "org-001",
      source: "Bill & Melinda Gates Foundation",
    },
    {
      id: "fund-003",
      organization_id: "org-001",
      source: "United Way of King County",
    },
  ],
};

// Programs
export const programs: Program[] = [
  {
    id: "prog-001",
    organization_id: "org-001",
    name: "Career Pathways Program",
    alternate_name: "CPP",
    description:
      "A comprehensive career development program that provides job readiness training, internship placements, and career counseling for youth ages 16-24.",
  },
  {
    id: "prog-002",
    organization_id: "org-001",
    name: "Academic Success Initiative",
    alternate_name: "ASI",
    description:
      "Tutoring, homework help, and college preparation services for middle and high school students.",
  },
];

// Services
export const services: Service[] = [
  {
    id: "svc-001",
    organization_id: "org-001",
    program_id: "prog-001",
    name: "Job Readiness Training",
    alternate_name: "JRT",
    description:
      "8-week intensive training program covering resume writing, interview skills, workplace communication, and professional development. Participants receive a certificate upon completion.",
    status: "active",
    url: "https://www.seattleyouthcenter.org/job-training",
    email: "jobtraining@seattleyouthcenter.org",
    application_process:
      "Complete online application form and attend an orientation session. Applications are accepted on a rolling basis.",
    eligibility: "Youth ages 16-24 who are residents of King County",
    eligibility_description:
      "Must be between 16-24 years old, reside in King County, and be authorized to work in the United States. Priority given to youth from low-income families.",
    minimum_age: 16,
    maximum_age: 24,
    fees: "Free",
    fees_description:
      "This program is offered at no cost to participants thanks to grant funding.",
    service_areas: [
      {
        id: "sa-001",
        service_id: "svc-001",
        service_area: "King County",
        description:
          "Service available to all residents of King County, Washington",
      },
    ],
  },
  {
    id: "svc-002",
    organization_id: "org-001",
    program_id: "prog-002",
    name: "After-School Tutoring",
    description:
      "Free drop-in tutoring for all subjects, Monday through Friday 3:30-6:30 PM. Certified teachers and volunteer tutors provide one-on-one and small group support.",
    status: "active",
    url: "https://www.seattleyouthcenter.org/tutoring",
    email: "tutoring@seattleyouthcenter.org",
    application_process:
      "No application required. Students can drop in during tutoring hours.",
    eligibility: "Middle and high school students (grades 6-12)",
    minimum_age: 11,
    maximum_age: 18,
    fees: "Free",
    fees_description: "All tutoring services are provided free of charge.",
    languages: [
      {
        id: "lang-001",
        service_id: "svc-002",
        name: "Spanish",
        code: "spa",
        note: "Spanish-speaking tutors available Monday, Wednesday, and Friday",
      },
      {
        id: "lang-002",
        service_id: "svc-002",
        name: "Mandarin Chinese",
        code: "cmn",
        note: "Mandarin-speaking tutors available Tuesday and Thursday",
      },
    ],
  },
  {
    id: "svc-003",
    organization_id: "org-001",
    name: "Youth Leadership Council",
    description:
      "A youth-led advisory council that plans community service projects, advocates for youth issues, and develops leadership skills through monthly meetings and quarterly projects.",
    status: "active",
    url: "https://www.seattleyouthcenter.org/leadership",
    email: "leadership@seattleyouthcenter.org",
    application_process:
      "Submit application with two references and a short essay. Applications reviewed quarterly.",
    eligibility:
      "Youth ages 14-19 who demonstrate leadership potential and commitment to community service",
    minimum_age: 14,
    maximum_age: 19,
    fees: "Free",
    service_wait_time:
      "Applications reviewed within 2 weeks of quarterly deadline",
  },
];

// Locations
export const locations: Location[] = [
  {
    id: "loc-001",
    organization_id: "org-001",
    name: "Seattle Youth Opportunities Center - Main Campus",
    alternate_name: "SYOC Main",
    description:
      "Our main facility in Capitol Hill featuring classrooms, computer lab, career center, and community gathering spaces.",
    transportation:
      "Located 2 blocks from Capitol Hill Light Rail Station. Metro bus routes 8, 10, 11, 43, and 49 stop within walking distance.",
    latitude: 47.619142,
    longitude: -122.320708,
    addresses: [
      {
        id: "addr-001",
        location_id: "loc-001",
        address_type: "physical",
        address_1: "1234 Broadway East",
        address_2: "Suite 200",
        city: "Seattle",
        state_province: "WA",
        postal_code: "98102",
        country: "USA",
        region: "King County",
      },
    ],
    phones: [
      {
        id: "phone-001",
        location_id: "loc-001",
        number: "206-555-0100",
        extension: 100,
        type: "voice",
        description: "Main reception",
      },
      {
        id: "phone-002",
        location_id: "loc-001",
        number: "206-555-0101",
        type: "text",
        description: "Text for program information",
      },
    ],
    languages: [
      {
        id: "lang-003",
        location_id: "loc-001",
        name: "English",
        code: "eng",
      },
      {
        id: "lang-004",
        location_id: "loc-001",
        name: "Spanish",
        code: "spa",
        note: "Spanish interpretation available upon request",
      },
    ],
    accessibilities: [
      {
        id: "acc-001",
        location_id: "loc-001",
        description: "Wheelchair accessible",
        details:
          "Building has elevator access to all floors, accessible restrooms, and designated wheelchair seating in all program areas.",
      },
      {
        id: "acc-002",
        location_id: "loc-001",
        description: "Assistive listening devices",
        details:
          "FM assistive listening devices available at reception desk for use in classrooms and meeting rooms.",
      },
    ],
  },
  {
    id: "loc-002",
    organization_id: "org-001",
    name: "SYOC South Seattle Satellite",
    description:
      "Satellite location in Rainier Valley offering tutoring and career services.",
    transportation:
      "Near Othello Light Rail Station. Metro routes 7, 36, and 50 nearby.",
    latitude: 47.537503,
    longitude: -122.281426,
    addresses: [
      {
        id: "addr-002",
        location_id: "loc-002",
        address_type: "physical",
        address_1: "5678 Rainier Avenue South",
        city: "Seattle",
        state_province: "WA",
        postal_code: "98118",
        country: "USA",
        region: "King County",
      },
    ],
  },
];

// Service at Location mappings
export const serviceAtLocations: ServiceAtLocation[] = [
  {
    id: "sal-001",
    service_id: "svc-001",
    location_id: "loc-001",
    description:
      "Job Readiness Training is offered at our main Capitol Hill campus with full computer lab access.",
    schedules: [
      {
        id: "sched-001",
        service_at_location_id: "sal-001",
        valid_from: "2024-01-01",
        valid_to: "2024-12-31",
        freq: "WEEKLY",
        byday: "MO,WE,FR",
        opens_at: "09:00:00",
        closes_at: "12:00:00",
        description: "Morning sessions Monday, Wednesday, Friday",
      },
      {
        id: "sched-002",
        service_at_location_id: "sal-001",
        freq: "WEEKLY",
        byday: "TU,TH",
        opens_at: "18:00:00",
        closes_at: "21:00:00",
        description: "Evening sessions Tuesday and Thursday for working youth",
      },
    ],
  },
  {
    id: "sal-002",
    service_id: "svc-002",
    location_id: "loc-001",
    description: "After-school tutoring at main campus",
  },
  {
    id: "sal-003",
    service_id: "svc-002",
    location_id: "loc-002",
    description: "After-school tutoring at South Seattle satellite location",
    schedules: [
      {
        id: "sched-003",
        service_at_location_id: "sal-003",
        freq: "WEEKLY",
        byday: "MO,TU,WE,TH,FR",
        opens_at: "15:30:00",
        closes_at: "18:30:00",
        description: "Weekday after-school hours",
      },
    ],
  },
];

// Contacts
export const contacts: Contact[] = [
  {
    id: "cont-001",
    organization_id: "org-001",
    name: "Maria Rodriguez",
    title: "Executive Director",
    email: "mrodriguez@seattleyouthcenter.org",
    phones: [
      {
        id: "phone-003",
        contact_id: "cont-001",
        number: "206-555-0102",
        type: "voice",
      },
    ],
  },
  {
    id: "cont-002",
    service_id: "svc-001",
    name: "James Chen",
    title: "Career Services Coordinator",
    department: "Career Pathways Program",
    email: "jchen@seattleyouthcenter.org",
    phones: [
      {
        id: "phone-004",
        contact_id: "cont-002",
        number: "206-555-0103",
        type: "voice",
        description: "Direct line for career services",
      },
    ],
  },
];

// Taxonomy Terms (using a simplified youth services taxonomy)
export const taxonomyTerms: TaxonomyTerm[] = [
  {
    id: "tax-001",
    code: "YS-001",
    name: "Youth Development",
    description: "Programs and services focused on positive youth development",
    taxonomy: "Youth Services Taxonomy",
  },
  {
    id: "tax-002",
    code: "YS-001.1",
    name: "Career Development",
    description:
      "Career readiness, job training, and employment services for youth",
    parent_id: "tax-001",
    taxonomy: "Youth Services Taxonomy",
  },
  {
    id: "tax-003",
    code: "YS-001.2",
    name: "Academic Support",
    description: "Tutoring, homework help, and educational enrichment",
    parent_id: "tax-001",
    taxonomy: "Youth Services Taxonomy",
  },
  {
    id: "tax-004",
    code: "YS-001.3",
    name: "Leadership Development",
    description: "Programs that develop leadership skills and civic engagement",
    parent_id: "tax-001",
    taxonomy: "Youth Services Taxonomy",
  },
];

// Attributes linking services to taxonomy terms
export const attributes: Attribute[] = [
  {
    id: "attr-001",
    link_entity: "service",
    link_id: "svc-001",
    taxonomy_term_id: "tax-002",
  },
  {
    id: "attr-002",
    link_entity: "service",
    link_id: "svc-002",
    taxonomy_term_id: "tax-003",
  },
  {
    id: "attr-003",
    link_entity: "service",
    link_id: "svc-003",
    taxonomy_term_id: "tax-004",
  },
];

// Complete HSDS Dataset Example
export const seattleYouthHSDSExample = {
  organizations: [seattleYouthOrganization],
  services,
  locations,
  service_at_locations: serviceAtLocations,
  programs,
  contacts,
  taxonomy_terms: taxonomyTerms,
  attributes,

  // Additional metadata
  metadata: {
    dataset_name: "Seattle Youth Opportunities Center Services",
    last_updated: "2024-01-15T10:00:00Z",
    publisher: "Seattle Youth Opportunities Center",
    coverage: "King County, Washington",
    schema_version: "3.0",
  },
};

// Helper function to validate required fields
export function validateHSDSData(
  data: typeof seattleYouthHSDSExample
): string[] {
  const errors: string[] = [];

  // Validate organizations
  data.organizations.forEach((org) => {
    if (!org.id) errors.push("Organization missing required field: id");
    if (!org.name) errors.push("Organization missing required field: name");
    if (!org.description)
      errors.push("Organization missing required field: description");
  });

  // Validate services
  data.services.forEach((service) => {
    if (!service.id) errors.push(`Service missing required field: id`);
    if (!service.organization_id)
      errors.push(
        `Service ${service.id} missing required field: organization_id`
      );
    if (!service.name)
      errors.push(`Service ${service.id} missing required field: name`);
    if (!service.status)
      errors.push(`Service ${service.id} missing required field: status`);
  });

  // Validate service_at_locations
  data.service_at_locations.forEach((sal) => {
    if (!sal.id) errors.push("ServiceAtLocation missing required field: id");
    if (!sal.service_id)
      errors.push(
        `ServiceAtLocation ${sal.id} missing required field: service_id`
      );
    if (!sal.location_id)
      errors.push(
        `ServiceAtLocation ${sal.id} missing required field: location_id`
      );
  });

  return errors;
}


