const ExcelJs = require('exceljs');

// const workbook = new ExcelJs.Workbook();
// workbook.xlsx.readFile('./excelDownloadTest.xlsx').then(function () {
// 	const worksheet = workbook.getWorksheet('Sheet1');
// 	worksheet.eachRow((row, rowNumber) => {
// 		row.eachCell((cell, colNumber) => {
// 			console.log(cell.value);
// 		});
// 	});
// });

async function excelTest() {
	const workbook = new ExcelJs.Workbook();
	await workbook.xlsx.readFile('./excelDownloadTest.xlsx');
	const worksheet = workbook.getWorksheet('Sheet1');
	worksheet.eachRow((row, rowNumber) => {
		row.eachCell((cell, colNumber) => {
			console.log(cell.value);
		});
	});
}
excelTest();
