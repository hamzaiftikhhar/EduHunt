require('dotenv').config();
const connectDB = require('../config/database');
const KhanAcademyScraper = require('./khanAcademyScraper');
const FreeCodeCampScraper = require('./freeCodeCampScraper');
const CourseraPublicScraper = require('./courseraPublicScraper');

async function runAllScrapers() {
    try {
        console.log('🚀 Starting all scrapers...\n');

        // Connect to database
        await connectDB();

        const scrapers = [
            new KhanAcademyScraper(),
            new FreeCodeCampScraper(),
            new CourseraPublicScraper()
        ];

        let totalCourses = 0;

        for (const scraper of scrapers) {
            try {
                const courses = await scraper.run();
                totalCourses += courses.length;
                console.log('\n---\n');
            } catch (error) {
                console.error(`❌ Scraper failed:`, error.message);
            }
        }

        console.log(`\n✅ All scrapers completed!`);
        console.log(`📊 Total courses scraped: ${totalCourses}`);

        process.exit(0);

    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    runAllScrapers();
}

module.exports = runAllScrapers;
