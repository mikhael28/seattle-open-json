#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for help first (before API key validation)
const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
    console.log(`
📄 Markdown to JSON Converter

Usage:
  node scripts/markdown-to-json.js [options] [filename]

Options:
  --single, -s     Interactive mode: select files one at a time
  --help, -h       Show this help message

Examples:
  node scripts/markdown-to-json.js                           # Batch mode (all files)
  node scripts/markdown-to-json.js --single                  # Interactive single file mode
  node scripts/markdown-to-json.js "Fire_Cadets_(15+).md"    # Process specific file

NPM Scripts:
  npm run convert              # Batch mode
  npm run convert:single       # Interactive mode
  npm run convert -- --help    # Show help

Requirements:
  - OPENAI_API_KEY environment variable must be set
  - Markdown files should be in scraped-content/ directory
  - JSON output will be saved to data/programs/ directory
    `);
    process.exit(0);
}

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
}

// Define the JSON schema based on the ProgramActivity interface
const JSON_SCHEMA = {
    type: "object",
    properties: {
        programs: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string", description: "Unique identifier for the program" },
                    organizationName: { type: "string", description: "Name of the organization offering the program" },
                    programDescription: { type: "string", description: "Description of the overall program" },
                    activityName: { type: "string", description: "Name of the specific activity" },
                    activityDescription: { type: "string", description: "Description of the specific activity" },
                    location: { type: "string", description: "Location where the program takes place" },
                    ageRange: { type: "string", description: "Age range for participants (e.g., '15+', '13-21')" },
                    dates: { type: "string", description: "Dates when the program runs" },
                    day: { type: "string", description: "Day(s) of the week" },
                    times: { type: "string", description: "Time(s) of day" },
                    cost: { type: "string", description: "Cost information" },
                    url: { type: "string", description: "URL for more information" },
                    lastUpdated: { type: "string", description: "Last updated date in ISO format" }
                },
                required: ["id", "organizationName", "programDescription", "activityName", "activityDescription", "location", "ageRange", "url", "lastUpdated"]
            }
        }
    },
    required: ["programs"]
};

const SYSTEM_PROMPT = `You are an expert at extracting structured data from youth program information. 

Your task is to analyze markdown content about Seattle youth programs and convert it into a structured JSON format that matches the provided schema.

For each program/activity mentioned in the content, extract:
- id: Create a unique identifier based on the program name and organization
- organizationName: The organization offering the program
- programDescription: Overall description of the program
- activityName: Name of the specific activity (can be same as program name)
- activityDescription: Detailed description of what participants will do
- location: Where the program takes place (extract from content or use "Seattle, WA" if not specified)
- ageRange: Age requirements (extract from title or content)
- dates: When the program runs (extract from content or use "Varies" if not specified)
- day: Days of the week (extract from content or use "Varies" if not specified)
- times: Time of day (extract from content or use "Varies" if not specified)
- cost: Cost information (extract from content or use "Contact organization" if not specified)
- url: The source URL from the metadata
- lastUpdated: Use today's date in ISO format

Guidelines:
1. If multiple programs or activities are mentioned, create separate entries for each
2. Extract information carefully from the markdown content
3. Use reasonable defaults when specific information isn't available
4. Make IDs descriptive and unique (e.g., "seattle-fire-cadets", "spl-online-tutoring")
5. Be thorough but concise in descriptions
6. If age range is in the title (e.g., "Fire Cadets (15+)"), make sure to extract it

Return only valid JSON matching the schema.`;

async function callOpenAI(content) {
    const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: `Please extract program information from this markdown content and convert it to JSON:\n\n${content}`
                }
            ],
            temperature: 0.1,
            max_tokens: 4000,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function processMarkdownFile(filePath, outputDir) {
    try {
        console.log(`Processing: ${path.basename(filePath)}`);
        
        // Read markdown file
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Call OpenAI to convert to JSON
        const jsonResponse = await callOpenAI(content);
        
        // Parse the JSON response
        let jsonData;
        try {
            // Clean up the response in case it has markdown code blocks
            const cleanedResponse = jsonResponse.replace(/```json\n?|\n?```/g, '').trim();
            jsonData = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error(`Error parsing JSON for ${filePath}:`, parseError);
            console.error('Raw response:', jsonResponse);
            return;
        }
        
        // Generate output filename
        const baseName = path.basename(filePath, '.md');
        const outputPath = path.join(outputDir, `${baseName}.json`);
        
        // Write JSON file
        await fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2));
        console.log(`✓ Created: ${path.basename(outputPath)}`);
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

async function listFiles(scrapedDir) {
    const files = await fs.readdir(scrapedDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log('\nAvailable markdown files:');
    markdownFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    
    return markdownFiles;
}

async function promptForFile(markdownFiles) {
    const readline = await import('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question('\nEnter the number of the file to process (or "q" to quit): ', (answer) => {
            rl.close();
            
            if (answer.toLowerCase() === 'q') {
                resolve(null);
            } else {
                const index = parseInt(answer) - 1;
                if (index >= 0 && index < markdownFiles.length) {
                    resolve(markdownFiles[index]);
                } else {
                    console.log('Invalid selection. Please try again.');
                    resolve('invalid');
                }
            }
        });
    });
}

async function main() {
    const scrapedDir = path.join(__dirname, '..', 'scraped-content');
    const outputDir = path.join(__dirname, '..', 'data', 'programs');
    
    // Check for command line arguments (help already handled at top)
    const singleMode = args.includes('--single') || args.includes('-s');
    const specificFile = args.find(arg => arg.endsWith('.md'));
    
    try {
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });
        
        // Get all markdown files
        const files = await fs.readdir(scrapedDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        
        if (specificFile) {
            // Process specific file
            if (!markdownFiles.includes(specificFile)) {
                console.error(`File "${specificFile}" not found in scraped-content directory`);
                process.exit(1);
            }
            
            console.log(`Processing specific file: ${specificFile}`);
            const filePath = path.join(scrapedDir, specificFile);
            await processMarkdownFile(filePath, outputDir);
            console.log('✅ File processing completed!');
            
        } else if (singleMode) {
            // Interactive single file mode
            console.log('🔄 Single file processing mode');
            
            while (true) {
                const files = await listFiles(scrapedDir);
                const selectedFile = await promptForFile(files);
                
                if (selectedFile === null) {
                    console.log('Exiting...');
                    break;
                } else if (selectedFile === 'invalid') {
                    continue;
                }
                
                console.log(`\nProcessing: ${selectedFile}`);
                const filePath = path.join(scrapedDir, selectedFile);
                await processMarkdownFile(filePath, outputDir);
                console.log('✅ File processing completed!\n');
            }
            
        } else {
            // Batch processing mode (default)
            console.log(`Found ${markdownFiles.length} markdown files to process`);
            console.log('Starting batch processing...\n');
            
            // Process each file
            for (const file of markdownFiles) {
                const filePath = path.join(scrapedDir, file);
                await processMarkdownFile(filePath, outputDir);
            }
            
            console.log('\n✅ Batch processing completed!');
        }
        
        console.log(`JSON files saved to: ${outputDir}`);
        
    } catch (error) {
        console.error('Error in main process:', error);
        process.exit(1);
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
