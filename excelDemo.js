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

// let output = { row: -1, column: -1 };

async function writeExcelTest(searchText, replaceText, change, filePath) {
	const workbook = new ExcelJs.Workbook();
	await workbook.xlsx.readFile(filePath);
	const worksheet = workbook.getWorksheet('Sheet1');
	const output = await readExcel(worksheet, searchText);
	const cell = worksheet.getCell(
		output.row,
		output.column + change.colChange
	);
	cell.value = replaceText;
	await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
	let output = { row: -1, column: -1 };
	worksheet.eachRow((row, rowNumber) => {
		row.eachCell((cell, colNumber) => {
			if (cell.value === searchText) {
				// console.log('rowNumber: ', rowNumber);
				// console.log('colNumber: ', colNumber);
				output.column = colNumber;
				output.row = rowNumber;
			}
		});
	});
	return output;
}

// Update Mango price to 350
writeExcelTest(
	'Mango',
	350,
	{ rowChange: 0, colChange: 2 },
	'./excelDownloadTest.xlsx'
);
