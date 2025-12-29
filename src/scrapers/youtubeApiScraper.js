const { google } = require('googleapis');
const excelManager = require('../utils/excelManager');

class YouTubeApiScraper {
    constructor() {
        this.apiKey = process.env.YOUTUBE_API_KEY;
        this.youtube = google.youtube({
            version: 'v3',
            auth: this.apiKey
        });

        // Educational channels to scrape
        this.educationalChannels = [
            { id: 'UCsooa4yRKGN_zEE8iknghZA', name: 'TED-Ed' },
            { id: 'UCtFRv9O2AHqOZjjynzrv-xg', name: 'Kurzgesagt' },
            { id: 'UCX6OQ3DkcsbYNE6H8uQQuVA', name: 'MrBeast' },
            { id: 'UCsXVk37bltHxD1rDPwtNM8Q', name: 'Kurzgesagt' },
            { id: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', name: 'PewDiePie' },
            // Add more educational channels
        ];

        // Educational playlists/search terms
        this.searchTerms = [
            'programming tutorial',
            'web development course',
            'data science tutorial',
            'machine learning course',
            'python programming',
            'javascript tutorial'
        ];
    }

    async searchEducationalVideos(query, maxResults = 10) {
        try {
            const response = await this.youtube.search.list({
                part: 'snippet',
                q: query + ' course OR tutorial',
                type: 'video',
                videoDuration: 'long', // Get longer educational content
                maxResults: maxResults,
                relevanceLanguage: 'en',
                safeSearch: 'strict'
            });

            return response.data.items || [];
        } catch (error) {
            console.error(`Error searching YouTube for "${query}":`, error.message);
            return [];
        }
    }

    async getVideoDetails(videoIds) {
        try {
            const response = await this.youtube.videos.list({
                part: 'snippet,contentDetails,statistics',
                id: videoIds.join(',')
            });

            return response.data.items || [];
        } catch (error) {
            console.error('Error getting video details:', error.message);
            return [];
        }
    }

    parseDuration(duration) {
        // Convert ISO 8601 duration to readable format
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');

        if (hours) return `${hours}h ${minutes || 0}m`;
        if (minutes) return `${minutes}m`;
        return `${seconds}s`;
    }

    async scrapeCourses() {
        try {
            console.log('🔍 Scraping YouTube educational content using API...');

            if (!this.apiKey || this.apiKey === 'your_youtube_api_key_here') {
                console.log('⚠️  YouTube API key not configured. Using sample data instead.');
                return this.getSampleData();
            }

            const allCourses = [];

            for (const searchTerm of this.searchTerms) {
                console.log(`  Searching for: ${searchTerm}`);

                const videos = await this.searchEducationalVideos(searchTerm, 5);
                const videoIds = videos.map(v => v.id.videoId);

                if (videoIds.length === 0) continue;

                const videoDetails = await this.getVideoDetails(videoIds);

                for (const video of videoDetails) {
                    const course = {
                        title: video.snippet.title,
                        description: video.snippet.description.substring(0, 500),
                        provider: 'YouTube',
                        instructor: video.snippet.channelTitle,
                        category: this.categorizeVideo(searchTerm),
                        level: 'All Levels',
                        price: 'Free',
                        originalPrice: 0,
                        rating: 4.5,
                        enrollments: parseInt(video.statistics.viewCount) || 0,
                        duration: this.parseDuration(video.contentDetails.duration),
                        language: 'English',
                        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
                        url: `https://www.youtube.com/watch?v=${video.id}`,
                        skills: [this.categorizeVideo(searchTerm)],
                        certificate: false,
                        lastUpdated: video.snippet.publishedAt
                    };

                    allCourses.push(course);
                }

                // Respect API quota - delay between requests
                await this.sleep(1000);
            }

            console.log(`✅ Found ${allCourses.length} YouTube courses`);
            return allCourses;

        } catch (error) {
            console.error('❌ YouTube API scraper error:', error.message);
            return this.getSampleData();
        }
    }

    categorizeVideo(searchTerm) {
        if (searchTerm.includes('programming') || searchTerm.includes('python') || searchTerm.includes('javascript')) {
            return 'Programming';
        }
        if (searchTerm.includes('web development')) {
            return 'Web Development';
        }
        if (searchTerm.includes('data science') || searchTerm.includes('machine learning')) {
            return 'Data Science';
        }
        return 'Technology';
    }

    getSampleData() {
        // Sample data when API key is not available
        return [
            {
                title: 'Complete Python Programming Course',
                description: 'Learn Python from scratch with this comprehensive tutorial covering basics to advanced topics',
                provider: 'YouTube',
                instructor: 'Programming with Mosh',
                category: 'Programming',
                level: 'Beginner',
                price: 'Free',
                originalPrice: 0,
                rating: 4.8,
                enrollments: 5000000,
                duration: '6h 14m',
                language: 'English',
                thumbnail: 'https://i.ytimg.com/vi/sample/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=sample',
                skills: ['Python', 'Programming'],
                certificate: false,
                lastUpdated: new Date().toISOString()
            },
            {
                title: 'Web Development Full Course',
                description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks',
                provider: 'YouTube',
                instructor: 'freeCodeCamp.org',
                category: 'Web Development',
                level: 'Beginner',
                price: 'Free',
                originalPrice: 0,
                rating: 4.9,
                enrollments: 3000000,
                duration: '12h 30m',
                language: 'English',
                thumbnail: 'https://i.ytimg.com/vi/sample2/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=sample2',
                skills: ['HTML', 'CSS', 'JavaScript'],
                certificate: false,
                lastUpdated: new Date().toISOString()
            }
        ];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run() {
        console.log('🚀 Starting YouTube API scraper...');
        const courses = await this.scrapeCourses();
        if (courses.length > 0) {
            await excelManager.saveCourses(courses);
        }
        console.log('✅ YouTube scraper completed\n');
        return courses;
    }
}

module.exports = YouTubeApiScraper;

// Run if called directly
if (require.main === module) {
    require('dotenv').config();
    const scraper = new YouTubeApiScraper();
    scraper.run().then(() => process.exit(0));
}
