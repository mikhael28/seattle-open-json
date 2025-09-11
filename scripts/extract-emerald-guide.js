const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Extracts organization data from the emerald-guide.html file
 * and converts it to a structured JSON format
 */
function extractOrganizationData() {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../src/emerald-guide.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Parse HTML with JSDOM
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    // Find all organization items
    const organizationItems = document.querySelectorAll('li.organization-item');
    
    console.log(`Found ${organizationItems.length} organization items`);
    
    const organizations = [];
    
    organizationItems.forEach((item, index) => {
        try {
            const organization = extractSingleOrganization(item);
            if (organization.name) {
                organizations.push(organization);
            }
        } catch (error) {
            console.error(`Error processing organization ${index + 1}:`, error.message);
        }
    });
    
    return organizations;
}

/**
 * Extracts data from a single organization item
 */
function extractSingleOrganization(item) {
    const organization = {};
    
    // Extract name from h3 tag
    const nameElement = item.querySelector('h3');
    organization.name = nameElement ? nameElement.textContent.trim() : '';
    
    // Extract labeled fields (Website, Phone, Address, Hours, etc.)
    const labels = item.querySelectorAll('div.label');
    
    labels.forEach(label => {
        const labelText = label.textContent.replace('|', '').trim().toLowerCase();
        let contentElement = label.nextElementSibling;
        
        // Skip whitespace nodes
        while (contentElement && contentElement.nodeType === 3 && !contentElement.textContent.trim()) {
            contentElement = contentElement.nextSibling;
        }
        
        // Handle different content structures
        let content = '';
        if (contentElement) {
            if (contentElement.classList && contentElement.classList.contains('content')) {
                // Standard content div
                content = contentElement.textContent.trim();
            } else if (contentElement.tagName === 'A') {
                // Link element (for websites)
                if (labelText === 'website') {
                    // Get the href attribute, clean it up
                    content = contentElement.getAttribute('href');
                    if (!content || content === '#') {
                        content = contentElement.textContent.trim();
                    }
                } else {
                    content = contentElement.textContent.trim();
                }
            }
        }
        
        // Clean up field names and add to organization
        const fieldName = labelText.replace(/\s+/g, '_');
        if (content) {
            organization[fieldName] = content;
        }
    });
    
    // Extract description from hidden desc paragraph
    const descElement = item.querySelector('p.desc.hidden');
    if (descElement) {
        organization.description = descElement.textContent.trim();
    }
    
    // Extract categories from hidden cat paragraph
    const catElement = item.querySelector('p.cat.hidden');
    if (catElement) {
        const categories = catElement.textContent.trim().split(',').map(cat => cat.trim());
        organization.categories = categories;
    }
    
    // Add any additional text that might be in other elements
    const additionalText = [];
    
    // Look for any other text content that might not be captured
    const allTextNodes = getTextNodes(item);
    allTextNodes.forEach(node => {
        const text = node.textContent.trim();
        if (text && 
            !isAlreadyCaptured(text, organization) && 
            !isIgnorableText(text) &&
            !isCategoryText(text, organization)) {
            additionalText.push(text);
        }
    });
    
    // Remove duplicates
    const uniqueAdditionalText = [...new Set(additionalText)];
    
    if (uniqueAdditionalText.length > 0) {
        organization.additional_text = uniqueAdditionalText;
    }
    
    return organization;
}

/**
 * Gets all text nodes from an element (excluding already processed ones)
 */
function getTextNodes(element) {
    const textNodes = [];
    const walker = element.ownerDocument.createTreeWalker(
        element,
        element.ownerDocument.defaultView.NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
            textNodes.push(node);
        }
    }
    
    return textNodes;
}

/**
 * Checks if text is already captured in the organization object
 */
function isAlreadyCaptured(text, organization) {
    const values = Object.values(organization).flat();
    return values.some(value => 
        typeof value === 'string' && value.includes(text)
    );
}

/**
 * Checks if text is category text that's already been captured
 */
function isCategoryText(text, organization) {
    if (!organization.categories) return false;
    
    // Check if the text is the same as the categories joined by commas
    const categoriesString = organization.categories.join(',');
    return text === categoriesString || text === organization.categories.join(', ');
}

/**
 * Checks if text should be ignored (like labels, icons, etc.)
 */
function isIgnorableText(text) {
    const ignorablePatterns = [
        /^\s*\|\s*$/,
        /^Show description$/,
        /^Website\s*\|?$/i,
        /^Phone\s*\|?$/i,
        /^Address\s*\|?$/i,
        /^Hours\s*\|?$/i,
        /^Description\s*\|?$/i,
        /^Email\s*\|?$/i,
        /^Languages\s*\|?$/i,
        /^Services\s*\|?$/i,
        /^Contact\s*\|?$/i,
        /^Location\s*\|?$/i,
        /^\s*$/, // empty or whitespace only
        /^https?:\/\/\S+$/, // URLs (already captured separately)
        /^\(\d{3}\)\s*\d{3}-\d{4}$/, // Phone numbers (already captured)
        /^[a-zA-Z\s]+\|$/ // Any label ending with |
    ];
    
    return ignorablePatterns.some(pattern => pattern.test(text));
}

/**
 * Main execution function
 */
function main() {
    try {
        console.log('Starting extraction from emerald-guide.html...');
        
        const organizations = extractOrganizationData();
        
        console.log(`Successfully extracted ${organizations.length} organizations`);
        
        // Create the output object
        const output = {
            metadata: {
                source: 'emerald-guide.html',
                extracted_at: new Date().toISOString(),
                total_organizations: organizations.length
            },
            resources: organizations
        };
        
        // Write to JSON file
        const outputPath = path.join(__dirname, '../data/emerald-guide-resources.json');
        
        // Ensure directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
        
        console.log(`Data successfully written to: ${outputPath}`);
        console.log('\nSample organization:');
        console.log(JSON.stringify(organizations[0], null, 2));
        
    } catch (error) {
        console.error('Error during extraction:', error);
        process.exit(1);
    }
}

// Run the script if called directly
if (require.main === module) {
    main();
}

module.exports = { extractOrganizationData, extractSingleOrganization };
