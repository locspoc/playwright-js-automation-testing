const { test, expect } = require('@playwright/test');

test('Browser Context-Validating Error login', async ({ page }) => {
	const productName = 'ZARA COAT 3';
	const products = page.locator('.card-body');
	await page.goto('https://www.rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill('anshika@gmail.com');
	await page.locator('#userPassword').fill('Iamking@000');
	await page.locator('[value="Login"]').click();
	// await page.waitForLoadState('networkidle');
	await page.locator('.card-body b').first().waitFor();
	const titles = await page.locator('.card-body b').allTextContents();
	console.log(titles);
	const count = await products.count();
	for (let i = 0; i < count; i++) {
		if (
			(await products.nth(i).locator('b').textContent()) === productName
		) {
			// add to cart
			await products.nth(i).locator('text= Add To Cart').click();
			// await page.pause();
			break;
		}
		// await page.pause();
	}

	await page.locator("[routerlink*='/dashboard/cart']").click();
	// await page.pause();
	await page.locator('div li').first().waitFor();
	// await page.pause();
	const bool = page.locator('h3:has-text("ZARA COAT 3")').isVisible();
	expect(bool).toBeTruthy();
	await page.locator('text=Checkout').click();
	await page.locator("[placeholder*='Country']").pressSequentially('ind');
	const dropdown = page.locator('.ta-results');
	await dropdown.waitFor();
	await dropdown.locator('button').count();
	const optionsCount = await dropdown.locator('buttons').count();
	for (let i = 0; i < optionsCount; i++) {
		const text = await dropdown.locator('button').nth(i).textContent();
		if (text === ' India') {
			await dropdown.locator('button').nth(i).click();
			// await page.pause();
			break;
		}
	}
});
