require('dotenv').config();
const ExcelJS = require('exceljs');

async function checkExcelFile() {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('./data/courses.xlsx');

        const worksheet = workbook.getWorksheet('Courses');

        console.log('='.repeat(60));
        console.log('EXCEL FILE ANALYSIS');
        console.log('='.repeat(60));
        console.log(`Total Rows: ${worksheet.rowCount}`);
        console.log(`Total Columns: ${worksheet.columnCount}`);
        console.log('='.repeat(60));

        console.log('\nFirst 5 rows:');
        let rowNum = 0;
        worksheet.eachRow((row, index) => {
            if (index <= 5) {
                console.log(`\nRow ${index}:`);
                row.eachCell((cell, colNum) => {
                    console.log(`  Col ${colNum}: ${cell.value}`);
                });
            }
            rowNum++;
        });

        console.log('\n' + '='.repeat(60));
        console.log(`Total rows processed: ${rowNum}`);
        console.log('='.repeat(60));

        // Count courses by provider
        const providers = {};
        worksheet.eachRow((row, index) => {
            if (index > 1) {
                const provider = row.getCell(4).value;
                if (provider) {
                    providers[provider] = (providers[provider] || 0) + 1;
                }
            }
        });

        console.log('\nCourses by Provider:');
        Object.entries(providers).forEach(([provider, count]) => {
            console.log(`  ${provider}: ${count} courses`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

checkExcelFile();
