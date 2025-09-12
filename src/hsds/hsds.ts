/**
 * Human Services Data Specification (HSDS) TypeScript Schemas
 * Version: 3.0
 * Based on: https://docs.openreferral.org/en/latest/hsds/schema_reference.html
 */

// ===== CORE OBJECTS =====

// top 4 types, for the simplification would be good.
// organization, service, location, service_at_location

/**
 * The details about each organization delivering services.
 * Each service should be linked to the organization responsible for its delivery.
 * One organization may deliver many services.
 */
export interface Organization {
  /** The identifier for the organization. Each organization must have a unique identifier. */
  id: string; // uuid format

  /** The official or public name of the organization. */
  name: string;

  /** An (optional) alternative or commonly used name for the organization. */
  alternate_name?: string;

  /** A free text description containing a brief summary about the organization. It can contain markup such as HTML or Markdown. */
  description: string;

  /** The contact e-mail address for the organization. */
  email?: string; // email format

  /** The URL (website address) of the organization. */
  website?: string; // uri format

  /** The details of additional websites for the organization. */
  additional_websites?: Url[];

  /** DEPRECATED: Government assigned tax designation for tax-exempt organizations. */
  tax_status?: string;

  /** DEPRECATED: A government issued identifier used for the purpose of tax administration. */
  tax_id?: string;

  /** The year in which the organization was legally formed. */
  year_incorporated?: number;

  /** The legal conditions that an organization is operating under. */
  legal_status?: string;

  /** A URL to an image associated with the organization which can be presented alongside its name. */
  logo?: string;

  /** A persistent identifier to uniquely identify the organization such as those provided by Open Corporates or some other relevant URI provider. */
  uri?: string; // uri format

  /** The identifier of the organization's parent organization. */
  parent_organization_id?: string; // uuid format

  /** The sources of funding for a service or organization. */
  funding?: Funding[];

  /** The details of the named contacts for services and organizations. */
  contacts?: Contact[];

  /** The details of the telephone numbers are used to contact organizations, services, and locations. */
  phones?: Phone[];

  /** The details of the locations where organizations operate. */
  locations?: Location[];

  /** The details of collection of related services. */
  programs?: Program[];

  /** The details of the organization identifiers. */
  organization_identifiers?: OrganizationIdentifier[];

  /** The details of the attributes. */
  attributes?: Attribute[];

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the services provided by organizations to a range of different groups.
 */
export interface Service {
  /** The identifier for the service. Each service must have a unique identifier. */
  id: string; // uuid format

  /** The identifier of the organization that provides this service. */
  organization_id: string; // uuid format

  /** The identifier of the program this service is delivered under. */
  program_id?: string; // uuid format

  /** The official or public name of the service. */
  name: string;

  /** An (optional) alternative or commonly used name for a service. */
  alternate_name?: string;

  /** A free text description of the service. */
  description?: string;

  /** A website that provides information about the service. */
  url?: string; // uri format

  /** A list of website links that provide information about the service. */
  additional_urls?: Url[];

  /** The email address that can be used to contact the service provider. */
  email?: string; // email format

  /** The current status of the service which can be active, inactive, defunct, or temporarily unavailable. */
  status: "active" | "inactive" | "defunct" | "temporarily unavailable";

  /** The details of the services provided at a location. */
  interpretation_services?: string;

  /** The details of the arrangements that can be made to access the service. */
  application_process?: string;

  /** The time it takes to access or obtain the service. */
  service_wait_time?: string;

  /** Any charges for service users to access the service. */
  fees?: string;

  /** The details of the costs of services. */
  fees_description?: string;

  /** The details of any accreditations. */
  accreditations?: string;

  /** The eligibility criteria that must be met in order to participate in the service or program. */
  eligibility?: string;

  /** The criteria that must be met in order to qualify for the service. */
  eligibility_description?: string;

  /** The minimum age required to meet the eligibility criteria. */
  minimum_age?: number;

  /** The maximum age required to meet the eligibility criteria. */
  maximum_age?: number;

  /** Any additional information about the service. */
  assured_date?: string; // date format

  /** The date when information about the service was last updated. */
  assurer_email?: string; // email format

  /** The details of the licenses required to operate the service. */
  licenses?: string;

  /** A free text alert that describes any additional information that users need to know about the service. */
  alert?: string;

  /** The date this service was last modified. */
  last_modified?: string; // date-time format

  /** The details of the phones. */
  phones?: Phone[];

  /** The details of the schedules of service. */
  schedules?: Schedule[];

  /** The details of the service areas. */
  service_areas?: ServiceArea[];

  /** The details of the service at locations. */
  service_at_locations?: ServiceAtLocation[];

  /** Languages spoken at the service. */
  languages?: Language[];

  /** The details of the organization that provides this service. */
  organization?: Organization;

  /** The details of the sources of funding for a service or organization. */
  funding?: Funding[];

  /** The details of the options for paying for the service. */
  cost_options?: CostOption[];

  /** The details of the program this service is delivered under. */
  program?: Program;

  /** The details of the documents that are required to access or use the service. */
  required_documents?: RequiredDocument[];

  /** The details of the named contacts for services and organizations. */
  contacts?: Contact[];

  /** The details of the capacities of services. */
  capacities?: ServiceCapacity[];

  /** The details of the attributes. */
  attributes?: Attribute[];

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the locations where organizations operate.
 * Locations may be virtual, and one organization may have many locations.
 */
export interface Location {
  /** The identifier of the location. Each location must have a unique identifier. */
  id: string; // uuid format

  /** The identifier of the organization that has the location. */
  organization_id?: string; // uuid format

  /** The descriptive name of the location. */
  name?: string;

  /** An (optional) alternative or commonly used name for the location. */
  alternate_name?: string;

  /** A free text description of the location. */
  description?: string;

  /** The transportation options that are available at the location. */
  transportation?: string;

  /** The latitude of the location expressed in decimal degrees in WGS84 datum. */
  latitude?: number;

  /** The longitude of the location expressed in decimal degrees in WGS84 datum. */
  longitude?: number;

  /** A URL to information about the location, which must include the location of the information source and protocol. */
  external_identifier?: string;

  /** A URL to information about the location, which must include the location of the information source and protocol. */
  external_identifier_type?: string;

  /** The details of the addresses. */
  addresses?: Address[];

  /** The details of the phones. */
  phones?: Phone[];

  /** The details of the schedules of service. */
  schedules?: Schedule[];

  /** Languages spoken at the location. */
  languages?: Language[];

  /** The details of the accessibility of locations. */
  accessibilities?: Accessibility[];

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * A link table that creates a relationship between a service and a location.
 */
export interface ServiceAtLocation {
  /** The identifier of the service at location. */
  id: string; // uuid format

  /** The identifier of the service at a given location. */
  service_id: string; // uuid format

  /** The identifier of the location where this service is delivered. */
  location_id: string; // uuid format

  /** A free text description of the service at this specific location. */
  description?: string;

  /** The details of the service. */
  service?: Service;

  /** The details of the location. */
  location?: Location;

  /** The details of the schedules of service. */
  schedules?: Schedule[];

  /** The details of the contacts. */
  contacts?: Contact[];

  /** The details of the phones. */
  phones?: Phone[];

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

// ===== OTHER OBJECTS =====

/**
 * The addresses of locations where organizations operate.
 */
export interface Address {
  /** The identifier of the postal address. */
  id: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** The type of address which may be physical, postal, or virtual. */
  address_type: "physical" | "postal" | "virtual";

  /** The first line of the address. */
  address_1: string;

  /** The second line of the address. */
  address_2?: string;

  /** The city in which the address is located. */
  city: string;

  /** The region in which the address is located. */
  region?: string;

  /** The state or province in which the address is located. */
  state_province: string;

  /** The postal code for the address. */
  postal_code: string;

  /** The country in which the address is located. */
  country: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the telephone numbers used to contact organizations, services, and locations.
 */
export interface Phone {
  /** The identifier of the phone. */
  id: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** The identifier of the service. */
  service_id?: string; // uuid format

  /** The identifier of the organization. */
  organization_id?: string; // uuid format

  /** The identifier of the contact. */
  contact_id?: string; // uuid format

  /** The identifier of the service at location. */
  service_at_location_id?: string; // uuid format

  /** The phone number. */
  number: string;

  /** The extension of the phone number. */
  extension?: number;

  /** Indicates the type of phone service. */
  type?: "text" | "voice" | "fax" | "cell" | "video" | "pager" | "textphone";

  /** The ISO 639-1 or ISO 639-3 code used to represent the language. */
  language?: string;

  /** A free text description of the phone number. */
  description?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The schedules of services.
 */
export interface Schedule {
  /** The identifier of the schedule. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id?: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** The identifier of the service at location. */
  service_at_location_id?: string; // uuid format

  /** The first day that a service or location is open. */
  valid_from?: string; // date format

  /** The last day that a service or location is open. */
  valid_to?: string; // date format

  /** Dates that the service or location is not open. */
  dtstart?: string; // date-time format

  /** A string representing the frequency of the schedule. */
  timezone?: number;

  /** A string representing the frequency of the schedule. */
  until?: string; // date-time format

  /** A string representing the count of the schedule. */
  count?: number;

  /** A string representing the weeks of the month. */
  wkst?: "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

  /** A string representing the frequency of the schedule. */
  freq?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

  /** A string representing the interval of the frequency. */
  interval?: number;

  /** A string representing the days of the week. */
  byday?: string;

  /** A string representing the days of the month. */
  bymonthday?: string;

  /** A string representing the months of the year. */
  byyearday?: string;

  /** A string representing the week numbers. */
  byweekno?: string;

  /** A string representing the months of the year. */
  bymonth?: string;

  /** A string representing the occurrence of weekday. */
  bysetpos?: string;

  /** A string representing the days of the week. */
  schedule_link?: string;

  /** The time that a service or location opens. */
  opens_at?: string; // time format

  /** The time that a service or location closes. */
  closes_at?: string; // time format

  /** A free text description of a service or location's schedule. */
  description?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The geographic area where a service is available.
 */
export interface ServiceArea {
  /** The identifier of the service area. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id: string; // uuid format

  /** The geographic area where a service is available. */
  service_area?: string;

  /** The minimum geographical area for which the service or location is available. */
  minimum_area?: string;

  /** A free text description of a service area. */
  description?: string;

  /** A string representing the URI of a GeoJSON object. */
  uri?: string; // uri format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the languages that are spoken at locations or services.
 */
export interface Language {
  /** The identifier of the language. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id?: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** The identifier of the phone. */
  phone_id?: string; // uuid format

  /** The name of the language. */
  name?: string;

  /** The ISO 639-1 or ISO 639-3 code used to represent the language. */
  code?: string;

  /** A free text description of any additional context or notes about the language availability. */
  note?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The sources of funding for a service or organization.
 */
export interface Funding {
  /** The identifier of the funding. */
  id: string; // uuid format

  /** The identifier of the organization. */
  organization_id?: string; // uuid format

  /** The identifier of the service. */
  service_id?: string; // uuid format

  /** The name of the source of funds. */
  source?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the arrangements for access to services.
 */
export interface Accessibility {
  /** The identifier of the accessibility information. */
  id: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** A free text description of the assistance or infrastructure. */
  description?: string;

  /** A free text description of any additional details. */
  details?: string;

  /** A website that provides information about the accessibility of the service. */
  url?: string; // uri format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The costs of services.
 */
export interface CostOption {
  /** The identifier of the cost option. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id: string; // uuid format

  /** A description of the costs of the service. */
  valid_from?: string; // date format

  /** The date when this cost option starts to apply. */
  valid_to?: string; // date format

  /** The currency used for the amount. */
  option?: string;

  /** The currency used for the amount. */
  currency?: string;

  /** The cost of the service. */
  amount?: number;

  /** A description of when the amount is applicable. */
  amount_description?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of collection of related services.
 */
export interface Program {
  /** The identifier of the program. */
  id: string; // uuid format

  /** The identifier of the organization that manages the program. */
  organization_id: string; // uuid format

  /** The name of the program. */
  name: string;

  /** An alternative name for the program. */
  alternate_name?: string;

  /** A free text description of the program. */
  description: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of any documents that are required to access or use a service.
 */
export interface RequiredDocument {
  /** The identifier of the required document. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id: string; // uuid format

  /** The name of the required document. */
  document?: string;

  /** A URI pointing to further information about the document. */
  uri?: string; // uri format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the named contacts for services and organizations.
 */
export interface Contact {
  /** The identifier of the contact. */
  id: string; // uuid format

  /** The identifier of the organization. */
  organization_id?: string; // uuid format

  /** The identifier of the service. */
  service_id?: string; // uuid format

  /** The identifier of the service at location. */
  service_at_location_id?: string; // uuid format

  /** The identifier of the location. */
  location_id?: string; // uuid format

  /** The name of the contact. */
  name?: string;

  /** The job title of the contact. */
  title?: string;

  /** The department that the contact works in. */
  department?: string;

  /** The email address of the contact. */
  email?: string; // email format

  /** The details of the phones. */
  phones?: Phone[];

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the third party identifiers for organizations.
 */
export interface OrganizationIdentifier {
  /** The identifier of the organization identifier. */
  id: string; // uuid format

  /** The identifier of the organization. */
  organization_id: string; // uuid format

  /** A codified type of identifier. */
  identifier_scheme?: string;

  /** The third party identifier value. */
  identifier_type: string;

  /** The third party identifier value. */
  identifier: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the units of measures for services.
 */
export interface Unit {
  /** The identifier of the unit. */
  id: string; // uuid format

  /** The identifier of the service capacity. */
  service_capacity_id: string; // uuid format

  /** The value of the unit. */
  unit_amount: number;

  /** The type of units. */
  unit_type: string;

  /** Additional information about the units. */
  details?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the capacity of services.
 */
export interface ServiceCapacity {
  /** The identifier of the service capacity. */
  id: string; // uuid format

  /** The identifier of the service. */
  service_id: string; // uuid format

  /** The details of the units of measures for services. */
  unit?: Unit;

  /** The amount of capacity of the service. */
  available_capacity?: number;

  /** The latest date that the capacity information is valid until. */
  updated_at?: string; // date-time format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the attributes.
 */
export interface Attribute {
  /** The identifier of the attribute. */
  id: string; // uuid format

  /** The name of the entity being linked to. */
  link_entity: string;

  /** The identifier of the entity being linked to. */
  link_id: string; // uuid format

  /** The identifier of the taxonomy term. */
  taxonomy_term_id?: string; // uuid format

  /** The taxonomy term. */
  taxonomy_term?: TaxonomyTerm;

  /** The value of this attribute. */
  value?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The details of the websites for organizations and services.
 */
export interface Url {
  /** The identifier of the URL. */
  id: string; // uuid format

  /** The identifier of the entity that the URL describes. */
  entity_id: string; // uuid format

  /** The type of entity that the URL describes. */
  entity_type: "organization" | "service";

  /** A human-readable label for the URL. */
  label: string;

  /** The URL of the website. */
  url: string; // uri format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * A record of the changes that have been made to the data.
 */
export interface Metadata {
  /** The identifier of the metadata. */
  id: string; // uuid format

  /** The name of the resource. */
  resource_id: string; // uuid format

  /** The type of entity that the metadata describes. */
  resource_type:
    | "organization"
    | "program"
    | "service"
    | "service_at_location"
    | "location"
    | "phone"
    | "contact"
    | "physical_address"
    | "postal_address"
    | "schedule"
    | "funding"
    | "eligibility"
    | "service_area"
    | "required_document"
    | "payment_accepted"
    | "language"
    | "accessibility"
    | "service_taxonomy"
    | "organization_identifier"
    | "cost_option"
    | "service_capacity"
    | "attribute"
    | "url";

  /** The date when the resource was created. */
  created?: string; // date-time format

  /** The date when the resource was last updated. */
  updated: string; // date-time format

  /** The identifier of the user who updated the metadata. */
  updated_by?: string;

  /** The format of the metadata. */
  format?: string;

  /** The language of the metadata. */
  language?: string;

  /** A human-readable field name that the metadata item relates to. */
  field_name?: string;

  /** The previous value of the field. */
  previous_value?: string;

  /** The new or replacement value of the field. */
  replacement_value?: string;

  /** A record of the update source. */
  update_note?: string;
}

/**
 * A human-readable description of a metadata table.
 */
export interface MetaTableDescription {
  /** The identifier of the meta table description. */
  id: string; // uuid format

  /** The name of the table. */
  name?: string;

  /** The ISO 639-1 or ISO 639-3 code used to represent the language of the table. */
  language?: string;

  /** The character encoding of the table. */
  character_set?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * The taxonomies used to define services.
 */
export interface Taxonomy {
  /** The identifier of the taxonomy. */
  id: string; // uuid format

  /** The name of the taxonomy. */
  name: string;

  /** A free text description of the taxonomy. */
  description: string;

  /** The URI of the taxonomy. */
  uri?: string; // uri format

  /** The version of the taxonomy. */
  version?: string;

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}

/**
 * Each service can be categorized according to one or more taxonomy terms.
 * The taxonomy_term object contains a list of taxonomy terms, their names, and, for hierarchical taxonomies, their structure.
 */
export interface TaxonomyTerm {
  /** The identifier for this taxonomy term. Each taxonomy term must have a unique identifier, within the scope of the dataset. */
  id: string; // uuid format

  /** The term identfier as used in the taxonomy. This and the taxonomy_id combined define the term. */
  code?: string;

  /** The taxonomy term itself. */
  name: string;

  /** A free text description of the term. */
  description: string;

  /** If this is a child term in a hierarchical taxonomy, give the identifier of the parent category. For top-level categories, this is not required. */
  parent_id?: string; // uuid format

  /** If this is an established taxonomy, a free text description of which taxonomy is in use. If possible, provide a URI. */
  taxonomy?: string;

  /** Taxonomies from which taxonomy terms are taken */
  taxonomy_detail?: Taxonomy;

  /** An ISO 639-1, ISO 639-2, or ISO 639-3 language code to represent the language of the term. */
  language?: string;

  /** The identifier of the taxonomy containing the term. */
  taxonomy_id?: string; // uuid format

  /** URI of the term. */
  term_uri?: string; // uri format

  /** A record of the changes that have been made to the data in order to maintain provenance information. */
  metadata?: Metadata[];
}
