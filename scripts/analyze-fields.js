const fs = require('fs');
const path = require('path');

/**
 * Analyzes the fields present in the extracted organization data
 */
function analyzeFields() {
    const jsonPath = path.join(__dirname, '../data/emerald-guide-resources.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    const fieldStats = {};
    const fieldExamples = {};
    
    data.resources.forEach(resource => {
        Object.keys(resource).forEach(field => {
            if (!fieldStats[field]) {
                fieldStats[field] = 0;
                fieldExamples[field] = [];
            }
            fieldStats[field]++;
            
            // Store some examples (up to 3)
            if (fieldExamples[field].length < 3) {
                const value = resource[field];
                if (Array.isArray(value)) {
                    fieldExamples[field].push(value.join(', '));
                } else {
                    fieldExamples[field].push(String(value).substring(0, 100) + (String(value).length > 100 ? '...' : ''));
                }
            }
        });
    });
    
    console.log('Field Analysis for Emerald Guide Resources');
    console.log('==========================================');
    console.log(`Total organizations: ${data.resources.length}`);
    console.log();
    
    // Sort fields by frequency
    const sortedFields = Object.keys(fieldStats).sort((a, b) => fieldStats[b] - fieldStats[a]);
    
    sortedFields.forEach(field => {
        const count = fieldStats[field];
        const percentage = ((count / data.resources.length) * 100).toFixed(1);
        
        console.log(`${field}:`);
        console.log(`  Count: ${count}/${data.resources.length} (${percentage}%)`);
        console.log(`  Examples: `);
        fieldExamples[field].forEach(example => {
            console.log(`    - "${example}"`);
        });
        console.log();
    });
}

if (require.main === module) {
    analyzeFields();
}

module.exports = { analyzeFields };
