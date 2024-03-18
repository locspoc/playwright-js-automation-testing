const { test, expect } = require('@playwright/test');

test.only('Browser Context Page Declaration Playwright test', async ({
	browser,
}) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	console.log(await page.title());
	const userName = page.locator('#username');
	const passWord = page.locator("[type='password']");
	const signIn = page.locator('#signInBtn');
	await userName.fill('rahulshetty');
	await passWord.fill('learning');
	await signIn.click();
	console.log(await page.locator("[style*='block']").textContent());
	// await expect(page.locator("[style*='block']")).toHaveText('[Incorrect]');
	await userName.fill('');
	await userName.fill('rahulshettyacademy');
	await passWord.fill('');
	await passWord.fill('learning');
	await signIn.click();
	console.log(await page.locator('.card-body a').first().textContent());
	console.log(await page.locator('.card-body a').nth(0).textContent());
	console.log(await page.locator('.card-body a').nth(1).textContent());
});

test('Page Context Page Declaration Playwright test', async ({ page }) => {
	await page.goto('https://google.com');
	console.log(await page.title());
	await expect(page).toHaveTitle('Google');
});
