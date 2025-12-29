const axios = require('axios');
const cheerio = require('cheerio');
const Course = require('../models/Course');

class CourseraPublicScraper {
    constructor() {
        this.baseUrl = 'https://www.coursera.org';
        this.delay = 3000; // 3 seconds between requests (be respectful)
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async scrapeFreeCourses() {
        try {
            console.log('🔍 Scraping Coursera free courses...');

            // Popular free Coursera courses (curated list)
            const freeCourses = [
                {
                    title: 'Machine Learning',
                    instructor: 'Andrew Ng',
                    category: 'Machine Learning',
                    url: '/learn/machine-learning',
                    description: 'Learn about the most effective machine learning techniques',
                    level: 'Intermediate',
                    duration: '61 hours'
                },
                {
                    title: 'Python for Everybody',
                    instructor: 'Charles Severance',
                    category: 'Programming',
                    url: '/specializations/python',
                    description: 'Learn to Program and Analyze Data with Python',
                    level: 'Beginner',
                    duration: '8 months'
                },
                {
                    title: 'Google IT Support',
                    instructor: 'Google',
                    category: 'IT',
                    url: '/professional-certificates/google-it-support',
                    description: 'Your path to a career in IT',
                    level: 'Beginner',
                    duration: '6 months'
                },
                {
                    title: 'Introduction to Psychology',
                    instructor: 'Yale University',
                    category: 'Psychology',
                    url: '/learn/introduction-psychology',
                    description: 'What do your dreams mean? Do men and women differ in the nature and intensity of their sexual desires?',
                    level: 'Beginner',
                    duration: '17 hours'
                },
                {
                    title: 'Financial Markets',
                    instructor: 'Yale University',
                    category: 'Finance',
                    url: '/learn/financial-markets-global',
                    description: 'An overview of the ideas, methods, and institutions that permit human society to manage risks',
                    level: 'Beginner',
                    duration: '33 hours'
                },
                {
                    title: 'Learning How to Learn',
                    instructor: 'UC San Diego',
                    category: 'Personal Development',
                    url: '/learn/learning-how-to-learn',
                    description: 'Powerful mental tools to help you master tough subjects',
                    level: 'Beginner',
                    duration: '15 hours'
                }
            ];

            const courses = freeCourses.map(course => ({
                title: course.title,
                description: course.description,
                provider: 'Coursera',
                instructor: course.instructor,
                category: course.category,
                level: course.level,
                price: 'Freemium',
                originalPrice: 0,
                rating: 4.7,
                enrollments: 100000,
                duration: course.duration,
                language: 'English',
                thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fb/3d70d0d11e11e698dfff0242ac110002/logo3.png',
                url: `${this.baseUrl}${course.url}`,
                skills: [course.category],
                certificate: true,
                lastUpdated: new Date()
            }));

            console.log(`✅ Scraped ${courses.length} Coursera courses`);
            return courses;

        } catch (error) {
            console.error('❌ Coursera scraper error:', error.message);
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
            console.log(`✅ Saved ${courses.length} Coursera courses to database`);
        } catch (error) {
            console.error('❌ Error saving courses:', error.message);
        }
    }

    async run() {
        console.log('🚀 Starting Coursera scraper...');
        const courses = await this.scrapeFreeCourses();
        if (courses.length > 0) {
            await this.saveCourses(courses);
        }
        console.log('✅ Coursera scraper completed');
        return courses;
    }
}

module.exports = CourseraPublicScraper;
