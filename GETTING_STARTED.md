# ⚡ GETTING STARTED - 5 Minutes to Running System

## 🎯 What You're Building

A course recommendation system that:
- Collects courses from **YouTube, Microsoft Learn, freeCodeCamp, and Class Central**
- Stores everything in an **Excel file** (no database!)
- Provides a **REST API** for your frontend
- Includes a **beautiful demo website**

---

## 📋 Prerequisites

✅ **Node.js** installed ([Download here](https://nodejs.org/))
✅ **That's it!** No database needed!

---

## 🚀 5-Minute Setup

### 1️⃣ Install Dependencies (1 minute)

Open PowerShell/Terminal in `d:/courses scrapper` and run:

```bash
npm install
```

Wait for installation to complete...

---

### 2️⃣ Collect Course Data (2 minutes)

```bash
npm run scrape
```

**What happens:**
- ✅ Scrapes YouTube educational videos
- ✅ Collects Microsoft Learn courses
- ✅ Gets freeCodeCamp certifications
- ✅ Scrapes Class Central popular courses
- ✅ Saves everything to `data/courses.xlsx`

**You'll see:**
```
🚀 Starting All Course Scrapers
📊 Data will be saved to Excel

✅ YouTube: 2 courses
✅ Microsoft Learn: 8 courses
✅ freeCodeCamp: 10 courses
✅ Class Central: 10 courses

🎉 Total courses collected: 30
✅ Excel file saved at: ./data/courses.xlsx
```

---

### 3️⃣ Start API Server (30 seconds)

```bash
npm run dev
```

**You'll see:**
```
╔═══════════════════════════════════════════════════════╗
║   🎓 Course Aggregator API Started (Excel Edition)   ║
║   🌐 Port: 3000                                       ║
║   🔗 http://localhost:3000                            ║
╚═══════════════════════════════════════════════════════╝
```

---

### 4️⃣ Test It! (1 minute)

**Option A: View Excel File**
1. Open `d:/courses scrapper/data/courses.xlsx`
2. See all 30 courses with complete details!

**Option B: Test API**
1. Open browser
2. Go to: `http://localhost:3000/api/courses`
3. See JSON data with all courses!

**Option C: View Demo Website**
1. Open `demo-frontend.html` in your browser
2. See beautiful course cards!
3. Try filters and search!

---

## 🎉 You're Done!

You now have:
- ✅ **30 courses** in Excel
- ✅ **REST API** running
- ✅ **Demo website** working
- ✅ **Ready for your FYP!**

---

## 🔥 Quick Commands Reference

```bash
# Collect course data
npm run scrape

# Start API server
npm run dev

# Run individual scrapers
npm run scrape:youtube
npm run scrape:microsoft
npm run scrape:freecodecamp
npm run scrape:classcentral
```

---

## 🌐 API Endpoints to Try

```
# Get all courses
http://localhost:3000/api/courses

# Get free courses only
http://localhost:3000/api/courses?price=Free

# Search for Python
http://localhost:3000/api/courses?search=python

# Filter by provider
http://localhost:3000/api/courses?provider=freeCodeCamp

# Get statistics
http://localhost:3000/api/courses/stats/summary

# Download Excel
http://localhost:3000/api/courses/export
```

---

## 📊 What's in the Excel File?

Open `data/courses.xlsx` to see:

| Column | Example |
|--------|---------|
| Title | "Python for Everybody" |
| Provider | "Coursera" |
| Category | "Programming" |
| Level | "Beginner" |
| Price | "Free" |
| Rating | 4.8 |
| URL | https://... |
| Skills | "Python, SQL, Data" |
| Certificate | "Yes" |

**And 11 more columns with complete course details!**

---

## 🎨 Customize the Demo Frontend

1. Open `demo-frontend.html` in a code editor
2. Change colors, layout, text
3. Refresh browser to see changes
4. Perfect starting point for your FYP!

---

## 🚀 Next Steps

### Today:
- ✅ Run the system
- ✅ View the Excel file
- ✅ Test the API
- ✅ Try the demo website

### This Week:
- 📝 Read `SETUP_GUIDE.md` for detailed info
- 🔑 Get YouTube API key (optional - for more courses)
- 🎨 Customize the frontend
- 📚 Add more course sources

### This Month:
- 🌐 Build production frontend (React/Next.js)
- 🤖 Add recommendation engine
- 👤 Add user accounts
- 🚀 Deploy to production

---

## 📚 Documentation Files

| File | When to Read |
|------|--------------|
| `PROJECT_SUMMARY.md` | **Start here!** Overview of everything |
| `SETUP_GUIDE.md` | Detailed setup & troubleshooting |
| `API_DOCUMENTATION.md` | Building your frontend |
| `README.md` | Project overview |
| `CLASS_CENTRAL_ANALYSIS.md` | Understanding data sources |

---

## ❓ Common Questions

**Q: Do I need MongoDB?**
A: No! Everything is stored in Excel.

**Q: Do I need a YouTube API key?**
A: Optional. Without it, you get sample data (2 courses). With it, you get real data (10-30 courses).

**Q: Can I add more course sources?**
A: Yes! Just create a new scraper in `src/scrapers/`.

**Q: Can I edit the Excel file manually?**
A: Yes! Open it in Excel and edit directly.

**Q: How do I deploy this?**
A: Deploy to Heroku, Railway, or Render. See `SETUP_GUIDE.md`.

---

## 🆘 Having Issues?

### "Cannot find module"
```bash
npm install
```

### "Port 3000 in use"
Change port in `.env` to 3001

### "Excel file not found"
```bash
npm run scrape
```

### More help?
Check `SETUP_GUIDE.md` → Troubleshooting section

---

## 🎓 Perfect for FYP!

This system is perfect for your Final Year Project because:

✅ **Real data** from 4 platforms
✅ **Professional API** with all features
✅ **Beautiful demo** included
✅ **Easy to extend** - add ML, user accounts, etc.
✅ **No complex setup** - works in 5 minutes
✅ **Portfolio-worthy** - impressive for interviews

---

## 🎉 You're Ready!

**Start now:**
```bash
npm install
npm run scrape
npm run dev
```

**Then open:** `demo-frontend.html`

**Good luck with your FYP! 🚀**
