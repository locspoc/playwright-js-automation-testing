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
	let output = { row: -1, column: -1 };
	const workbook = new ExcelJs.Workbook();
	await workbook.xlsx.readFile('./excelDownloadTest.xlsx');
	const worksheet = workbook.getWorksheet('Sheet1');
	worksheet.eachRow((row, rowNumber) => {
		row.eachCell((cell, colNumber) => {
			if (cell.value === 'Banana') {
				// console.log('rowNumber: ', rowNumber);
				// console.log('colNumber: ', colNumber);
				output.column = colNumber;
				output.row = rowNumber;
			}
		});
	});
	const cell = worksheet.getCell(output.row, output.column);
	cell.value = 'Republic';
	workbook.xlsx.writeFile('./excelDownloadTest.xlsx');
}
excelTest();
