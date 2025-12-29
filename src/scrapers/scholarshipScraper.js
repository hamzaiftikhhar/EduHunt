const fs = require('fs');
const path = require('path');
const axios = require('axios');

class ScholarshipScraper {
    constructor() {
        this.idsFile = path.join(__dirname, '../../scholarships_ids_processed.json');
        this.outputFile = path.join(__dirname, '../../data/scholarships_v2.csv');
        this.jsonOutputFile = path.join(__dirname, '../../data/scholarships_v2.json');
        this.apiUrl = 'https://www.wwah.ai/api/scholarship';
    }

    async loadIds() {
        try {
            const data = fs.readFileSync(this.idsFile, 'utf8');
            const json = JSON.parse(data);
            return json.scholarships.map(s => s.id);
        } catch (error) {
            console.error('❌ Error loading IDs:', error.message);
            return [];
        }
    }

    escapeCsv(value) {
        if (value === null || value === undefined) return '';
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        // Escape double quotes and wrap in quotes if contains comma, quote or newline
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
    }

    async run() {
        console.log('🚀 Starting Scholarship Scraper...');

        const ids = await this.loadIds();
        console.log(`found ${ids.length} IDs to process.`);

        const headers = [
            'hostCountry', 'name', 'applicationProcess', 'benefits', 'deadline',
            'duration', 'eligibilityCriteria', 'minimumRequirements', 'numberOfScholarships',
            'officialLink', 'overview', 'programs', 'provider', 'requiredDocuments',
            'successChances', 'table', 'type', 'info_link'
        ];

        // Create CSV with headers
        fs.writeFileSync(this.outputFile, headers.join(',') + '\n');

        const allScholarships = [];

        let count = 0;
        for (const id of ids) {
            try {
                const response = await axios.get(`${this.apiUrl}?id=${id}`);
                const rootData = response.data;

                // Fix: Access the nested ScholarshipData object
                const scholarshipData = rootData.ScholarshipData || rootData;

                if (count === 0) {
                    console.log('🔍 First API Response Keys:', Object.keys(rootData));
                    if (rootData.ScholarshipData) {
                        console.log('🔍 ScholarshipData Keys:', Object.keys(rootData.ScholarshipData));
                    }
                }

                // Prepare object for JSON
                const scholarshipObj = {};
                headers.forEach(header => {
                    if (header === 'info_link') {
                        scholarshipObj[header] = scholarshipData.info_link || scholarshipData.officialLink || '';
                    } else {
                        scholarshipObj[header] = scholarshipData[header];
                    }
                });

                // Add ID just in case
                scholarshipObj.id = id;
                allScholarships.push(scholarshipObj);

                // CSV writing (keep it for backup)
                const row = headers.map(header => {
                    if (header === 'info_link') {
                        return scholarshipData.info_link || scholarshipData.officialLink || '';
                    }
                    if (header === 'table' && typeof scholarshipData.table === 'object') {
                        return this.escapeCsv(JSON.stringify(scholarshipData.table));
                    }
                    return this.escapeCsv(scholarshipData[header]);
                });

                fs.appendFileSync(this.outputFile, row.join(',') + '\n');

                process.stdout.write(`\r✅ Processed ${++count}/${ids.length} scholarships`);

                // Small delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                console.error(`\n❌ Error fetching ID ${id}:`, error.message);
            }
        }

        // Save JSON file
        fs.writeFileSync(this.jsonOutputFile, JSON.stringify(allScholarships, null, 2));
        console.log(`\n🎉 Scholarship scraping completed!`);
        console.log(`   📄 CSV saved to ${this.outputFile}`);
        console.log(`   📄 JSON saved to ${this.jsonOutputFile}`);
    }
}

// Run directly
if (require.main === module) {
    const scraper = new ScholarshipScraper();
    scraper.run();
}

module.exports = ScholarshipScraper;
