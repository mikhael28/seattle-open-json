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
  CostOption,
  RequiredDocument,
  OrganizationIdentifier,
  Unit,
  ServiceCapacity,
  Metadata,
  MetaTableDescription,
  Taxonomy,
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
  organization_identifiers: [
    {
      id: "orgid-001",
      organization_id: "org-001",
      identifier_scheme: "US-EIN",
      identifier_type: "Employer Identification Number",
      identifier: "91-1234567",
    },
    {
      id: "orgid-002",
      organization_id: "org-001",
      identifier_scheme: "WA-UBI",
      identifier_type: "Washington State UBI Number",
      identifier: "604-123-456",
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
    cost_options: [
      {
        id: "cost-001",
        service_id: "svc-001",
        valid_from: "2024-01-01",
        valid_to: "2024-12-31",
        option: "Free for eligible participants",
        currency: "USD",
        amount: 0,
        amount_description:
          "No cost for youth who meet income eligibility requirements. Sliding scale fee of $25-$100 for others.",
      },
    ],
    required_documents: [
      {
        id: "doc-001",
        service_id: "svc-001",
        document: "Government-issued photo ID",
        uri: "https://www.seattleyouthcenter.org/job-training/requirements",
      },
      {
        id: "doc-002",
        service_id: "svc-001",
        document: "Proof of residency in King County",
        uri: "https://www.seattleyouthcenter.org/job-training/requirements",
      },
      {
        id: "doc-003",
        service_id: "svc-001",
        document: "Work authorization documentation",
        uri: "https://www.seattleyouthcenter.org/job-training/requirements",
      },
    ],
    capacities: [
      {
        id: "cap-001",
        service_id: "svc-001",
        available_capacity: 20,
        updated_at: "2024-01-15T10:00:00Z",
        unit: {
          id: "unit-001",
          service_capacity_id: "cap-001",
          unit_amount: 1,
          unit_type: "participants per session",
          details: "Maximum 20 participants per 8-week training cohort",
        },
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
    cost_options: [
      {
        id: "cost-002",
        service_id: "svc-002",
        option: "Always free",
        currency: "USD",
        amount: 0,
        amount_description: "Tutoring services are always provided at no cost.",
      },
    ],
    capacities: [
      {
        id: "cap-002",
        service_id: "svc-002",
        available_capacity: 50,
        updated_at: "2024-01-15T10:00:00Z",
        unit: {
          id: "unit-002",
          service_capacity_id: "cap-002",
          unit_amount: 1,
          unit_type: "students per day",
          details: "Drop-in tutoring can accommodate up to 50 students daily",
        },
      },
    ],
    funding: [
      {
        id: "fund-005",
        service_id: "svc-002",
        source: "Seattle Public Schools Partnership Grant",
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
    funding: [
      {
        id: "fund-006",
        service_id: "svc-003",
        source: "Youth Development Initiative Grant",
      },
    ],
    additional_urls: [
      {
        id: "url-005",
        entity_id: "svc-003",
        entity_type: "service",
        label: "Youth Leadership Council Blog",
        url: "https://www.seattleyouthcenter.org/leadership/blog",
      },
    ],
    schedules: [
      {
        id: "sched-004",
        service_id: "svc-003",
        valid_from: "2024-01-01",
        valid_to: "2024-12-31",
        freq: "MONTHLY",
        interval: 1,
        byday: "SA",
        bysetpos: "2",
        opens_at: "10:00:00",
        closes_at: "15:00:00",
        description:
          "Youth Leadership Council meets second Saturday of each month",
      },
    ],
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
      {
        id: "acc-003",
        location_id: "loc-001",
        description: "Braille signage",
        details:
          "All floor directories and room signs include Braille translations",
        url: "https://www.seattleyouthcenter.org/accessibility",
      },
      {
        id: "acc-004",
        location_id: "loc-001",
        description: "Service animal accommodations",
        details:
          "Service animals welcome throughout facility with designated relief areas available",
      },
      {
        id: "acc-007",
        location_id: "loc-001",
        description: "Quiet sensory space",
        details:
          "Dedicated quiet room available for individuals who need sensory breaks or accommodations",
      },
    ],
    schedules: [
      {
        id: "sched-005",
        location_id: "loc-001",
        valid_from: "2024-01-01",
        valid_to: "2024-12-31",
        freq: "WEEKLY",
        byday: "MO,TU,WE,TH,FR",
        opens_at: "08:00:00",
        closes_at: "20:00:00",
        description: "Main campus operating hours",
      },
      {
        id: "sched-006",
        location_id: "loc-001",
        freq: "WEEKLY",
        byday: "SA",
        opens_at: "09:00:00",
        closes_at: "17:00:00",
        description: "Saturday hours for special programs and events",
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
    phones: [
      {
        id: "phone-007",
        location_id: "loc-002",
        number: "206-555-0106",
        type: "voice",
        description: "South Seattle satellite location main line",
      },
    ],
    languages: [
      {
        id: "lang-009",
        location_id: "loc-002",
        name: "Spanish",
        code: "spa",
        note: "Spanish-speaking staff available daily",
      },
    ],
    accessibilities: [
      {
        id: "acc-005",
        location_id: "loc-002",
        description: "Wheelchair accessible",
        details:
          "Ground floor location with wide doorways and accessible parking spaces",
      },
      {
        id: "acc-006",
        location_id: "loc-002",
        description: "Large print materials",
        details:
          "All program materials available in large print format upon request",
      },
    ],
    schedules: [
      {
        id: "sched-007",
        location_id: "loc-002",
        freq: "WEEKLY",
        byday: "MO,TU,WE,TH,FR",
        opens_at: "14:00:00",
        closes_at: "19:00:00",
        description: "South Seattle satellite operating hours",
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

// Cost Options
export const costOptions: CostOption[] = [
  {
    id: "cost-001",
    service_id: "svc-001",
    valid_from: "2024-01-01",
    valid_to: "2024-12-31",
    option: "Free for eligible participants",
    currency: "USD",
    amount: 0,
    amount_description:
      "No cost for youth who meet income eligibility requirements. Sliding scale fee of $25-$100 for others.",
  },
  {
    id: "cost-002",
    service_id: "svc-002",
    option: "Always free",
    currency: "USD",
    amount: 0,
    amount_description: "Tutoring services are always provided at no cost.",
  },
];

// Required Documents
export const requiredDocuments: RequiredDocument[] = [
  {
    id: "doc-001",
    service_id: "svc-001",
    document: "Government-issued photo ID",
    uri: "https://www.seattleyouthcenter.org/job-training/requirements",
  },
  {
    id: "doc-002",
    service_id: "svc-001",
    document: "Proof of residency in King County",
    uri: "https://www.seattleyouthcenter.org/job-training/requirements",
  },
  {
    id: "doc-003",
    service_id: "svc-001",
    document: "Work authorization documentation",
    uri: "https://www.seattleyouthcenter.org/job-training/requirements",
  },
];

// Organization Identifiers
export const organizationIdentifiers: OrganizationIdentifier[] = [
  {
    id: "orgid-001",
    organization_id: "org-001",
    identifier_scheme: "US-EIN",
    identifier_type: "Employer Identification Number",
    identifier: "91-1234567",
  },
  {
    id: "orgid-002",
    organization_id: "org-001",
    identifier_scheme: "WA-UBI",
    identifier_type: "Washington State UBI Number",
    identifier: "604-123-456",
  },
];

// Service Capacities with Units
export const serviceCapacities: ServiceCapacity[] = [
  {
    id: "cap-001",
    service_id: "svc-001",
    available_capacity: 20,
    updated_at: "2024-01-15T10:00:00Z",
    unit: {
      id: "unit-001",
      service_capacity_id: "cap-001",
      unit_amount: 1,
      unit_type: "participants per session",
      details: "Maximum 20 participants per 8-week training cohort",
    },
  },
  {
    id: "cap-002",
    service_id: "svc-002",
    available_capacity: 50,
    updated_at: "2024-01-15T10:00:00Z",
    unit: {
      id: "unit-002",
      service_capacity_id: "cap-002",
      unit_amount: 1,
      unit_type: "students per day",
      details: "Drop-in tutoring can accommodate up to 50 students daily",
    },
  },
];

// Metadata Records
export const metadataRecords: Metadata[] = [
  {
    id: "meta-001",
    resource_id: "org-001",
    resource_type: "organization",
    updated: "2024-01-15T10:00:00Z",
    updated_by: "data-admin",
    field_name: "description",
    previous_value: "Seattle Youth Opportunities Center is a nonprofit...",
    replacement_value:
      "Seattle Youth Opportunities Center is a nonprofit organization dedicated to empowering youth ages 12-24...",
    update_note:
      "Expanded description to include specific age range and mission details",
  },
  {
    id: "meta-002",
    resource_id: "svc-001",
    resource_type: "service",
    updated: "2024-01-10T14:30:00Z",
    updated_by: "program-coordinator",
    field_name: "eligibility",
    previous_value: "Youth ages 16-24",
    replacement_value: "Youth ages 16-24 who are residents of King County",
    update_note: "Added geographic eligibility requirement",
  },
];

// Taxonomy
export const taxonomies: Taxonomy[] = [
  {
    id: "tax-sys-001",
    name: "Youth Services Taxonomy",
    description:
      "A comprehensive taxonomy for categorizing youth development services and programs",
    uri: "https://www.seattleyouthcenter.org/taxonomy",
    version: "2.1",
  },
];

// Meta Table Descriptions
export const metaTableDescriptions: MetaTableDescription[] = [
  {
    id: "table-desc-001",
    name: "Seattle Youth HSDS Dataset",
    language: "en-US",
    character_set: "UTF-8",
  },
];

// Standalone Phone Numbers Collection
export const phoneNumbers: Phone[] = [
  {
    id: "phone-005",
    organization_id: "org-001",
    number: "206-555-0104",
    type: "fax",
    description: "Organization fax line",
  },
  {
    id: "phone-006",
    service_id: "svc-003",
    number: "206-555-0105",
    type: "text",
    description: "Text line for Youth Leadership Council inquiries",
  },
  {
    id: "phone-007",
    location_id: "loc-002",
    number: "206-555-0106",
    type: "voice",
    description: "South Seattle satellite location main line",
  },
];

// Standalone Addresses Collection
export const addresses: Address[] = [
  {
    id: "addr-003",
    location_id: "loc-001",
    address_type: "postal",
    address_1: "P.O. Box 12345",
    city: "Seattle",
    state_province: "WA",
    postal_code: "98102",
    country: "USA",
    region: "King County",
  },
  {
    id: "addr-004",
    location_id: "loc-002",
    address_type: "postal",
    address_1: "P.O. Box 67890",
    city: "Seattle",
    state_province: "WA",
    postal_code: "98118",
    country: "USA",
    region: "King County",
  },
];

// Comprehensive Schedules Collection
export const schedules: Schedule[] = [
  {
    id: "sched-004",
    service_id: "svc-003",
    valid_from: "2024-01-01",
    valid_to: "2024-12-31",
    freq: "MONTHLY",
    interval: 1,
    byday: "SA",
    bysetpos: "2",
    opens_at: "10:00:00",
    closes_at: "15:00:00",
    description: "Youth Leadership Council meets second Saturday of each month",
  },
  {
    id: "sched-005",
    location_id: "loc-001",
    valid_from: "2024-01-01",
    valid_to: "2024-12-31",
    freq: "WEEKLY",
    byday: "MO,TU,WE,TH,FR",
    opens_at: "08:00:00",
    closes_at: "20:00:00",
    description: "Main campus operating hours",
  },
  {
    id: "sched-006",
    location_id: "loc-001",
    freq: "WEEKLY",
    byday: "SA",
    opens_at: "09:00:00",
    closes_at: "17:00:00",
    description: "Saturday hours for special programs and events",
  },
  {
    id: "sched-007",
    location_id: "loc-002",
    freq: "WEEKLY",
    byday: "MO,TU,WE,TH,FR",
    opens_at: "14:00:00",
    closes_at: "19:00:00",
    description: "South Seattle satellite operating hours",
  },
];

// Comprehensive Languages Collection
export const languages: Language[] = [
  {
    id: "lang-005",
    location_id: "loc-001",
    name: "Vietnamese",
    code: "vie",
    note: "Vietnamese interpretation available with 48-hour advance notice",
  },
  {
    id: "lang-006",
    location_id: "loc-001",
    name: "Somali",
    code: "som",
    note: "Somali interpretation available Tuesday-Thursday",
  },
  {
    id: "lang-007",
    service_id: "svc-001",
    name: "English",
    code: "eng",
    note: "Primary language of instruction",
  },
  {
    id: "lang-008",
    service_id: "svc-003",
    name: "American Sign Language",
    code: "ase",
    note: "ASL interpretation available for all leadership meetings",
  },
  {
    id: "lang-009",
    location_id: "loc-002",
    name: "Spanish",
    code: "spa",
    note: "Spanish-speaking staff available daily",
  },
  {
    id: "lang-010",
    location_id: "loc-001",
    name: "Tagalog",
    code: "tgl",
    note: "Tagalog interpretation services available upon request",
  },
];

// Comprehensive Accessibility Collection
export const accessibilityFeatures: Accessibility[] = [
  {
    id: "acc-003",
    location_id: "loc-001",
    description: "Braille signage",
    details:
      "All floor directories and room signs include Braille translations",
    url: "https://www.seattleyouthcenter.org/accessibility",
  },
  {
    id: "acc-004",
    location_id: "loc-001",
    description: "Service animal accommodations",
    details:
      "Service animals welcome throughout facility with designated relief areas available",
  },
  {
    id: "acc-005",
    location_id: "loc-002",
    description: "Wheelchair accessible",
    details:
      "Ground floor location with wide doorways and accessible parking spaces",
  },
  {
    id: "acc-006",
    location_id: "loc-002",
    description: "Large print materials",
    details:
      "All program materials available in large print format upon request",
  },
  {
    id: "acc-007",
    location_id: "loc-001",
    description: "Quiet sensory space",
    details:
      "Dedicated quiet room available for individuals who need sensory breaks or accommodations",
  },
];

// Service Areas Collection
export const serviceAreas: ServiceArea[] = [
  {
    id: "sa-002",
    service_id: "svc-002",
    service_area: "King County",
    description: "Tutoring services available to all King County residents",
    uri: "https://gis.kingcounty.gov/",
  },
  {
    id: "sa-003",
    service_id: "svc-003",
    service_area: "Seattle Metro Area",
    minimum_area: "Seattle City Limits",
    description:
      "Leadership Council open to youth from Seattle and surrounding communities",
  },
  {
    id: "sa-004",
    service_id: "svc-001",
    service_area: "Washington State",
    minimum_area: "King County",
    description:
      "Job training available to King County residents, with some programs open statewide",
  },
];

// Additional URLs Collection
export const additionalUrls: Url[] = [
  {
    id: "url-003",
    entity_id: "svc-001",
    entity_type: "service",
    label: "Job Training Application Portal",
    url: "https://www.seattleyouthcenter.org/apply/job-training",
  },
  {
    id: "url-004",
    entity_id: "svc-002",
    entity_type: "service",
    label: "Tutoring Schedule and Resources",
    url: "https://www.seattleyouthcenter.org/tutoring/schedule",
  },
  {
    id: "url-005",
    entity_id: "svc-003",
    entity_type: "service",
    label: "Youth Leadership Council Blog",
    url: "https://www.seattleyouthcenter.org/leadership/blog",
  },
  {
    id: "url-006",
    entity_id: "org-001",
    entity_type: "organization",
    label: "Annual Report",
    url: "https://www.seattleyouthcenter.org/reports/annual-2023",
  },
  {
    id: "url-007",
    entity_id: "org-001",
    entity_type: "organization",
    label: "YouTube Channel",
    url: "https://www.youtube.com/c/SeattleYouthCenter",
  },
];

// Funding Sources Collection
export const fundingSources: Funding[] = [
  {
    id: "fund-004",
    service_id: "svc-001",
    source: "Washington State Department of Commerce",
  },
  {
    id: "fund-005",
    service_id: "svc-002",
    source: "Seattle Public Schools Partnership Grant",
  },
  {
    id: "fund-006",
    service_id: "svc-003",
    source: "Youth Development Initiative Grant",
  },
  {
    id: "fund-007",
    organization_id: "org-001",
    source: "Individual Donations",
  },
  {
    id: "fund-008",
    organization_id: "org-001",
    source: "Corporate Sponsorships",
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
  cost_options: costOptions,
  required_documents: requiredDocuments,
  organization_identifiers: organizationIdentifiers,
  service_capacities: serviceCapacities,
  metadata_records: metadataRecords,
  taxonomies,
  meta_table_descriptions: metaTableDescriptions,

  // Additional comprehensive collections
  phone_numbers: phoneNumbers,
  addresses,
  schedules,
  languages,
  accessibility_features: accessibilityFeatures,
  service_areas: serviceAreas,
  additional_urls: additionalUrls,
  funding_sources: fundingSources,

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
