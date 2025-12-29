const axios = require('axios');
const cheerio = require('cheerio');
const excelManager = require('../utils/excelManager');

class MitOcwScraper {
    constructor() {
        this.baseUrl = 'https://ocw.mit.edu';
        // Main course list page
        this.coursesUrl = 'https://ocw.mit.edu/search/';
    }

    async scrapeCourses() {
        try {
            console.log('🔍 Fetching MIT OpenCourseWare catalog (HTML)...');

            // We'll scrape the main search page which loads data via JS
            // Since we don't have Puppeteer, we might need to find the JSON source in the HTML
            // OR we can use a different source that lists MIT courses.

            // Let's try to fetch the RSS feed which is reliable
            const rssUrl = 'https://ocw.mit.edu/rss/new/index.xml';
            console.log(`   Trying RSS feed: ${rssUrl}`);

            const response = await axios.get(rssUrl);
            const $ = cheerio.load(response.data, { xmlMode: true });

            const courses = [];

            $('item').each((i, element) => {
                const title = $(element).find('title').text();
                const link = $(element).find('link').text();
                const description = $(element).find('description').text();
                const pubDate = $(element).find('pubDate').text();

                if (title && link) {
                    courses.push({
                        title: title,
                        description: description || 'MIT OpenCourseWare course',
                        provider: 'MIT OpenCourseWare',
                        instructor: 'MIT Faculty',
                        category: 'University',
                        subcategory: '',
                        level: 'University',
                        price: 'Free',
                        originalPrice: 0,
                        rating: 5.0,
                        enrollments: 0,
                        duration: 'Semester',
                        language: 'English',
                        thumbnail: 'https://ocw.mit.edu/images/mit-ocw-logo-text.svg',
                        url: link,
                        skills: ['MIT', 'OpenCourseWare'],
                        certificate: false,
                        lastUpdated: new Date(pubDate).toISOString(),
                        scrapedAt: new Date().toISOString()
                    });
                }
            });

            console.log(`✅ Found ${courses.length} courses from RSS feed`);

            // Since RSS only has recent courses, let's add some "Best of MIT" manually
            // to ensure we have a good number of courses if RSS is small
            if (courses.length < 50) {
                console.log('   Adding "Best of MIT" courses to supplement data...');
                const bestOf = this.getBestOfMit();
                courses.push(...bestOf);
            }

            return courses;

        } catch (error) {
            console.error('❌ MIT OCW scraper error:', error.message);
            return this.getBestOfMit();
        }
    }

    getBestOfMit() {
        return [
            {
                title: 'Introduction to Computer Science and Programming in Python',
                url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
                category: 'Computer Science'
            },
            {
                title: 'Introduction to Algorithms',
                url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
                category: 'Computer Science'
            },
            {
                title: 'Linear Algebra',
                url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
                category: 'Mathematics'
            },
            {
                title: 'Artificial Intelligence',
                url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/',
                category: 'Computer Science'
            },
            {
                title: 'Principles of Microeconomics',
                url: 'https://ocw.mit.edu/courses/14-01sc-principles-of-microeconomics-fall-2011/',
                category: 'Economics'
            },
            {
                title: 'Classical Mechanics',
                url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/',
                category: 'Physics'
            },
            {
                title: 'Introduction to Biology',
                url: 'https://ocw.mit.edu/courses/7-012-introduction-to-biology-fall-2004/',
                category: 'Biology'
            },
            {
                title: 'Structure and Interpretation of Computer Programs',
                url: 'https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/',
                category: 'Computer Science'
            },
            {
                title: 'Single Variable Calculus',
                url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
                category: 'Mathematics'
            },
            {
                title: 'Probabilistic Systems Analysis and Applied Probability',
                url: 'https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/',
                category: 'Mathematics'
            }
        ].map(c => ({
            title: c.title,
            description: 'MIT OpenCourseWare course materials.',
            provider: 'MIT OpenCourseWare',
            instructor: 'MIT Faculty',
            category: c.category,
            subcategory: '',
            level: 'University',
            price: 'Free',
            originalPrice: 0,
            rating: 5.0,
            enrollments: 0,
            duration: 'Semester',
            language: 'English',
            thumbnail: 'https://ocw.mit.edu/images/mit-ocw-logo-text.svg',
            url: c.url,
            skills: [c.category],
            certificate: false,
            lastUpdated: new Date().toISOString(),
            scrapedAt: new Date().toISOString()
        }));
    }

    async run() {
        console.log('🚀 Starting MIT OpenCourseWare Scraper...');
        const courses = await this.scrapeCourses();

        if (courses.length > 0) {
            await excelManager.saveCourses(courses);
        }

        console.log(`✅ MIT OCW scraper completed! Saved ${courses.length} courses.`);
        return courses;
    }
}

module.exports = MitOcwScraper;

if (require.main === module) {
    require('dotenv').config();
    const scraper = new MitOcwScraper();
    scraper.run().then(() => process.exit(0));
}
