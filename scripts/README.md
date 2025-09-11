# Markdown to JSON Conversion Script

This script processes markdown files from the `scraped-content` directory and converts them to structured JSON using OpenAI GPT.

## Setup

1. Set your OpenAI API key as an environment variable:

   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

2. Run the script:

   **Batch mode (default - processes all files):**

   ```bash
   npm run convert
   # or directly:
   node scripts/markdown-to-json.js
   ```

   **Interactive single file mode:**

   ```bash
   npm run convert -- --single
   # or:
   node scripts/markdown-to-json.js --single
   # or short form:
   node scripts/markdown-to-json.js -s
   ```

   **Process a specific file:**

   ```bash
   npm run convert -- Fire_Cadets_\(15+\).md
   # or:
   node scripts/markdown-to-json.js "Online_Tutoring_(5-18).md"
   ```

## Processing Modes

### 1. Batch Mode (Default)

- Processes all `.md` files from the `scraped-content` directory automatically
- Best for production runs when you want to convert all files

### 2. Interactive Single File Mode (`--single` or `-s`)

- Shows a numbered list of available markdown files
- Lets you select which file to process by entering its number
- Processes one file at a time with the option to continue or quit
- Great for testing or selective processing

### 3. Specific File Mode

- Process a single specific file by providing its filename as an argument
- Useful when you know exactly which file you want to convert
- Example: `node scripts/markdown-to-json.js "Fire_Cadets_(15+).md"`

## What it does

- Uses OpenAI GPT-4o-mini to extract structured program information
- Converts markdown files to JSON files with the same base name
- Saves JSON files to `data/programs/` directory

## Output Format

Each JSON file contains an array of program objects with the following structure:

```json
{
  "programs": [
    {
      "id": "unique-program-id",
      "organizationName": "Organization Name",
      "programDescription": "Description of the program",
      "activityName": "Activity Name",
      "activityDescription": "What participants will do",
      "location": "Where it takes place",
      "ageRange": "15+",
      "dates": "When it runs",
      "day": "Days of the week",
      "times": "Time of day",
      "cost": "Cost information",
      "url": "Source URL",
      "lastUpdated": "2025-09-11T00:00:00.000Z"
    }
  ]
}
```

## Features

- Batch processing of all markdown files
- Rate limiting to avoid API limits (1 second delay between requests)
- Error handling for individual files
- Creates output directory automatically
- Uses GPT-4o-mini for cost efficiency
- Structured prompting for consistent output

## Notes

- The script will skip files that fail to process and continue with the rest
- JSON parsing errors are logged with the raw response for debugging
- Each run will overwrite existing JSON files with the same names

## Program Consolidation Script

The `consolidate-programs.js` script merges all individual program JSON files into a single consolidated file.

### Usage:

```bash
npm run consolidate                              # Create all-programs.json
npm run consolidate:pretty                       # Pretty formatted output
node scripts/consolidate-programs.js --help      # Show help
```

### Features:

- Handles both array format `[{...}]` and object format `{programs: [{...}]}`
- Removes duplicate programs based on ID
- Includes metadata (total programs, source files, generation date)
- Supports custom output filenames and pretty printing
- Comprehensive error handling and progress reporting
