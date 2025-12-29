const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

class ExcelManager {
    constructor() {
        this.filePath = process.env.EXCEL_FILE_PATH || './data/courses.xlsx';
        this.ensureDirectoryExists();
    }

    ensureDirectoryExists() {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    async initializeWorkbook() {
        const workbook = new ExcelJS.Workbook();

        // Create worksheet
        const worksheet = workbook.addWorksheet('Courses');

        // Define columns
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Title', key: 'title', width: 50 },
            { header: 'Description', key: 'description', width: 80 },
            { header: 'Provider', key: 'provider', width: 20 },
            { header: 'Instructor', key: 'instructor', width: 30 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Subcategory', key: 'subcategory', width: 20 },
            { header: 'Level', key: 'level', width: 15 },
            { header: 'Price', key: 'price', width: 10 },
            { header: 'Original Price', key: 'originalPrice', width: 15 },
            { header: 'Rating', key: 'rating', width: 10 },
            { header: 'Enrollments', key: 'enrollments', width: 15 },
            { header: 'Duration', key: 'duration', width: 15 },
            { header: 'Language', key: 'language', width: 15 },
            { header: 'Thumbnail', key: 'thumbnail', width: 50 },
            { header: 'URL', key: 'url', width: 80 },
            { header: 'Skills', key: 'skills', width: 50 },
            { header: 'Certificate', key: 'certificate', width: 12 },
            { header: 'Last Updated', key: 'lastUpdated', width: 20 },
            { header: 'Scraped At', key: 'scrapedAt', width: 20 }
        ];

        // Style header row
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF667EEA' }
        };
        worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

        return workbook;
    }

    async loadWorkbook() {
        try {
            if (fs.existsSync(this.filePath)) {
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.readFile(this.filePath);
                return workbook;
            } else {
                return await this.initializeWorkbook();
            }
        } catch (error) {
            console.error('Error loading workbook:', error);
            return await this.initializeWorkbook();
        }
    }

    async saveCourses(courses) {
        try {
            const workbook = await this.loadWorkbook();
            let worksheet = workbook.getWorksheet('Courses');

            // If worksheet doesn't exist or doesn't have columns, initialize it
            if (!worksheet || !worksheet.columns || worksheet.columns.length === 0) {
                if (worksheet) {
                    workbook.removeWorksheet(worksheet.id);
                }
                worksheet = workbook.addWorksheet('Courses');

                // Define columns
                worksheet.columns = [
                    { header: 'ID', key: 'id', width: 10 },
                    { header: 'Title', key: 'title', width: 50 },
                    { header: 'Description', key: 'description', width: 80 },
                    { header: 'Provider', key: 'provider', width: 20 },
                    { header: 'Instructor', key: 'instructor', width: 30 },
                    { header: 'Category', key: 'category', width: 20 },
                    { header: 'Subcategory', key: 'subcategory', width: 20 },
                    { header: 'Level', key: 'level', width: 15 },
                    { header: 'Price', key: 'price', width: 10 },
                    { header: 'Original Price', key: 'originalPrice', width: 15 },
                    { header: 'Rating', key: 'rating', width: 10 },
                    { header: 'Enrollments', key: 'enrollments', width: 15 },
                    { header: 'Duration', key: 'duration', width: 15 },
                    { header: 'Language', key: 'language', width: 15 },
                    { header: 'Thumbnail', key: 'thumbnail', width: 50 },
                    { header: 'URL', key: 'url', width: 80 },
                    { header: 'Skills', key: 'skills', width: 50 },
                    { header: 'Certificate', key: 'certificate', width: 12 },
                    { header: 'Last Updated', key: 'lastUpdated', width: 20 },
                    { header: 'Scraped At', key: 'scrapedAt', width: 20 }
                ];

                // Style header row
                worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
                worksheet.getRow(1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF667EEA' }
                };
            }

            // Get existing URLs to avoid duplicates (using column number 16 for URL)
            const existingUrls = new Set();
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { // Skip header
                    const urlValue = row.getCell(16).value; // Column 16 is URL
                    if (urlValue) existingUrls.add(urlValue);
                }
            });

            let addedCount = 0;
            let updatedCount = 0;

            for (const course of courses) {
                const courseData = {
                    id: course.id || this.generateId(),
                    title: course.title,
                    description: course.description,
                    provider: course.provider,
                    instructor: course.instructor || 'Unknown',
                    category: course.category,
                    subcategory: course.subcategory || '',
                    level: course.level || 'All Levels',
                    price: course.price || 'Free',
                    originalPrice: course.originalPrice || 0,
                    rating: course.rating || 0,
                    enrollments: course.enrollments || 0,
                    duration: course.duration || 'Self-paced',
                    language: course.language || 'English',
                    thumbnail: course.thumbnail || '',
                    url: course.url,
                    skills: Array.isArray(course.skills) ? course.skills.join(', ') : course.skills || '',
                    certificate: course.certificate ? 'Yes' : 'No',
                    lastUpdated: course.lastUpdated || new Date().toISOString(),
                    scrapedAt: new Date().toISOString()
                };

                if (existingUrls.has(course.url)) {
                    // Update existing course
                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber > 1 && row.getCell(16).value === course.url) {
                            row.getCell(1).value = courseData.id;
                            row.getCell(2).value = courseData.title;
                            row.getCell(3).value = courseData.description;
                            row.getCell(4).value = courseData.provider;
                            row.getCell(5).value = courseData.instructor;
                            row.getCell(6).value = courseData.category;
                            row.getCell(7).value = courseData.subcategory;
                            row.getCell(8).value = courseData.level;
                            row.getCell(9).value = courseData.price;
                            row.getCell(10).value = courseData.originalPrice;
                            row.getCell(11).value = courseData.rating;
                            row.getCell(12).value = courseData.enrollments;
                            row.getCell(13).value = courseData.duration;
                            row.getCell(14).value = courseData.language;
                            row.getCell(15).value = courseData.thumbnail;
                            row.getCell(16).value = courseData.url;
                            row.getCell(17).value = courseData.skills;
                            row.getCell(18).value = courseData.certificate;
                            row.getCell(19).value = courseData.lastUpdated;
                            row.getCell(20).value = courseData.scrapedAt;
                            updatedCount++;
                        }
                    });
                } else {
                    // Add new course using column numbers
                    const newRow = worksheet.addRow([]);
                    newRow.getCell(1).value = courseData.id;
                    newRow.getCell(2).value = courseData.title;
                    newRow.getCell(3).value = courseData.description;
                    newRow.getCell(4).value = courseData.provider;
                    newRow.getCell(5).value = courseData.instructor;
                    newRow.getCell(6).value = courseData.category;
                    newRow.getCell(7).value = courseData.subcategory;
                    newRow.getCell(8).value = courseData.level;
                    newRow.getCell(9).value = courseData.price;
                    newRow.getCell(10).value = courseData.originalPrice;
                    newRow.getCell(11).value = courseData.rating;
                    newRow.getCell(12).value = courseData.enrollments;
                    newRow.getCell(13).value = courseData.duration;
                    newRow.getCell(14).value = courseData.language;
                    newRow.getCell(15).value = courseData.thumbnail;
                    newRow.getCell(16).value = courseData.url;
                    newRow.getCell(17).value = courseData.skills;
                    newRow.getCell(18).value = courseData.certificate;
                    newRow.getCell(19).value = courseData.lastUpdated;
                    newRow.getCell(20).value = courseData.scrapedAt;
                    newRow.commit();
                    existingUrls.add(course.url);
                    addedCount++;
                }
            }

            await workbook.xlsx.writeFile(this.filePath);
            console.log(`✅ Excel updated: ${addedCount} added, ${updatedCount} updated`);
            return { added: addedCount, updated: updatedCount };

        } catch (error) {
            console.error('❌ Error saving courses to Excel:', error);
            throw error;
        }
    }

    async getAllCourses() {
        try {
            const workbook = await this.loadWorkbook();
            const worksheet = workbook.getWorksheet('Courses');

            if (!worksheet || worksheet.rowCount <= 1) {
                return [];
            }

            const courses = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { // Skip header
                    try {
                        courses.push({
                            id: row.getCell(1).value,
                            title: row.getCell(2).value,
                            description: row.getCell(3).value,
                            provider: row.getCell(4).value,
                            instructor: row.getCell(5).value,
                            category: row.getCell(6).value,
                            subcategory: row.getCell(7).value,
                            level: row.getCell(8).value,
                            price: row.getCell(9).value,
                            originalPrice: row.getCell(10).value,
                            rating: row.getCell(11).value,
                            enrollments: row.getCell(12).value,
                            duration: row.getCell(13).value,
                            language: row.getCell(14).value,
                            thumbnail: row.getCell(15).value,
                            url: row.getCell(16).value,
                            skills: row.getCell(17).value,
                            certificate: row.getCell(18).value === 'Yes',
                            lastUpdated: row.getCell(19).value,
                            scrapedAt: row.getCell(20).value
                        });
                    } catch (err) {
                        // Skip invalid rows
                    }
                }
            });

            return courses;
        } catch (error) {
            console.error('Error reading courses from Excel:', error);
            return [];
        }
    }

    generateId() {
        return `COURSE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    async getStats() {
        const courses = await this.getAllCourses();

        const stats = {
            totalCourses: courses.length,
            freeCourses: courses.filter(c => c.price === 'Free').length,
            providers: [...new Set(courses.map(c => c.provider))],
            categories: [...new Set(courses.map(c => c.category))]
        };

        return stats;
    }
}

module.exports = new ExcelManager();
