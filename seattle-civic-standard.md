# Seattle Civic Standard Model (SCS Model)

## Overview

The Seattle Civic Standard Model (SCS Model) is a simple, practical framework for how local governments should structure their civic data. It provides just enough standardization to enable interoperability without overwhelming smaller jurisdictions with technical complexity.

## The Problem

Every city department publishes data differently. Parks uses one format, Community Services uses another, Transportation uses a third. This makes it nearly impossible for developers to build applications that work across departments or cities. The SCS Model solves this with a simple, common structure.

## Core Philosophy

**Simplicity First**: The model should be so simple that a spreadsheet user can understand and implement it without specialized technical knowledge.

**Minimal Required Fields**: Only require what's truly essential. Everything else is optional.

**Human-Readable**: Field names should be clear English, not technical jargon.

**Extensible**: Governments can add their own fields without breaking compatibility.

## The Model

Every civic entity (a program, facility, service, or resource) needs just **6 core fields**:

1. **id** - A unique identifier (can be simple like "ballard-community-center-01")
2. **name** - What it's called
3. **type** - What kind of thing it is (e.g., "Community Center", "Youth Program", "Park")
4. **description** - What it is in plain English
5. **location** - Where it is (address and/or coordinates)
6. **contact** - How to get more information (phone, email, or website)

That's it. Six fields. If you have those, your data is SCS-compliant.

## Optional Common Fields

Beyond the core 6, these common fields are recommended when applicable:

- **schedule** - When it's open or operates
- **dates** - Start and end dates for programs
- **cost** - Any fees or costs
- **ageRange** - Who it's for (age-wise)
- **accessibility** - Wheelchair accessible, languages, etc.
- **tags** - Categories for filtering (e.g., ["youth", "sports", "free"])
- **lastUpdated** - When this data was last verified

## Example: Community Center

```json
{
  "id": "ballard-community-center",
  "name": "Ballard Community Center",
  "type": "Community Center",
  "description": "Full-service community center with gym, pool, and programs",
  "location": {
    "address": "6020 28th Ave NW, Seattle, WA 98107",
    "coordinates": {"lat": 47.6698, "lng": -122.3997}
  },
  "contact": {
    "phone": "(206) 684-4093",
    "website": "https://www.seattle.gov/parks/find/centers/ballard-community-center"
  },
  "schedule": [
    {"day": "Monday-Friday", "hours": "6:00 AM - 9:00 PM"},
    {"day": "Saturday", "hours": "9:00 AM - 5:00 PM"}
  ],
  "accessibility": "Wheelchair accessible, ASL interpretation available",
  "tags": ["community center", "recreation", "fitness"],
  "lastUpdated": "2025-01-15"
}
```

## Example: Youth Program

```json
{
  "id": "summer-basketball-youth-2025",
  "name": "Summer Youth Basketball League",
  "type": "Youth Program",
  "description": "Free basketball program for middle school students",
  "location": {
    "address": "Green Lake Community Center",
    "coordinates": {"lat": 47.6815, "lng": -122.3276}
  },
  "contact": {
    "phone": "(206) 684-0780",
    "email": "greenlake@seattle.gov"
  },
  "dates": {
    "start": "2025-06-15",
    "end": "2025-08-20"
  },
  "schedule": [
    {"day": "Monday, Wednesday", "hours": "4:00 PM - 6:00 PM"}
  ],
  "ageRange": "11-14 years",
  "cost": "Free",
  "tags": ["youth", "sports", "basketball", "free", "summer"],
  "lastUpdated": "2025-02-01"
}
```

## Implementation Guidelines

### For Small Governments

**Start Simple**: Just export a JSON file with your programs/facilities using the 6 core fields. Put it on your website.

**Use What You Have**: If you're already tracking this data in Excel, just add the core field columns. Export to CSV, convert to JSON.

**Don't Overthink It**: The ID can be anything unique. "program-001" works fine. Location can just be an address string if you don't have coordinates.

### For Developers

**Be Forgiving**: Accept variations. If a city only has 4 of the 6 core fields, work with it. The standard is aspirational.

**Map Existing Fields**: Many cities already have this data, just with different names. Map their field names to SCS fields.

**Validate Gently**: Check for core fields but don't fail if optional fields are missing or formatted differently.

## Benefits

**For Small Cities**: No expensive consultants needed. No complex database requirements. Just structure your existing data a bit differently.

**For Developers**: One format to learn, works everywhere. Write your app once, it works in any SCS-compliant city.

**For Residents**: Better apps and services because developers can actually build useful tools with the data.

## Adoption Path

1. **Pilot**: Seattle publishes 3-5 datasets in SCS format
2. **Refine**: Gather feedback from other jurisdictions
3. **Document**: Create simple how-to guides with examples
4. **Share**: Offer the standard to Washington State cities for free
5. **Expand**: Once proven, share with national civic tech community

## Comparison to Other Standards

Unlike complex standards (HSDS, GTFS, etc.), SCS Model prioritizes:
- **Simplicity over comprehensiveness**
- **Implementation over specification**
- **Accessibility over technical precision**

The goal isn't to be the most complete standard—it's to be the one that actually gets used.

## Conclusion

The Seattle Civic Standard Model proves that civic data standardization doesn't require complexity. With just 6 core fields and a handful of common optional fields, local governments can make their data interoperable, accessible, and useful—without needing specialized technical expertise or significant resources.
