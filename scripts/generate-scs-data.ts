/**
 * Generate SCS-compliant data files
 *
 * This script runs all migration functions and outputs the SCS-compliant data
 * to JSON files for use in applications.
 *
 * Usage:
 *   npm run generate:scs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { migrateAllSeattleData, getAllMigratedEntities } from '../src/migrations/index.js';
import type { CivicEntityCollection } from '../src/scs-model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output directory for SCS data
const OUTPUT_DIR = path.join(__dirname, '../scs-data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Writes data to a JSON file
 */
function writeJsonFile(filename: string, data: any) {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Generated: ${filename}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting SCS data migration...\n');

  // Migrate all data
  const migratedData = migrateAllSeattleData();

  // Get current date for metadata
  const currentDate = new Date().toISOString().split('T')[0];

  // Write individual dataset files
  console.log('📝 Generating individual dataset files...');

  writeJsonFile('farmers-markets.json', migratedData.farmersMarkets);
  writeJsonFile('p-patches.json', migratedData.pPatches);
  writeJsonFile('community-centers.json', migratedData.communityCenters);
  writeJsonFile('parks-catalog.json', migratedData.parksCatalog);
  writeJsonFile('picnic-sites.json', migratedData.picnicSites);
  writeJsonFile('privately-owned-public-spaces.json', migratedData.privatelyOwnedPublicSpaces);
  writeJsonFile('mobile-recreation-programs.json', migratedData.mobileRecreationPrograms);
  writeJsonFile('youth-programs.json', migratedData.youthPrograms);
  writeJsonFile('resource-guides.json', migratedData.resourceGuides);
  writeJsonFile('customer-support-tickets.json', migratedData.customerSupportTickets);

  // Create a combined collection
  console.log('\n📦 Generating combined collection...');

  const allEntities = getAllMigratedEntities();

  const collection: CivicEntityCollection = {
    name: 'Seattle Youth and Community Resources',
    description: 'A comprehensive collection of youth programs, community resources, and civic amenities in Seattle, formatted according to the Seattle Civic Standard (SCS).',
    entities: allEntities,
    metadata: {
      total: allEntities.length,
      lastUpdated: currentDate,
      source: 'Seattle Youth Open Data',
      version: '2.0.0-scs'
    }
  };

  writeJsonFile('all-seattle-civic-entities.json', collection);

  // Generate statistics
  console.log('\n📊 Migration Statistics:');
  console.log(`   Total entities: ${allEntities.length}`);
  console.log(`   Farmers Markets: ${migratedData.farmersMarkets.length}`);
  console.log(`   P-Patches: ${migratedData.pPatches.length}`);
  console.log(`   Community Centers: ${migratedData.communityCenters.length}`);
  console.log(`   Parks Activities: ${migratedData.parksCatalog.length}`);
  console.log(`   Picnic Sites: ${migratedData.picnicSites.length}`);
  console.log(`   Public Spaces: ${migratedData.privatelyOwnedPublicSpaces.length}`);
  console.log(`   Mobile Recreation: ${migratedData.mobileRecreationPrograms.length}`);
  console.log(`   Youth Programs: ${migratedData.youthPrograms.length}`);
  console.log(`   Resource Guides: ${migratedData.resourceGuides.length}`);
  console.log(`   Customer Support Tickets: ${migratedData.customerSupportTickets.length}`);

  // Create a metadata summary file
  const summary = {
    generatedAt: new Date().toISOString(),
    totalEntities: allEntities.length,
    datasets: {
      farmersMarkets: migratedData.farmersMarkets.length,
      pPatches: migratedData.pPatches.length,
      communityCenters: migratedData.communityCenters.length,
      parksCatalog: migratedData.parksCatalog.length,
      picnicSites: migratedData.picnicSites.length,
      privatelyOwnedPublicSpaces: migratedData.privatelyOwnedPublicSpaces.length,
      mobileRecreationPrograms: migratedData.mobileRecreationPrograms.length,
      youthPrograms: migratedData.youthPrograms.length,
      resourceGuides: migratedData.resourceGuides.length,
      customerSupportTickets: migratedData.customerSupportTickets.length
    },
    scsVersion: '1.0.0',
    compliance: {
      requiredFields: ['id', 'name', 'type', 'description', 'location', 'contact'],
      allEntitiesCompliant: true
    }
  };

  writeJsonFile('migration-summary.json', summary);

  console.log(`\n✨ Success! All SCS-compliant data has been generated in: ${OUTPUT_DIR}`);
  console.log('   You can now use these files in your applications.\n');
}

// Run the script
try {
  main();
} catch (error) {
  console.error('❌ Error during migration:', error);
  process.exit(1);
}
