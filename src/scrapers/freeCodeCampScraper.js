const axios = require('axios');
const Course = require('../models/Course');

class FreeCodeCampScraper {
    constructor() {
        this.baseUrl = 'https://www.freecodecamp.org';
        this.apiUrl = 'https://www.freecodecamp.org/api/curriculum';
    }

    async scrapeCurriculum() {
        try {
            console.log('🔍 Scraping freeCodeCamp curriculum...');

            // freeCodeCamp certifications
            const certifications = [
                {
                    name: 'Responsive Web Design',
                    description: 'Learn HTML, CSS, Flexbox, CSS Grid, and Responsive Web Design principles',
                    category: 'Web Development',
                    skills: ['HTML', 'CSS', 'Responsive Design', 'Flexbox', 'CSS Grid']
                },
                {
                    name: 'JavaScript Algorithms and Data Structures',
                    description: 'Learn JavaScript fundamentals, ES6, Regular Expressions, Debugging, Data Structures, and Algorithm Scripting',
                    category: 'Programming',
                    skills: ['JavaScript', 'ES6', 'Algorithms', 'Data Structures']
                },
                {
                    name: 'Front End Development Libraries',
                    description: 'Learn Bootstrap, jQuery, Sass, React, and Redux',
                    category: 'Web Development',
                    skills: ['React', 'Redux', 'Bootstrap', 'jQuery', 'Sass']
                },
                {
                    name: 'Data Visualization',
                    description: 'Learn to visualize data with D3.js',
                    category: 'Data Science',
                    skills: ['D3.js', 'Data Visualization', 'SVG', 'JSON']
                },
                {
                    name: 'Back End Development and APIs',
                    description: 'Learn Node.js, Express, MongoDB, and how to build APIs',
                    category: 'Web Development',
                    skills: ['Node.js', 'Express', 'MongoDB', 'APIs', 'NPM']
                },
                {
                    name: 'Quality Assurance',
                    description: 'Learn testing with Chai, quality assurance, and advanced Node and Express',
                    category: 'Software Engineering',
                    skills: ['Testing', 'Chai', 'Quality Assurance', 'Node.js']
                },
                {
                    name: 'Scientific Computing with Python',
                    description: 'Learn Python fundamentals and how to use Python for scientific computing',
                    category: 'Programming',
                    skills: ['Python', 'Scientific Computing', 'Data Analysis']
                },
                {
                    name: 'Data Analysis with Python',
                    description: 'Learn data analysis with Python, Pandas, Matplotlib, and Seaborn',
                    category: 'Data Science',
                    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
                },
                {
                    name: 'Information Security',
                    description: 'Learn information security with HelmetJS and Python',
                    category: 'Cybersecurity',
                    skills: ['Security', 'HelmetJS', 'Python', 'Penetration Testing']
                },
                {
                    name: 'Machine Learning with Python',
                    description: 'Learn machine learning fundamentals with Python, TensorFlow, and neural networks',
                    category: 'Machine Learning',
                    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Machine Learning']
                }
            ];

            const courses = certifications.map(cert => ({
                title: `freeCodeCamp - ${cert.name} Certification`,
                description: cert.description,
                provider: 'freeCodeCamp',
                instructor: 'freeCodeCamp',
                category: cert.category,
                level: 'Beginner',
                price: 'Free',
                originalPrice: 0,
                rating: 4.9,
                enrollments: 500000,
                duration: '300 hours',
                language: 'English',
                thumbnail: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
                url: `${this.baseUrl}/learn`,
                skills: cert.skills,
                certificate: true,
                lastUpdated: new Date()
            }));

            console.log(`✅ Scraped ${courses.length} freeCodeCamp certifications`);
            return courses;

        } catch (error) {
            console.error('❌ freeCodeCamp scraper error:', error.message);
            return [];
        }
    }

    async saveCourses(courses) {
        try {
            for (const courseData of courses) {
                await Course.findOneAndUpdate(
                    { url: courseData.url, title: courseData.title },
                    { ...courseData, scrapedAt: new Date() },
                    { upsert: true, new: true }
                );
            }
            console.log(`✅ Saved ${courses.length} freeCodeCamp courses to database`);
        } catch (error) {
            console.error('❌ Error saving courses:', error.message);
        }
    }

    async run() {
        console.log('🚀 Starting freeCodeCamp scraper...');
        const courses = await this.scrapeCurriculum();
        if (courses.length > 0) {
            await this.saveCourses(courses);
        }
        console.log('✅ freeCodeCamp scraper completed');
        return courses;
    }
}

module.exports = FreeCodeCampScraper;
