import { Code, Database, Zap, Globe, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const AboutSCS = () => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
            <Database className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seattle Civic Standard (SCS)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A unified, interoperable data standard designed to make civic information
            accessible, consistent, and easy to use across all municipal systems.
          </p>
        </div>

        {/* The Problem Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Challenge</h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              Municipal governments struggle with <strong>data silos</strong> and <strong>incompatible formats</strong>.
              A farmers market dataset uses different fields than a community center dataset.
              Youth programs are structured differently than park facilities. This fragmentation makes
              it difficult to build comprehensive civic applications and wastes taxpayer resources on
              duplicate data infrastructure.
            </p>
          </div>
        </div>

        {/* The Solution Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Solution: One Standard, All Data</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <Zap className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600 text-sm">
                Build once, work everywhere. Applications can consume any civic data using the same interface.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <Globe className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interoperability</h3>
              <p className="text-gray-600 text-sm">
                Different departments and systems can share data seamlessly without custom integrations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <Users className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                Citizens and developers get consistent, easy-to-understand data about their community.
              </p>
            </div>
          </div>
        </div>

        {/* Core Fields Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6 Required Fields, Infinite Possibilities</h2>
          <p className="text-gray-600 mb-8">
            The SCS requires just <strong>6 core fields</strong> that answer the fundamental questions
            about any civic entity. Everything else is optional and extensible.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { field: "id", type: "string", description: "A unique identifier - What makes this entity unique?" },
              { field: "name", type: "string", description: "What it's called - The official name" },
              { field: "type", type: "string", description: "What kind of thing it is - Category or classification" },
              { field: "description", type: "string", description: "What it is in plain English - A human-readable explanation" },
              { field: "location", type: "string | LocationInfo", description: "Where it is - Address and/or coordinates" },
              { field: "contact", type: "ContactInfo", description: "How to get more information - Phone, email, website" },
            ].map((field, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <code className="text-blue-600 font-mono font-semibold text-lg">{field.field}</code>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">{field.type}</span>
                </div>
                <p className="text-gray-600 text-sm">{field.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TypeScript Interface Display */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Code className="w-7 h-7 text-blue-600" />
            The Interface
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{`interface CivicEntity {
  // ===== REQUIRED FIELDS =====
  id: string;                    // Unique identifier
  name: string;                  // Official name
  type: string;                  // Entity type/category
  description: string;           // Human-readable description
  location: string | LocationInfo;  // Address and/or coordinates
  contact: ContactInfo;          // Contact information

  // ===== OPTIONAL FIELDS =====
  schedule?: ScheduleInfo[];     // Operating hours/schedule
  dates?: DateRange;             // Start and end dates
  cost?: string;                 // Pricing information
  ageRange?: string;             // Target age group
  capacity?: number;             // Max participants/visitors
  accessibility?: string;        // Accessibility features
  features?: string[];           // Key features/amenities
  tags?: string[];               // Searchable tags
  eligibility?: string;          // Who can participate
  registration?: string;         // How to register
  organization?: string;         // Managing organization
  neighborhood?: string;         // Neighborhood location
  links?: LinkInfo[];            // Additional resources
  lastUpdated?: string;          // Last update timestamp
}

// Supporting Types
interface LocationInfo {
  address?: string;
  coordinates?: { lat: number; lng: number };
}

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

interface ScheduleInfo {
  day?: string;
  hours?: string;
}

interface DateRange {
  start: string;
  end: string;
}`}</code>
            </pre>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Benefits</h2>
          <div className="space-y-4">
            {[
              {
                title: "For Developers",
                items: [
                  "Single interface to learn - works across all civic datasets",
                  "Full TypeScript support with type safety",
                  "Easy filtering, searching, and data manipulation",
                  "No custom parsers or transformers needed"
                ]
              },
              {
                title: "For Municipal Governments",
                items: [
                  "Reduce IT costs through shared infrastructure",
                  "Improve data quality with standardized formats",
                  "Enable cross-department collaboration",
                  "Faster deployment of civic applications"
                ]
              },
              {
                title: "For Citizens",
                items: [
                  "Better discoverability of civic resources",
                  "Consistent experience across all civic apps",
                  "More comprehensive information access",
                  "Increased government transparency"
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Example Data */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example: Same Format, Different Data</h2>
          <p className="text-gray-600 mb-6">
            Whether it's a farmers market, community center, or youth program - they all use the same structure:
          </p>

          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{`// Farmers Market
{
  "id": "farmers-market-15",
  "name": "Ballard Farmers Market",
  "type": "Farmers Market",
  "description": "Weekly farmers market featuring local produce...",
  "location": {
    "address": "22nd Ave NW / NW Market St",
    "coordinates": { "lat": 47.6682, "lng": -122.3842 }
  },
  "contact": { "website": "https://..." },
  "schedule": [{ "day": "Sunday", "hours": "9 am - 2 pm" }],
  "cost": "Free to attend"
}

// Community Center (same structure!)
{
  "id": "ballard-community-center",
  "name": "Ballard Community Center",
  "type": "Community Center",
  "description": "Full-service community center offering...",
  "location": {
    "address": "6020 28th Ave NW, Seattle, WA 98107",
    "coordinates": { "lat": 47.6698, "lng": -122.3997 }
  },
  "contact": { "phone": "(206) 684-4093", "website": "..." },
  "schedule": [{ "day": "Monday-Friday", "hours": "6 AM - 9 PM" }],
  "features": ["gymnasium", "pool", "fitness room"]
}`}</code>
            </pre>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Current SCS Implementation</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">3,176</div>
                <div className="text-blue-100">Total Entities</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">9</div>
                <div className="text-blue-100">Data Sources</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Compliant</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1</div>
                <div className="text-blue-100">Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore all 3,176 SCS-formatted civic entities in our interactive data explorer.
            Search, filter, and discover Seattle's civic resources in a unified format.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/scs-explorer">
              Explore SCS Data
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSCS;
