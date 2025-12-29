const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

class ScholarshipMerger {
    constructor() {
        this.internationalFile = path.join(__dirname, '../../data/scholarships_v2.json');
        this.nationalFile = path.join(__dirname, '../../data/National_scholarships_data.xlsx');
        this.outputFile = path.join(__dirname, '../../data/scholarships_final.json');
    }

    async run() {
        console.log('🚀 Starting Scholarship Merge (Union Schema)...');

        // 1. Load International Data
        let internationalData = [];
        try {
            const raw = fs.readFileSync(this.internationalFile, 'utf8');
            internationalData = JSON.parse(raw);
            console.log(`   ✅ Loaded ${internationalData.length} International Scholarships`);
        } catch (e) {
            console.error('   ❌ Failed to load International data:', e.message);
            return;
        }

        // 2. Load National Data
        let nationalData = [];
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(this.nationalFile);
            const worksheet = workbook.getWorksheet(1);

            // Get headers from first row
            const headers = worksheet.getRow(1).values; // 1-based array, index 0 is null usually

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // Skip header

                const record = {};
                // Map row values to headers
                // headers array might look like [null, 'title', 'org', ...]
                for (let i = 1; i < headers.length; i++) {
                    const header = headers[i];
                    if (header) {
                        let val = row.getCell(i).value;
                        // Handle rich text or hyperlinks if exceljs returns objects
                        if (val && typeof val === 'object') {
                            if (val.text) val = val.text;
                            else if (val.result) val = val.result;
                        }
                        record[header] = val;
                    }
                }
                nationalData.push(record);
            });
            console.log(`   ✅ Loaded ${nationalData.length} National Scholarships`);

        } catch (e) {
            console.error('   ❌ Failed to load National data:', e.message);
            return;
        }

        // 3. Transform & Merge
        const merged = [];

        // Process International (Standardize + Scope)
        internationalData.forEach(item => {
            merged.push({
                ...item,
                scope: 'International',
                // Ensure common fields exist even if null
                contact: null,
                major: null,
                field: null
            });
        });

        // Process National (Map to Standard + Keep Unique + Scope)
        nationalData.forEach(item => {
            merged.push({
                // --- Mapped Standard Fields ---
                name: item.title || 'Untitled Scholarship',
                provider: item.organization || 'Unknown Provider',
                officialLink: item.url || '',
                overview: item.description || '',
                deadline: item.application_deadline ? String(item.application_deadline) : 'Open',
                eligibilityCriteria: item.eligibility || '',
                benefits: item.amount || '', // Mapping amount to benefits
                hostCountry: item.country || 'Pakistan', // Assuming National = Pakistan mostly, or use item.country
                programs: item.programs || '',
                type: item.level || 'Scholarship',

                // --- Unique National Fields (Preserved) ---
                contact: item.contact || '',
                major: item.major || '',
                field: item.field || '',
                target_audience: item.target_audience || '',
                allowed_fields: item.allowed_fields || '',
                source_file: item.source_file || '',

                // --- Standard Fields (Set to null/default for National) ---
                applicationProcess: 'Please check the official link or contact details.',
                duration: null,
                minimumRequirements: null,
                numberOfScholarships: null,
                requiredDocuments: null,
                successChances: null,
                table: null,
                info_link: item.url || '', // Use URL as info_link too

                // --- Metadata ---
                scope: 'National',
                id: `nat_${Math.random().toString(36).substr(2, 9)}` // Generate a temp ID
            });
        });

        // 4. Save Merged Data
        fs.writeFileSync(this.outputFile, JSON.stringify(merged, null, 2));
        console.log(`\n🎉 Merge Completed!`);
        console.log(`   📊 Total Records: ${merged.length}`);
        console.log(`   💾 Saved to: ${this.outputFile}`);
    }
}

// Run
if (require.main === module) {
    const merger = new ScholarshipMerger();
    merger.run();
}
