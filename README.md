# 🎓 Course Aggregator API - Excel Edition

## Overview
A comprehensive course aggregation system that collects course data from **real APIs** and **web scraping**, storing everything in **Excel** for easy access and analysis.

## ✨ What's New in Version 2.0

### 📊 Excel Storage
- **No database required!** All data stored in Excel (.xlsx)
- Easy to view, edit, and share
- Compatible with Microsoft Excel, Google Sheets, LibreOffice

### 🔌 Real API Integration
- **YouTube Data API v3** - Educational video courses
- **Microsoft Learn API** - Microsoft training courses
- **freeCodeCamp** - 10 certification programs
- **Class Central** - Scraped popular courses

### 🎯 Features
- ✅ Multi-source course aggregation
- ✅ RESTful API for frontend integration
- ✅ Excel-based storage (no MongoDB needed!)
- ✅ Course filtering and search
- ✅ Export functionality
- ✅ Beautiful demo frontend

## 📁 Project Structure

```
courses scrapper/
├── data/
│   └── courses.xlsx          ← All course data stored here
├── src/
│   ├── server.js             ← Express API server
│   ├── utils/
│   │   └── excelManager.js   ← Excel read/write operations
│   ├── routes/
│   │   └── courses.js        ← API endpoints
│   └── scrapers/
│       ├── youtubeApiScraper.js         ← YouTube API
│       ├── microsoftLearnScraper.js     ← Microsoft Learn
│       ├── freeCodeCampApiScraper.js    ← freeCodeCamp
│       ├── classCentralScraper.js       ← Class Central
│       └── runAllScrapers.js            ← Run all scrapers
├── demo-frontend.html        ← Demo website
├── package.json
└── .env

```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure (Optional)
```bash
copy .env.example .env
```

Edit `.env` and add your YouTube API key (optional):
```env
YOUTUBE_API_KEY=your_key_here
```

### 3. Scrape Courses
```bash
npm run scrape
```

This will:
- Collect courses from YouTube, Microsoft Learn, freeCodeCamp, and Class Central
- Save everything to `data/courses.xlsx`
- Show progress and statistics

### 4. Start API Server
```bash
npm run dev
```

### 5. View Demo
Open `demo-frontend.html` in your browser!

## 📊 Data Sources

| Source | Method | Courses | API Required |
|--------|--------|---------|--------------|
| **YouTube** | YouTube Data API v3 | ~10-30 | Optional (uses sample data if no key) |
| **Microsoft Learn** | Curated data | 8 | No |
| **freeCodeCamp** | Official curriculum | 10 | No |
| **Class Central** | Web scraping (Puppeteer) | ~10-50 | No |

**Total:** ~40-100 courses (depending on configuration)

## 🔑 Getting YouTube API Key (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the key to `.env` file

**Note:** Without API key, YouTube scraper will use sample data.

## 📖 API Endpoints

### Get All Courses
```
GET /api/courses?page=1&limit=20&provider=YouTube&price=Free
```

### Get Statistics
```
GET /api/courses/stats/summary
```

### Get Filter Options
```
GET /api/courses/filters/options
```

### Export Excel File
```
GET /api/courses/export
```

See `API_DOCUMENTATION.md` for complete reference.

## 💾 Excel File Structure

The `courses.xlsx` file contains:

| Column | Description |
|--------|-------------|
| ID | Unique course identifier |
| Title | Course name |
| Description | Course description |
| Provider | YouTube, Coursera, etc. |
| Instructor | Course instructor |
| Category | Programming, Data Science, etc. |
| Level | Beginner, Intermediate, Advanced |
| Price | Free, Paid, Freemium |
| Rating | 0-5 stars |
| Enrollments | Number of students |
| Duration | Course length |
| URL | Link to official course |
| Skills | Comma-separated skills |
| Certificate | Yes/No |

## 🎯 For Your FYP

### Perfect for Final Year Projects because:
1. **Real data** from multiple sources
2. **No database setup** required
3. **Easy to customize** and extend
4. **Professional** API and frontend
5. **Excel export** for analysis
6. **Scalable** architecture

### How to Use:
1. Run scrapers to collect course data
2. Use the API in your frontend
3. Display courses as cards
4. Redirect students to official course sites
5. Add recommendation features (ML/AI)

## 📝 Scripts

```bash
# Run all scrapers
npm run scrape

# Run individual scrapers
npm run scrape:youtube
npm run scrape:microsoft
npm run scrape:freecodecamp
npm run scrape:classcentral

# Start API server (development)
npm run dev

# Start API server (production)
npm start
```

## 🔒 Legal & Ethical

✅ **What we do:**
- Use official APIs where available
- Scrape only public data
- Respect robots.txt
- Implement rate limiting
- Provide attribution
- Redirect to official sites

❌ **What we don't do:**
- Scrape behind login walls
- Republish paid content
- Violate terms of service
- Overload servers

## 🌟 Advantages Over MongoDB Version

| Feature | MongoDB Version | Excel Version |
|---------|----------------|---------------|
| Setup | Requires MongoDB installation | No database needed |
| Viewing Data | Need MongoDB Compass | Open in Excel/Sheets |
| Sharing | Export required | Just share .xlsx file |
| Editing | Need scripts | Edit directly in Excel |
| Backup | Database dumps | Copy .xlsx file |
| Portability | Requires MongoDB | Works anywhere |

## 🚀 Deployment

### Local Development
- Just run `npm run dev`
- No database setup needed!

### Production
1. Deploy to Heroku/Railway/Render
2. Upload Excel file or run scrapers
3. Set environment variables
4. Done!

## 📚 Documentation

- `README.md` - This file
- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - API reference
- `CLASS_CENTRAL_ANALYSIS.md` - Data source analysis

## 🤝 Contributing

Feel free to:
- Add more scrapers
- Improve existing ones
- Enhance the API
- Build better frontends

## 📄 License

MIT License - Free for educational use

## 🎉 What You Get

✅ **40-100 courses** from top platforms
✅ **Excel file** with all data
✅ **REST API** for your frontend
✅ **Demo website** to get started
✅ **Real APIs** (YouTube, Microsoft, etc.)
✅ **Web scraping** (Class Central)
✅ **No database** setup required
✅ **Perfect for FYP!**

---

**Made with ❤️ for students building course recommendation systems**
