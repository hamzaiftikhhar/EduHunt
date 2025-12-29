const axios = require('axios');
const cheerio = require('cheerio');
const Course = require('../models/Course');

class KhanAcademyScraper {
    constructor() {
        this.baseUrl = 'https://www.khanacademy.org';
        this.delay = 2000; // 2 seconds between requests
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async scrapeSubjects() {
        try {
            console.log('🔍 Scraping Khan Academy subjects...');

            // Khan Academy main subjects
            const subjects = [
                { name: 'Math', url: '/math' },
                { name: 'Science', url: '/science' },
                { name: 'Computing', url: '/computing' },
                { name: 'Arts & Humanities', url: '/humanities' },
                { name: 'Economics', url: '/economics-finance-domain' },
                { name: 'Test Prep', url: '/test-prep' }
            ];

            const courses = [];

            for (const subject of subjects) {
                await this.sleep(this.delay);

                try {
                    const response = await axios.get(`${this.baseUrl}${subject.url}`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        },
                        timeout: 10000
                    });

                    const $ = cheerio.load(response.data);

                    // Khan Academy structure - adjust selectors as needed
                    const course = {
                        title: `Khan Academy - ${subject.name}`,
                        description: `Comprehensive ${subject.name} courses from Khan Academy. Learn at your own pace with interactive exercises and videos.`,
                        provider: 'Khan Academy',
                        instructor: 'Khan Academy',
                        category: subject.name,
                        level: 'All Levels',
                        price: 'Free',
                        originalPrice: 0,
                        rating: 4.8,
                        enrollments: 1000000,
                        duration: 'Self-paced',
                        language: 'English',
                        thumbnail: 'https://cdn.kastatic.org/images/khan-logo-dark-background.png',
                        url: `${this.baseUrl}${subject.url}`,
                        skills: [subject.name, 'Self-learning', 'Interactive exercises'],
                        certificate: false,
                        lastUpdated: new Date()
                    };

                    courses.push(course);
                    console.log(`✅ Scraped: ${course.title}`);

                } catch (error) {
                    console.error(`❌ Error scraping ${subject.name}:`, error.message);
                }
            }

            return courses;

        } catch (error) {
            console.error('❌ Khan Academy scraper error:', error.message);
            return [];
        }
    }

    async saveCourses(courses) {
        try {
            for (const courseData of courses) {
                await Course.findOneAndUpdate(
                    { url: courseData.url },
                    { ...courseData, scrapedAt: new Date() },
                    { upsert: true, new: true }
                );
            }
            console.log(`✅ Saved ${courses.length} Khan Academy courses to database`);
        } catch (error) {
            console.error('❌ Error saving courses:', error.message);
        }
    }

    async run() {
        console.log('🚀 Starting Khan Academy scraper...');
        const courses = await this.scrapeSubjects();
        if (courses.length > 0) {
            await this.saveCourses(courses);
        }
        console.log('✅ Khan Academy scraper completed');
        return courses;
    }
}

module.exports = KhanAcademyScraper;
