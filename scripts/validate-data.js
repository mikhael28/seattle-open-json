#!/usr/bin/env node

/**
 * Data validation script for Seattle Youth Open Data
 * Validates JSON files against the expected schema
 */

const fs = require('fs');
const path = require('path');

// Required fields for all opportunities
const REQUIRED_FIELDS = [
  'id', 'type', 'title', 'description', 'organization', 
  'contact', 'location', 'ageRange', 'cost', 'tags', 
  'lastUpdated', 'source'
];

// Type-specific required fields
const TYPE_SPECIFIC_FIELDS = {
  'program': ['duration', 'schedule', 'applicationRequired'],
  'job': ['jobType', 'hoursPerWeek', 'requirements'],
  'event': ['dateRange', 'registrationRequired'],
  'museum-pass': ['validDates', 'includesTransport']
};

function validateOpportunity(opportunity, filePath) {
  const errors = [];
  
  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (!(field in opportunity)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Check type-specific fields
  if (opportunity.type && TYPE_SPECIFIC_FIELDS[opportunity.type]) {
    TYPE_SPECIFIC_FIELDS[opportunity.type].forEach(field => {
      if (!(field in opportunity)) {
        errors.push(`Missing required field for type '${opportunity.type}': ${field}`);
      }
    });
  }
  
  // Validate age range
  if (opportunity.ageRange) {
    if (typeof opportunity.ageRange.min !== 'number' || typeof opportunity.ageRange.max !== 'number') {
      errors.push('Age range min and max must be numbers');
    }
    if (opportunity.ageRange.min > opportunity.ageRange.max) {
      errors.push('Age range min cannot be greater than max');
    }
  }
  
  // Validate cost
  if (opportunity.cost && !['free', 'paid', 'sliding-scale'].includes(opportunity.cost)) {
    errors.push('Cost must be one of: free, paid, sliding-scale');
  }
  
  // Validate dates
  if (opportunity.lastUpdated) {
    try {
      new Date(opportunity.lastUpdated);
    } catch {
      errors.push('lastUpdated must be a valid ISO date string');
    }
  }
  
  return errors;
}

function validateDataFile(filePath) {
  console.log(`Validating ${filePath}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    if (!data.metadata || !data.opportunities) {
      console.error(`❌ ${filePath}: Missing metadata or opportunities`);
      return false;
    }
    
    if (!Array.isArray(data.opportunities)) {
      console.error(`❌ ${filePath}: opportunities must be an array`);
      return false;
    }
    
    let hasErrors = false;
    data.opportunities.forEach((opportunity, index) => {
      const errors = validateOpportunity(opportunity, filePath);
      if (errors.length > 0) {
        console.error(`❌ ${filePath} - Opportunity ${index + 1} (${opportunity.id || 'unknown'}):`);
        errors.forEach(error => console.error(`   - ${error}`));
        hasErrors = true;
      }
    });
    
    if (!hasErrors) {
      console.log(`✅ ${filePath}: Valid (${data.opportunities.length} opportunities)`);
    }
    
    return !hasErrors;
  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function findDataFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith('.json')) {
        files.push(fullPath);
      }
    });
  }
  
  scan(dir);
  return files;
}

// Main execution
const dataDir = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataDir)) {
  console.error('❌ Data directory not found');
  process.exit(1);
}

console.log('🔍 Seattle Youth Open Data Validation');
console.log('=====================================\n');

const dataFiles = findDataFiles(dataDir);
let allValid = true;

dataFiles.forEach(file => {
  const isValid = validateDataFile(file);
  if (!isValid) {
    allValid = false;
  }
});

console.log('\n=====================================');
if (allValid) {
  console.log('✅ All data files are valid!');
  process.exit(0);
} else {
  console.log('❌ Some data files have validation errors');
  process.exit(1);
}
