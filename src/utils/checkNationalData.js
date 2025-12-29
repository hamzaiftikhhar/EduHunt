const ExcelJS = require('exceljs');
const path = require('path');

async function checkHeaders() {
    const filePath = path.join(__dirname, '../../data/National_scholarships_data.xlsx');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const headers = worksheet.getRow(1).values;

    console.log('National Data Headers:', JSON.stringify(headers));
}

checkHeaders().catch(console.error);
