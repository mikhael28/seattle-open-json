import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test with just a few organizations
const testOrganizationData = [
  {
    Description: "Free ORCA cards for Seattle Public Schools Students",
    Category: "Scholarships and Discounts",
    url: "https://www.seattle.gov/transportation/projects-and-programs/programs/transportation-access-programs/youth",
  },
  {
    Description: "Seattle Promise college scholarship",
    Category: "Scholarships and Discounts",
    url: "https://www.seattlecolleges.edu/promise/about",
  }
];

// Function to sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .substring(0, 100); // Limit length
}

// Function to scrape URL using Jina
async function scrapeWithJina(url) {
  const jinaUrl = `https://r.jina.ai/${url}`;
  
  try {
    console.log(`Scraping: ${url}`);
    
    const response = await fetch(jinaUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

// Function to save markdown file with metadata
async function saveMarkdownFile(orgData, markdown) {
  const filename = sanitizeFilename(orgData.Description) + '.md';
  const outputDir = './test-scraped-content';
  
  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  const filePath = path.join(outputDir, filename);
  
  // Create file content with JSON metadata at the top
  const fileContent = `---
JSON Metadata:
${JSON.stringify(orgData, null, 2)}
---

# ${orgData.Description}

**Category:** ${orgData.Category}
**URL:** ${orgData.url}

---

${markdown}
`;

  try {
    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`✅ Saved: ${filename}`);
  } catch (error) {
    console.error(`❌ Error saving ${filename}:`, error.message);
  }
}

// Test function
async function testScraper() {
  console.log(`Testing scraper with ${testOrganizationData.length} organizations...`);
  
  for (let i = 0; i < testOrganizationData.length; i++) {
    const org = testOrganizationData[i];
    console.log(`\n[${i + 1}/${testOrganizationData.length}] Processing: ${org.Description}`);
    
    const markdown = await scrapeWithJina(org.url);
    
    if (markdown) {
      await saveMarkdownFile(org, markdown);
    } else {
      console.log(`❌ Skipped: ${org.Description} (failed to scrape)`);
    }
    
    // Add a small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 Test completed!');
}

testScraper().catch(console.error);
