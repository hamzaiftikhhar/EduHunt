const axios = require('axios');
const excelManager = require('../utils/excelManager');

class DatasetImporter {
    constructor() {
        this.sources = [
            {
                name: 'Udemy',
                url: 'https://raw.githubusercontent.com/AhmAnwar/udemy-courses-dataset/master/udemy_courses.csv',
                type: 'udemy'
            },
            {
                name: 'Coursera',
                url: 'https://raw.githubusercontent.com/MainakRepositor/Datasets/master/Coursera.csv',
                type: 'coursera'
            }
        ];
    }

    async parseUdemyCsv(csvText) {
        const lines = csvText.split('\n');
        const courses = [];
        console.log(`   📄 Parsing Udemy CSV...`);

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Simple regex for CSV splitting
            const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            const columns = line.split(','); // Fallback

            // Udemy structure: course_id,course_title,url,is_paid,price,num_subscribers...
            if (columns.length >= 10) {
                const title = columns[1];
                const url = columns[2];
                const price = columns[4];
                const subscribers = columns[5];
                const level = columns[8];
                const subject = columns[11];

                if (title && url && url.includes('http')) {
                    courses.push({
                        title: title.replace(/"/g, ''),
                        description: `Learn ${title.replace(/"/g, '')} on Udemy.`,
                        provider: 'Udemy',
                        instructor: 'Udemy Instructor',
                        category: subject ? subject.replace(/"/g, '') : 'General',
                        subcategory: '',
                        level: level || 'All Levels',
                        price: price === '0' || price === 'Free' ? 'Free' : 'Paid',
                        originalPrice: 0,
                        rating: 4.5,
                        enrollments: parseInt(subscribers) || 0,
                        duration: 'Self-paced',
                        language: 'English',
                        thumbnail: '',
                        url: url,
                        skills: [subject ? subject.replace(/"/g, '') : 'General'],
                        certificate: true,
                        lastUpdated: new Date().toISOString(),
                        scrapedAt: new Date().toISOString()
                    });
                }
            }
        }
        return courses;
    }

    async parseCourseraCsv(csvText) {
        const lines = csvText.split('\n');
        const courses = [];
        console.log(`   📄 Parsing Coursera CSV...`);

        // Coursera CSV usually has: Course Name, University, Difficulty Level, Course Rating, Course URL, Course Description, Skills
        // We'll try to detect columns dynamically or assume a standard format

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Coursera dataset often has: Course Name, University, Difficulty Level, Course Rating, Course URL, Course Description, Skills
            // Let's try to split by comma, respecting quotes
            const columns = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            if (columns && columns.length >= 5) {
                // This is a guess based on common Coursera datasets on GitHub
                // Often: Name, University, Difficulty, Rating, URL, Description
                const name = columns[0] ? columns[0].replace(/"/g, '') : '';
                const university = columns[1] ? columns[1].replace(/"/g, '') : '';
                const difficulty = columns[2] ? columns[2].replace(/"/g, '') : 'Beginner';
                const rating = columns[3] ? parseFloat(columns[3]) : 4.5;
                const url = columns[4] ? columns[4].replace(/"/g, '') : '';

                if (name && url && url.includes('http')) {
                    courses.push({
                        title: name,
                        description: `Offered by ${university}.`,
                        provider: 'Coursera',
                        instructor: university,
                        category: 'University',
                        subcategory: '',
                        level: difficulty,
                        price: 'Free', // Coursera audit is often free
                        originalPrice: 0,
                        rating: rating || 4.5,
                        enrollments: 0,
                        duration: 'Self-paced',
                        language: 'English',
                        thumbnail: '',
                        url: url,
                        skills: ['Academic'],
                        certificate: true,
                        lastUpdated: new Date().toISOString(),
                        scrapedAt: new Date().toISOString()
                    });
                }
            }
        }
        return courses;
    }

    async run() {
        console.log('🚀 Starting Dataset Importer (Udemy + Coursera)...');

        for (const source of this.sources) {
            try {
                console.log(`\n   ⬇️  Downloading ${source.name} dataset...`);
                const response = await axios.get(source.url);

                if (response.status === 200) {
                    let courses = [];
                    if (source.type === 'udemy') {
                        courses = await this.parseUdemyCsv(response.data);
                    } else if (source.type === 'coursera') {
                        courses = await this.parseCourseraCsv(response.data);
                    }

                    console.log(`   ✅ Parsed ${courses.length} courses from ${source.name}.`);

                    if (courses.length > 0) {
                        const chunkSize = 500;
                        for (let i = 0; i < courses.length; i += chunkSize) {
                            const chunk = courses.slice(i, i + chunkSize);
                            await excelManager.saveCourses(chunk);
                            console.log(`      💾 Saved chunk ${Math.floor(i / chunkSize) + 1}`);
                        }
                    }
                }
            } catch (error) {
                console.error(`   ❌ Failed to import ${source.name}:`, error.message);
            }
        }

        console.log('\n✅ Dataset Import Completed!');
    }
}

module.exports = DatasetImporter;

if (require.main === module) {
    require('dotenv').config();
    const importer = new DatasetImporter();
    importer.run().then(() => process.exit(0));
}
