const { test, expect } = require('@playwright/test');

test('Browser Context Page Declaration Playwright test', async ({
	browser,
}) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	console.log(await page.title());
	await page.locator('#username').fill('loctran');
	await page.locator("[type='password']").fill('learning');
	await page.locator('#signInBtn').click();
});

test('Page Context Page Declaration Playwright test', async ({ page }) => {
	await page.goto('https://google.com');
	console.log(await page.title());
	await expect(page).toHaveTitle('Google');
});
