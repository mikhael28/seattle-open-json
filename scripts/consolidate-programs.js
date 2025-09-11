#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for help first
const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
    console.log(`
📦 Program Consolidation Script

Usage:
  node scripts/consolidate-programs.js [options]

Options:
  --output, -o <filename>    Output filename (default: all-programs.json)
  --pretty, -p               Pretty print JSON output
  --help, -h                 Show this help message

Examples:
  node scripts/consolidate-programs.js                    # Create all-programs.json
  node scripts/consolidate-programs.js --pretty           # Pretty formatted output
  node scripts/consolidate-programs.js -o combined.json   # Custom output filename

Description:
  Consolidates all JSON files from data/programs/ directory into a single file.
  Handles both array format and {programs: []} object format automatically.
  Removes duplicates based on program ID.
    `);
    process.exit(0);
}

async function consolidatePrograms() {
    const programsDir = path.join(__dirname, '..', 'data', 'programs');
    const outputFilename = args.find((arg, index) => 
        (args[index - 1] === '--output' || args[index - 1] === '-o') && !arg.startsWith('-')
    ) || 'all-programs.json';
    const prettyPrint = args.includes('--pretty') || args.includes('-p');
    
    try {
        console.log('🔍 Scanning programs directory...');
        
        // Read all JSON files from the programs directory
        const files = await fs.readdir(programsDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        console.log(`Found ${jsonFiles.length} JSON files to consolidate`);
        
        const allPrograms = [];
        const seenIds = new Set();
        let totalProcessed = 0;
        let duplicatesSkipped = 0;
        
        // Process each JSON file
        for (const file of jsonFiles) {
            const filePath = path.join(programsDir, file);
            console.log(`Processing: ${file}`);
            
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const data = JSON.parse(content);
                
                let programs = [];
                
                // Handle different JSON structures
                if (Array.isArray(data)) {
                    // Direct array format
                    programs = data;
                } else if (data.programs && Array.isArray(data.programs)) {
                    // Object with programs array
                    programs = data.programs;
                } else {
                    console.warn(`⚠️  Skipping ${file}: Unrecognized format`);
                    continue;
                }
                
                // Add programs, avoiding duplicates
                for (const program of programs) {
                    if (!program.id) {
                        console.warn(`⚠️  Program in ${file} missing ID, skipping`);
                        continue;
                    }
                    
                    if (seenIds.has(program.id)) {
                        console.warn(`⚠️  Duplicate ID found: ${program.id} (skipping)`);
                        duplicatesSkipped++;
                        continue;
                    }
                    
                    seenIds.add(program.id);
                    allPrograms.push(program);
                    totalProcessed++;
                }
                
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error.message);
            }
        }
        
        // Create consolidated JSON structure
        const consolidatedData = {
            metadata: {
                totalPrograms: allPrograms.length,
                sourceFiles: jsonFiles.length,
                generatedAt: new Date().toISOString(),
                duplicatesSkipped: duplicatesSkipped
            },
            programs: allPrograms
        };
        
        // Write consolidated file
        const outputPath = path.join(__dirname, '..', 'data', outputFilename);
        const jsonOutput = prettyPrint 
            ? JSON.stringify(consolidatedData, null, 2)
            : JSON.stringify(consolidatedData);
            
        await fs.writeFile(outputPath, jsonOutput);
        
        console.log('\n✅ Consolidation completed!');
        console.log(`📊 Summary:`);
        console.log(`   - Total programs: ${allPrograms.length}`);
        console.log(`   - Source files: ${jsonFiles.length}`);
        console.log(`   - Duplicates skipped: ${duplicatesSkipped}`);
        console.log(`   - Output file: ${outputPath}`);
        console.log(`   - File size: ${(jsonOutput.length / 1024).toFixed(2)} KB`);
        
        // Show sample programs
        if (allPrograms.length > 0) {
            console.log('\n📋 Sample programs:');
            allPrograms.slice(0, 3).forEach((program, index) => {
                console.log(`   ${index + 1}. ${program.activityName} (${program.organizationName})`);
            });
            if (allPrograms.length > 3) {
                console.log(`   ... and ${allPrograms.length - 3} more`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error during consolidation:', error);
        process.exit(1);
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    consolidatePrograms();
}
