/**
 * Script to run the customer support ticket migration
 * 
 * Converts all customer support tickets to SCS-compliant CivicTicket format
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { customerSupport } from '../data/customer-support.js';
import { migrateAllCustomerSupportTickets } from '../migrations/migrate-customer-support.js';
import type { CivicTicket } from '../scs-model.js';

/**
 * Main migration function
 */
function main() {
  console.log('Starting customer support ticket migration...');
  console.log(`Found ${customerSupport.length} tickets to migrate\n`);
  
  // Run the migration
  console.log('Converting to SCS-compliant CivicTicket format...');
  const civicTickets: CivicTicket[] = migrateAllCustomerSupportTickets(customerSupport);
  
  console.log(`✅ Successfully migrated ${civicTickets.length} tickets\n`);
  
  // Display sample of the first ticket
  console.log('Sample of first migrated ticket:');
  console.log(JSON.stringify(civicTickets[0], null, 2));
  console.log('\n---\n');
  
  // Write the migrated data to a new file
  const outputPath = join(process.cwd(), 'scs-data/civic-tickets.json');
  console.log(`Writing migrated tickets to ${outputPath}...`);
  
  const output = {
    metadata: {
      name: 'Seattle 311 Service Request Tickets',
      description: 'Seattle Find It Fix It / 311 service requests converted to SCS CivicTicket format',
      source: 'Seattle Customer Service Bureau - Find It Fix It',
      total: civicTickets.length,
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0.0',
      scsCompliant: true,
      entityType: 'CivicTicket'
    },
    tickets: civicTickets
  };
  
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log('✅ Migration complete!');
  console.log(`\nSummary:`);
  console.log(`  - Total tickets migrated: ${civicTickets.length}`);
  console.log(`  - Output file: scs-data/civic-tickets.json`);
  console.log(`  - SCS compliant: Yes`);
  console.log(`  - Entity type: CivicTicket`);
  
  // Display statistics
  console.log('\nTicket Statistics:');
  
  const statusCounts: Record<string, number> = {};
  const departmentCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};
  
  civicTickets.forEach(ticket => {
    // Count by status
    statusCounts[ticket.ticketStatus] = (statusCounts[ticket.ticketStatus] || 0) + 1;
    
    // Count by department
    if (ticket.assignedDepartment) {
      departmentCounts[ticket.assignedDepartment] = (departmentCounts[ticket.assignedDepartment] || 0) + 1;
    }
    
    // Count by type
    typeCounts[ticket.requestType] = (typeCounts[ticket.requestType] || 0) + 1;
  });
  
  console.log('\n  By Status:');
  Object.entries(statusCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([status, count]) => {
      console.log(`    ${status}: ${count}`);
    });
  
  console.log('\n  By Department (top 5):');
  Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([dept, count]) => {
      console.log(`    ${dept}: ${count}`);
    });
  
  console.log('\n  By Request Type (top 10):');
  Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([type, count]) => {
      console.log(`    ${type}: ${count}`);
    });
}

main();

