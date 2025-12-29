const fs = require('fs');
const path = require('path');
const readline = require('readline');
const excelManager = require('../utils/excelManager');

class LocalImporter {
    constructor() {
        this.filePath = path.join(__dirname, '../../data/coursera_2025.csv');
    }

    // Robust CSV line parser that handles quotes and commas inside quotes
    parseCSVLine(line) {
        const result = [];
        let startValueIndex = 0;
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                let value = line.substring(startValueIndex, i);
                // Remove surrounding quotes
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
                }
                // Unescape double quotes
                value = value.replace(/""/g, '"');
                result.push(value);
                startValueIndex = i + 1;
            }
        }

        // Push the last value
        let lastValue = line.substring(startValueIndex);
        if (lastValue.startsWith('"') && lastValue.endsWith('"')) {
            lastValue = lastValue.substring(1, lastValue.length - 1);
        }
        lastValue = lastValue.replace(/""/g, '"');
        result.push(lastValue);

        return result;
    }

    async run() {
        console.log('🚀 Starting Local CSV Importer (Coursera 2025)...');

        if (!fs.existsSync(this.filePath)) {
            console.error(`❌ File not found: ${this.filePath}`);
            return;
        }

        const fileStream = fs.createReadStream(this.filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let headers = [];
        let courses = [];
        let count = 0;
        let isHeader = true;

        console.log('   📄 Reading file stream...');

        for await (const line of rl) {
            // Basic CSV parsing logic for stream
            // Note: This simple line-by-line approach might fail if a single quoted field contains a newline.
            // For a 50k dataset, usually it's one record per line, but if descriptions have newlines, 
            // we need a more advanced buffer approach. 
            // Given the constraints, we'll try line-by-line and skip malformed ones.

            if (isHeader) {
                headers = line.split(','); // Simple split for headers
                isHeader = false;
                continue;
            }

            // Use a regex to match CSV pattern
            // This regex matches quoted strings OR non-comma strings
            const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

            // If regex fails or line is complex, we might skip. 
            // But let's try to map what we can.

            // Headers: url,name,category,what_you_learn,skills,language,instructors,content

            // We need a more robust way to split by comma respecting quotes
            // Let's use a custom splitter
            const columns = [];
            let inQuote = false;
            let current = '';

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuote = !inQuote;
                } else if (char === ',' && !inQuote) {
                    columns.push(current);
                    current = '';
                    continue;
                }
                current += char;
            }
            columns.push(current);

            if (columns.length >= 3) {
                // Clean up quotes
                const clean = (str) => str ? str.replace(/^"|"$/g, '').replace(/""/g, '"').trim() : '';

                const url = clean(columns[0]);
                const title = clean(columns[1]);
                const category = clean(columns[2]);
                const whatYouLearn = clean(columns[3]);
                const skills = clean(columns[4]);
                const language = clean(columns[5]);
                const instructor = clean(columns[6]);
                // Content might be truncated if it had newlines, but we take what we have

                if (title && url) {
                    courses.push({
                        title: title,
                        description: whatYouLearn || `Course on ${category}`,
                        provider: 'Coursera',
                        instructor: instructor || 'Coursera Instructor',
                        category: category || 'General',
                        subcategory: '',
                        level: 'All Levels',
                        price: 'Free', // Most Coursera are free to audit
                        originalPrice: 0,
                        rating: 4.8, // Default high rating for Coursera
                        enrollments: 0,
                        duration: 'Self-paced',
                        language: language || 'English',
                        thumbnail: '',
                        url: url,
                        skills: skills ? skills.replace(/[\[\]']/g, '').split(',') : [category],
                        certificate: true,
                        lastUpdated: new Date().toISOString(),
                        scrapedAt: new Date().toISOString()
                    });
                    count++;
                }
            }

            // Save in chunks of 1000 to manage memory
            if (courses.length >= 1000) {
                await excelManager.saveCourses(courses);
                console.log(`   💾 Saved chunk (${count} courses processed)`);
                courses = [];
            }
        }

        // Save remaining
        if (courses.length > 0) {
            await excelManager.saveCourses(courses);
            console.log(`   💾 Saved final chunk (${count} total courses)`);
        }

        console.log('✅ Local Import Completed!');
    }
}

module.exports = LocalImporter;

if (require.main === module) {
    require('dotenv').config();
    const importer = new LocalImporter();
    importer.run().then(() => process.exit(0));
}
