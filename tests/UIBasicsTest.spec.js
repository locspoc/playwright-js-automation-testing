const { test, expect } = require('@playwright/test');

test('Browser Context-Validating Error login', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	console.log(await page.title());
	const userName = page.locator('#username');
	const passWord = page.locator("[type='password']");
	const signIn = page.locator('#signInBtn');
	const cardTitles = page.locator('.card-body a');
	await userName.fill('rahulshetty');
	await passWord.fill('learning');
	await signIn.click();
	console.log(await page.locator("[style*='block']").textContent());
	await expect(page.locator("[style*='block']")).toContainText('Incorrect');
	await userName.fill('');
	await userName.fill('rahulshettyacademy');
	await passWord.fill('');
	await passWord.fill('learning');
	await signIn.click();
	console.log(await cardTitles.first().textContent());
	console.log(await cardTitles.nth(0).textContent());
	console.log(await cardTitles.nth(1).textContent());
	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);
});

test('Page Context Page Declaration Playwright test', async ({ page }) => {
	await page.goto('https://google.com');
	console.log(await page.title());
	await expect(page).toHaveTitle('Google');
});
