const express = require('express');
const router = express.Router();
const excelManager = require('../utils/excelManager');

// GET /api/courses - Get all courses with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            provider,
            category,
            level,
            price,
            search
        } = req.query;

        // Get all courses from Excel
        let courses = await excelManager.getAllCourses();

        // Apply filters
        if (provider) {
            courses = courses.filter(c => c.provider === provider);
        }
        if (category) {
            courses = courses.filter(c => c.category === category);
        }
        if (level) {
            courses = courses.filter(c => c.level === level);
        }
        if (price) {
            courses = courses.filter(c => c.price === price);
        }
        if (search) {
            const searchLower = search.toLowerCase();
            courses = courses.filter(c =>
                c.title.toLowerCase().includes(searchLower) ||
                c.description.toLowerCase().includes(searchLower) ||
                c.skills.toLowerCase().includes(searchLower)
            );
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedCourses = courses.slice(startIndex, endIndex);
        const totalPages = Math.ceil(courses.length / limit);

        res.json({
            success: true,
            data: paginatedCourses,
            totalPages: totalPages,
            currentPage: parseInt(page),
            totalCourses: courses.length
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
});

// GET /api/courses/stats/summary - Get statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const courses = await excelManager.getAllCourses();

        // Calculate provider stats
        const providerCounts = {};
        courses.forEach(c => {
            providerCounts[c.provider] = (providerCounts[c.provider] || 0) + 1;
        });
        const providerStats = Object.entries(providerCounts).map(([provider, count]) => ({
            _id: provider,
            count
        })).sort((a, b) => b.count - a.count);

        // Calculate category stats
        const categoryCounts = {};
        courses.forEach(c => {
            categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
        });
        const categoryStats = Object.entries(categoryCounts).map(([category, count]) => ({
            _id: category,
            count
        })).sort((a, b) => b.count - a.count);

        const stats = await excelManager.getStats();

        res.json({
            success: true,
            data: {
                totalCourses: stats.totalCourses,
                freeCourses: stats.freeCourses,
                paidCourses: stats.totalCourses - stats.freeCourses,
                providers: providerStats,
                categories: categoryStats
            }
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// GET /api/courses/filters/options - Get available filter options
router.get('/filters/options', async (req, res) => {
    try {
        const courses = await excelManager.getAllCourses();

        const providers = [...new Set(courses.map(c => c.provider))].sort();
        const categories = [...new Set(courses.map(c => c.category))].sort();
        const levels = [...new Set(courses.map(c => c.level))].sort();
        const prices = [...new Set(courses.map(c => c.price))].sort();

        res.json({
            success: true,
            data: {
                providers,
                categories,
                levels,
                prices
            }
        });

    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching filter options',
            error: error.message
        });
    }
});

// GET /api/courses/export - Download Excel file
router.get('/export', (req, res) => {
    try {
        const filePath = process.env.EXCEL_FILE_PATH || './data/courses.xlsx';
        res.download(filePath, 'courses.xlsx');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error exporting Excel file',
            error: error.message
        });
    }
});

module.exports = router;
