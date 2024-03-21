const { test, expect } = require('@playwright/test');

test.only('Browser Context-Validating Error login', async ({ page }) => {
	await page.goto('https://www.rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill('anshika@gmail.com');
	await page.locator('#userPassword').fill('Iamking@000');
	await page.locator('[value="Login"]').click();
	// await page.waitForLoadState('networkidle');
	await page.locator('.card-body b').first().waitFor();
	const titles = await page.locator('.card-body b').allTextContents();

	console.log(titles);
});
