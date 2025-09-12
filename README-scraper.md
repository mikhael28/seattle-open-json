# Seattle Youth Data Scraper

This script scrapes the URLs from the organization data using Jina's web scraping API and saves the content as markdown files with JSON metadata.

## Requirements

- Node.js 18+ (for built-in fetch support)

## Usage

1. Run the scraper:

```bash
node scrape-organizations.js
```

Or using npm:

```bash
npm run scrape
```

## What it does

1. Reads all organization URLs from `src/organization-data.ts`
2. Uses Jina's API (`https://r.jina.ai/`) to scrape each URL and convert to markdown
3. Saves each scraped page as a markdown file in the `scraped-content/` directory
4. Each file includes:
   - JSON metadata at the top with the original organization data
   - Formatted header with description, category, and URL
   - The scraped markdown content from Jina

## Output

Files are saved in the `scraped-content/` directory with sanitized filenames based on the organization description.

Example output file structure:

```
scraped-content/
├── Free_ORCA_cards_for_Seattle_Public_Schools_Students.md
├── Free_passes_to_local_museums.md
├── Seattle_Promise_college_scholarship.md
└── ...
```

## Features

- Automatic filename sanitization (removes invalid characters, replaces spaces with underscores)
- Rate limiting (1 second delay between requests)
- Error handling for failed requests
- Progress tracking with console output
- JSON metadata preservation in each markdown file

## Notes

- The script includes a 1-second delay between requests to be respectful to the Jina API
- Failed requests are logged but don't stop the entire process
- Output directory is created automatically if it doesn't exist

