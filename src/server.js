require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🎓 Course Aggregator API - Excel Edition',
        version: '2.0.0',
        storage: 'Excel (ExcelJS)',
        endpoints: {
            courses: '/api/courses',
            stats: '/api/courses/stats/summary',
            filters: '/api/courses/filters/options',
            export: '/api/courses/export'
        },
        dataSources: [
            'YouTube (API)',
            'Microsoft Learn',
            'freeCodeCamp',
            'Class Central (Scraped)'
        ],
        documentation: 'See README.md for full API documentation'
    });
});

app.use('/api/courses', coursesRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║   🎓 Course Aggregator API Started (Excel Edition)   ║
║   🌐 Port: ${PORT}                                    ║
║   📝 Environment: ${process.env.NODE_ENV || 'development'}                       ║
║   💾 Storage: Excel (ExcelJS)                        ║
║   🔗 http://localhost:${PORT}                         ║
║                                                       ║
║   Data Sources:                                       ║
║   ✅ YouTube API                                      ║
║   ✅ Microsoft Learn                                  ║
║   ✅ freeCodeCamp                                     ║
║   ✅ Class Central (Scraped)                          ║
╚═══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
