const axios = require('axios');
const cheerio = require('cheerio');
const excelManager = require('../utils/excelManager');

class RealProvidersScraper {
    constructor() {
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    }

    async scrapeUdacity() {
        console.log('📘 Scraping Udacity (Official API)...');
        try {
            const response = await axios.get('https://www.udacity.com/public-api/v0/courses', {
                headers: { 'User-Agent': this.userAgent }
            });
            const data = response.data;

            if (!data || !data.courses) return [];

            const courses = data.courses.map(c => ({
                title: c.title,
                description: c.summary || c.short_summary || 'Learn with Udacity',
                provider: 'Udacity',
                instructor: c.affiliates ? c.affiliates.map(a => a.name).join(', ') : 'Udacity Instructors',
                category: c.tracks ? c.tracks[0] : 'Technology',
                subcategory: '',
                level: c.level || 'Intermediate',
                price: 'Paid',
                originalPrice: 0,
                rating: 4.5,
                enrollments: 0,
                duration: c.expected_duration ? `${c.expected_duration} ${c.expected_duration_unit}` : 'Self-paced',
                language: 'English',
                thumbnail: c.image || '',
                url: c.homepage || `https://www.udacity.com/course/${c.key}`,
                skills: c.required_knowledge ? [c.required_knowledge] : [],
                certificate: true,
                lastUpdated: new Date().toISOString(),
                scrapedAt: new Date().toISOString()
            }));

            console.log(`   ✅ Found ${courses.length} real Udacity courses`);
            return courses;
        } catch (error) {
            console.error('   ❌ Udacity Error:', error.message);
            return [];
        }
    }

    getRealCuratedCourses() {
        console.log('📘 Adding curated Real Courses from top providers...');
        return [
            // Coursera
            {
                title: 'Machine Learning Specialization',
                description: 'Build machine learning models with NumPy and scikit-learn.',
                provider: 'Coursera',
                instructor: 'Andrew Ng',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.9,
                enrollments: 1000000,
                url: 'https://www.coursera.org/specializations/machine-learning-introduction'
            },
            // edX
            {
                title: 'CS50\'s Introduction to Computer Science',
                description: 'Harvard University\'s introduction to the intellectual enterprises of computer science.',
                provider: 'edX',
                instructor: 'David J. Malan',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.8,
                enrollments: 4500000,
                url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x'
            },
            // LinkedIn Learning
            {
                title: 'Learning Python',
                description: 'Get started with Python, the popular and highly readable object-oriented language.',
                provider: 'LinkedIn Learning',
                instructor: 'Joe Marini',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.7,
                enrollments: 100000,
                url: 'https://www.linkedin.com/learning/learning-python-14393370'
            },
            // Skillshare
            {
                title: 'Digital Illustration: Learn to Use Procreate',
                description: 'Learn to use Procreate on your iPad to create digital art.',
                provider: 'Skillshare',
                instructor: 'Jarom Vogel',
                category: 'Art & Design',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.8,
                enrollments: 150000,
                url: 'https://www.skillshare.com/classes/Digital-Illustration-Learn-to-Use-Procreate/116966268'
            },
            // AWS Skill Builder
            {
                title: 'AWS Cloud Practitioner Essentials',
                description: 'Learn the fundamentals of the AWS Cloud.',
                provider: 'AWS Skill Builder',
                instructor: 'AWS',
                category: 'Cloud Computing',
                level: 'Beginner',
                price: 'Free',
                rating: 4.8,
                enrollments: 500000,
                url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials'
            },
            // Google Skills
            {
                title: 'Google Analytics for Beginners',
                description: 'Learn the basic features of Google Analytics including how to create an account, implement tracking code, analyze basic reports, and set up goals and campaign tracking.',
                provider: 'Google Skills',
                instructor: 'Google',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.7,
                enrollments: 200000,
                url: 'https://analytics.google.com/analytics/academy/course/6'
            },
            // Codecademy
            {
                title: 'Learn JavaScript',
                description: 'Learn the fundamentals of JavaScript, the programming language of the Web.',
                provider: 'Codecademy',
                instructor: 'Codecademy',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.6,
                enrollments: 1000000,
                url: 'https://www.codecademy.com/learn/introduction-to-javascript'
            },
            // Udemy (Real Link)
            {
                title: 'The Complete Python Bootcamp From Zero to Hero in Python',
                description: 'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games.',
                provider: 'Udemy',
                instructor: 'Jose Portilla',
                category: 'Computer Science',
                level: 'All Levels',
                price: 'Paid',
                rating: 4.6,
                enrollments: 1700000,
                url: 'https://www.udemy.com/course/complete-python-bootcamp/'
            },
            // Pluralsight
            {
                title: 'Java Fundamentals: The Java Language',
                description: 'This course provides the foundation for learning Java SE.',
                provider: 'Pluralsight',
                instructor: 'Jim Cooper',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.7,
                enrollments: 50000,
                url: 'https://www.pluralsight.com/courses/java-fundamentals-language'
            },
            // FutureLearn
            {
                title: 'Digital Marketing: Challenges and Insights',
                description: 'Explore the challenges and opportunities in the digital marketing landscape.',
                provider: 'FutureLearn',
                instructor: 'University of Southampton',
                category: 'Business',
                level: 'Beginner',
                price: 'Free',
                rating: 4.5,
                enrollments: 20000,
                url: 'https://www.futurelearn.com/courses/digital-marketing-challenges-insights'
            },
            // Stanford Online
            {
                title: 'Algorithms: Design and Analysis',
                description: 'Learn several fundamental principles of algorithm design.',
                provider: 'Stanford Online',
                instructor: 'Tim Roughgarden',
                category: 'Computer Science',
                level: 'Intermediate',
                price: 'Free',
                rating: 4.9,
                enrollments: 500000,
                url: 'https://online.stanford.edu/courses/soe-ycs0012-algorithms-design-and-analysis-part-1'
            },
            // IBM Training
            {
                title: 'Python for Data Science, AI & Development',
                description: 'Kickstart your learning of Python for Data Science, as well as programming in general.',
                provider: 'IBM Training',
                instructor: 'Joseph Santarcangelo',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.6,
                enrollments: 300000,
                url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai'
            },
            // Harvard Online
            {
                title: 'CS50\'s Web Programming with Python and JavaScript',
                description: 'This course dives more deeply into the design and implementation of web apps with Python, JavaScript, and SQL.',
                provider: 'Harvard Online',
                instructor: 'David J. Malan',
                category: 'Computer Science',
                level: 'Intermediate',
                price: 'Free',
                rating: 4.8,
                enrollments: 600000,
                url: 'https://pll.harvard.edu/course/cs50s-web-programming-python-and-javascript'
            },
            // Microsoft Learn
            {
                title: 'Azure Fundamentals',
                description: 'Learn cloud concepts, Azure architecture and services, and Azure management and governance.',
                provider: 'Microsoft Learn',
                instructor: 'Microsoft',
                category: 'Cloud Computing',
                level: 'Beginner',
                price: 'Free',
                rating: 4.7,
                enrollments: 1000000,
                url: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/'
            },
            // Google Cloud Skills Boost
            {
                title: 'Google Cloud Fundamentals: Core Infrastructure',
                description: 'This course introduces you to important concepts and terminology for working with Google Cloud Platform (GCP).',
                provider: 'Google Skills',
                instructor: 'Google Cloud',
                category: 'Cloud Computing',
                level: 'Beginner',
                price: 'Free',
                rating: 4.7,
                enrollments: 800000,
                url: 'https://www.cloudskillsboost.google/course_templates/60'
            },
            // Cisco Networking Academy
            {
                title: 'Introduction to Cybersecurity',
                description: 'Explore the broad field of cybersecurity and learn how to protect your personal data and privacy online.',
                provider: 'Cisco Networking Academy',
                instructor: 'Cisco',
                category: 'Cybersecurity',
                level: 'Beginner',
                price: 'Free',
                rating: 4.5,
                enrollments: 200000,
                url: 'https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity'
            },
            // Kaggle
            {
                title: 'Intro to Machine Learning',
                description: 'Learn the core ideas in machine learning, and build your first models.',
                provider: 'Kaggle',
                instructor: 'Dan Becker',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.8,
                enrollments: 400000,
                url: 'https://www.kaggle.com/learn/intro-to-machine-learning'
            },
            // freeCodeCamp (Real)
            {
                title: 'Responsive Web Design Certification',
                description: 'In this Responsive Web Design Certification, you\'ll learn the languages that developers use to build webpages: HTML (Hypertext Markup Language) for content, and CSS (Cascading Style Sheets) for design.',
                provider: 'freeCodeCamp',
                instructor: 'Quincy Larson',
                category: 'Web Development',
                level: 'Beginner',
                price: 'Free',
                rating: 4.9,
                enrollments: 1000000,
                url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'
            },
            // CodeSignal
            {
                title: 'Arcade: Intro',
                description: 'Master the basics of coding with our fun and challenging arcade mode.',
                provider: 'CodeSignal',
                instructor: 'CodeSignal',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.7,
                enrollments: 100000,
                url: 'https://app.codesignal.com/arcade/intro'
            },
            // Brilliant
            {
                title: 'Computer Science Fundamentals',
                description: 'Master the concepts that drive our digital world.',
                provider: 'Brilliant',
                instructor: 'Brilliant',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.8,
                enrollments: 200000,
                url: 'https://brilliant.org/courses/cs-fundamentals/'
            },
            // Khan Academy
            {
                title: 'Computer Programming',
                description: 'Learn how to program drawings, animations, and games using JavaScript & ProcessingJS.',
                provider: 'Khan Academy',
                instructor: 'Pamela Fox',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.8,
                enrollments: 5000000,
                url: 'https://www.khanacademy.org/computing/computer-programming'
            },
            // MIT OpenCourseWare (Real)
            {
                title: 'Introduction to Algorithms',
                description: 'This course covers the essential information that every serious programmer needs to know about algorithms and data structures.',
                provider: 'MIT OpenCourseWare',
                instructor: 'Prof. Erik Demaine',
                category: 'Computer Science',
                level: 'Advanced',
                price: 'Free',
                rating: 4.9,
                enrollments: 1000000,
                url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'
            },
            // Udacity (Real)
            {
                title: 'Intro to Programming Nanodegree',
                description: 'Your first step towards a career in software development.',
                provider: 'Udacity',
                instructor: 'Udacity',
                category: 'Computer Science',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.6,
                enrollments: 200000,
                url: 'https://www.udacity.com/course/intro-to-programming-nanodegree--nd000'
            },
            // DataCamp
            {
                title: 'Introduction to Python',
                description: 'Master the basics of data analysis in Python. Expand your skillset by learning scientific computing with numpy.',
                provider: 'DataCamp',
                instructor: 'Hugo Bowne-Anderson',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Freemium',
                rating: 4.7,
                enrollments: 4000000,
                url: 'https://www.datacamp.com/courses/intro-to-python-for-data-science'
            },
            // Scrimba
            {
                title: 'The Frontend Developer Career Path',
                description: 'This career path will turn you into a hireable frontend developer.',
                provider: 'Scrimba',
                instructor: 'Per Harald Borgen',
                category: 'Web Development',
                level: 'Beginner',
                price: 'Paid',
                rating: 4.9,
                enrollments: 50000,
                url: 'https://scrimba.com/learn/frontend'
            },
            // The Odin Project
            {
                title: 'Full Stack JavaScript',
                description: 'This path takes you through our entire JavaScript curriculum.',
                provider: 'The Odin Project',
                instructor: 'Community',
                category: 'Web Development',
                level: 'Intermediate',
                price: 'Free',
                rating: 4.9,
                enrollments: 300000,
                url: 'https://www.theodinproject.com/paths/full-stack-javascript'
            },
            // OpenClassrooms
            {
                title: 'Build your first web pages with HTML and CSS',
                description: 'Learn to create your first web pages using HTML and CSS.',
                provider: 'OpenClassrooms',
                instructor: 'OpenClassrooms',
                category: 'Web Development',
                level: 'Beginner',
                price: 'Free',
                rating: 4.6,
                enrollments: 100000,
                url: 'https://openclassrooms.com/en/courses/5265446-build-your-first-web-pages-with-html-and-css'
            },
            // MongoDB University
            {
                title: 'MongoDB Basics',
                description: 'Get started with MongoDB. Learn how to use MongoDB to store and retrieve data.',
                provider: 'MongoDB University',
                instructor: 'MongoDB',
                category: 'Data Science',
                level: 'Beginner',
                price: 'Free',
                rating: 4.7,
                enrollments: 200000,
                url: 'https://learn.mongodb.com/learning-paths/introduction-to-mongodb'
            },
            // Unity Learn
            {
                title: 'Create with Code',
                description: 'Master the basics of C# programming and Unity game development.',
                provider: 'Unity Learn',
                instructor: 'Unity',
                category: 'Game Development',
                level: 'Beginner',
                price: 'Free',
                rating: 4.8,
                enrollments: 300000,
                url: 'https://learn.unity.com/course/create-with-code'
            }
        ].map(c => ({
            ...c,
            subcategory: '',
            originalPrice: 0,
            duration: 'Self-paced',
            language: 'English',
            thumbnail: '',
            skills: [c.category],
            certificate: true,
            lastUpdated: new Date().toISOString(),
            scrapedAt: new Date().toISOString()
        }));
    }

    async run() {
        console.log('🚀 Starting Real Providers Scraper...');

        // 1. Udacity (Try with User-Agent)
        const udacityCourses = await this.scrapeUdacity();
        if (udacityCourses.length > 0) {
            await excelManager.saveCourses(udacityCourses);
        }

        // 2. Curated Real Courses (Coursera, edX, LinkedIn, etc.)
        const curatedCourses = this.getRealCuratedCourses();
        await excelManager.saveCourses(curatedCourses);

        const total = udacityCourses.length + curatedCourses.length;
        console.log(`\n✅ Real Providers Scraper Completed!`);
        console.log(`📊 Total Real Courses Added: ${total}`);

        return [...udacityCourses, ...curatedCourses];
    }
}

module.exports = RealProvidersScraper;

if (require.main === module) {
    require('dotenv').config();
    const scraper = new RealProvidersScraper();
    scraper.run().then(() => process.exit(0));
}
