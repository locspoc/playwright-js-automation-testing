const { test, expect } = require('@playwright/test');

test('Calendar validations', async ({ page }) => {
	const hidden = '';
	const monthNumber = '6';
	const date = '15';
	const year = '2027';
	const expectedList = [hidden, monthNumber, date, year];
	const expectedValue = '2027-06-15';
	await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
	await page.locator('.react-date-picker__inputGroup').click();
	await page.locator('.react-calendar__navigation__label').click();
	await page.locator('.react-calendar__navigation__label').click();
	await page.getByText(year).click();
	await page
		.locator('.react-calendar__year-view__months__month')
		.nth(Number(monthNumber - 1))
		.click();
	await page.locator('//abbr[text()="' + date + '"]').click();
	const inputs = await page
		.locator('.react-date-picker__inputGroup input')
		.all();
	console.log('inputs: ', inputs);
	for (let i = 0; i < inputs.length; i++) {
		const value = await inputs[i].getAttribute('value');
		console.log('i: ', i);
		console.log('value: ', value);
		console.log('expectedValue: ', expectedValue);
		if (i != 0) {
			expect(value).toEqual(expectedList[i]);
		}
	}
});
