require('dotenv').config();
const YoutubeApiScraper = require('./youtubeApiScraper');
const MicrosoftLearnScraper = require('./microsoftLearnScraper');
const FreeCodeCampApiScraper = require('./freeCodeCampApiScraper');
const ClassCentralScraper = require('./classCentralScraper');
const RealProvidersScraper = require('./realProvidersScraper');
const excelManager = require('../utils/excelManager');

async function runAllScrapers() {
    try {
        console.log('╔═══════════════════════════════════════════════════════╗');
        console.log('║   🚀 Starting All Course Scrapers                    ║');
        console.log('║   📊 Data will be saved to Excel                     ║');
        console.log('╚═══════════════════════════════════════════════════════╝\n');

        const scrapers = [
            { name: 'YouTube', scraper: new YoutubeApiScraper() },
            { name: 'Microsoft Learn', scraper: new MicrosoftLearnScraper() },
            { name: 'freeCodeCamp', scraper: new FreeCodeCampApiScraper() },
            { name: 'Class Central', scraper: new ClassCentralScraper() },
            { name: 'Real Providers', scraper: new RealProvidersScraper() }
        ];

        let totalCourses = 0;
        const results = [];

        for (const { name, scraper } of scrapers) {
            try {
                console.log(`\n${'='.repeat(60)}`);
                console.log(`📚 Running ${name} Scraper`);
                console.log('='.repeat(60));

                // Check if scraper has a run method
                if (typeof scraper.run === 'function') {
                    const courses = await scraper.run();
                    totalCourses += courses.length;

                    results.push({
                        provider: name,
                        coursesFound: courses.length,
                        status: 'Success'
                    });

                    console.log(`✅ ${name}: ${courses.length} courses collected`);
                } else {
                    console.log(`⚠️  ${name} scraper does not have a run method.`);
                }

            } catch (error) {
                console.error(`❌ ${name} scraper failed:`, error.message);
                results.push({
                    provider: name,
                    coursesFound: 0,
                    status: 'Failed',
                    error: error.message
                });
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📊 SCRAPING SUMMARY');
        console.log('='.repeat(60));

        results.forEach(result => {
            const status = result.status === 'Success' ? '✅' : '❌';
            console.log(`${status} ${result.provider.padEnd(20)} ${result.coursesFound} courses`);
        });

        console.log('='.repeat(60));
        console.log(`\n🎉 Total courses collected: ${totalCourses}`);

        // Get stats from Excel
        const stats = await excelManager.getStats();
        console.log(`📈 Total courses in database: ${stats.totalCourses}`);
        console.log(`💰 Free courses: ${stats.freeCourses}`);
        console.log(`🏢 Providers: ${stats.providers.length}`);
        console.log(`📚 Categories: ${stats.categories.length}`);

        console.log(`\n✅ Excel file saved at: ${process.env.EXCEL_FILE_PATH || './data/courses.xlsx'}`);
        console.log('\n🎓 All scrapers completed successfully!\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Fatal error:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    runAllScrapers();
}

module.exports = runAllScrapers;
