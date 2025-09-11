import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import organization data - we'll read and parse the TS file
const organizationData = [
  {
    Description: "Free ORCA cards for Seattle Public Schools Students",
    Category: "Scholarships and Discounts",
    url: "https://www.seattle.gov/transportation/projects-and-programs/programs/transportation-access-programs/youth",
  },
  {
    Description: "Free passes to local museums",
    Category: "Scholarships and Discounts",
    url: "https://www.spl.org/programs-and-services/arts-and-culture/museum-pass",
  },
  {
    Description: "Seattle Promise college scholarship",
    Category: "Scholarships and Discounts",
    url: "https://www.seattlecolleges.edu/promise/about",
  },
  {
    Description: "Reach Out Seattle",
    Category: "Mental Health and Wellness",
    url: "https://www.seattle.gov/mayor/one-seattle-initiatives/youth-mental-health",
  },
  {
    Description: "Talkspace (13-24)",
    Category: "Mental Health and Wellness",
    url: "https://www.talkspace.com/seattle",
  },
  {
    Description: "Local Teen Counseling Resources (12-21)",
    Category: "Mental Health and Wellness",
    url: "https://search.wa211.org/search/1cdc337e-1faa-5cb3-bd87-4567127c9215",
  },
  {
    Description: "Seattle Mentors (13-21)",
    Category: "Mental Health and Wellness",
    url: "https://www.seattle.gov/parks/learning-and-childcare/teen-programs/seattle-mentors",
  },
  {
    Description: "Shine Light on Depression",
    Category: "Mental Health and Wellness",
    url: "https://erikaslighthouse.org/",
  },
  {
    Description: "City Internships for College Students",
    Category: "Career Exploration and Jobs",
    url: "https://www.governmentjobs.com/careers/seattle/transferjobs",
  },
  {
    Description: "Fire Cadets (15+)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/fire/jobs-and-opportunities/cadet-program",
  },
  {
    Description: "Police Explorers (14-21)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/police/community-policing/community-programs/police-explorers",
  },
  {
    Description: "Seattle Youth Employment Program (16-24)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/human-services/services-and-programs/youth-and-young-adults/seattle-youth-employment-program",
  },
  {
    Description: "Summer Employment Opportunities (16+)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/parks/about-us/jobs/summer-employment-opportunities",
  },
  {
    Description: "Library Student Assistant (16+)",
    Category: "Career Exploration and Jobs",
    url: "https://www.spl.org/about-us/library-careers/student-assistant-program",
  },
  {
    Description: "Lifeguard Jobs and Training (15+)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/parks/about-us/jobs/aquatics-employment-and-training",
  },
  {
    Description: "Teen Jobs with Seattle Parks (14-24)",
    Category: "Career Exploration and Jobs",
    url: "https://www.seattle.gov/parks/learning-and-childcare/teen-programs/job-readiness-opportunities-for-teens",
  },
  {
    Description: "Get Engaged with any Board or Commission (18-29)",
    Category: "Civic Engagement",
    url: "https://www.seattleymca.org/social-impact-center/youth-young-adults/employment-education",
  },
  {
    Description: "Youth Civi Engagement Program",
    Category: "Civic Engagement",
    url: "https://www.seattle.gov/civilrights/public-participation/ycep",
  },
  {
    Description: "Youth Transportation Ambassadors",
    Category: "Civic Engagement",
    url: "https://www.seattle.gov/transportation/projects-and-programs/programs/transportation-access-programs/youth-ambassadors",
  },
  {
    Description: "Learning Buddies (18-24)",
    Category: "Community Service",
    url: "https://www.spl.org/programs-and-services/learning/student-success/learning-buddies",
  },
  {
    Description: "Parks and Recreation Volunteering",
    Category: "Community Service",
    url: "https://www.seattle.gov/parks/volunteer",
  },
  {
    Description: "Seattle Mentors (13-21)",
    Category: "Community Service",
    url: "https://www.seattle.gov/parks/learning-and-childcare/teen-programs/seattle-mentors",
  },
  {
    Description: "Teen Service Learning at the Library",
    Category: "Community Service",
    url: "https://www.spl.org/programs-and-services/learning/student-success",
  },
  {
    Description: "Immigrant Family Institute (14+)",
    Category: "Social Activities",
    url: "https://www.seattle.gov/iandraffairs/RWI",
  },
  {
    Description: "Teen Programs and Community Centers (13-19)",
    Category: "Social Activities",
    url: "https://www.seattle.gov/parks/learning-and-childcare/teen-programs",
  },
  {
    Description: "Sports",
    Category: "Social Activities",
    url: "https://anc.apm.activecommunities.com/seattle/activity/search?onlineSiteId=0&activity_select_param=2&activity_category_ids=28&viewMode=list",
  },
  {
    Description: "Art Videos",
    Category: "Related",
    url: "https://www.youtube.com/channel/UC5GcOBbzMZ6CGGOcp-qEjzg",
  },
  {
    Description: "King County Youth Programs",
    Category: "Related",
    url: "https://kingcounty.gov/depts/community-human-services/children-youth-young-adults.aspx",
  },
  {
    Description: "Online Tutoring (5-18)",
    Category: "Related",
    url: "https://www.spl.org/programs-and-services/learning/student-success/virtual-tutoring",
  },
  {
    Description: "Youth Support Resources in King County",
    Category: "Related",
    url: "https://youthresources.kingcounty.gov/",
  },
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
  const outputDir = './scraped-content';
  
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

// Main function to process all organizations
async function scrapeAllOrganizations() {
  console.log(`Starting to scrape ${organizationData.length} organizations...`);
  
  for (let i = 0; i < organizationData.length; i++) {
    const org = organizationData[i];
    console.log(`\n[${i + 1}/${organizationData.length}] Processing: ${org.Description}`);
    
    const markdown = await scrapeWithJina(org.url);
    
    if (markdown) {
      await saveMarkdownFile(org, markdown);
    } else {
      console.log(`❌ Skipped: ${org.Description} (failed to scrape)`);
    }
    
    // Add a small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 Scraping completed!');
}

// Handle command line execution
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeAllOrganizations().catch(console.error);
}

export {
  scrapeWithJina,
  saveMarkdownFile,
  scrapeAllOrganizations
};
