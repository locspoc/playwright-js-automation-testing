const { test, expect } = require('@playwright/test');

test.only('Browser Context-Validating Error login', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	page.route('**/*.css', (route) => route.abort());
	page.route('**/*.{jpg,png,jpeg}', (route) => route.abort());
	page.on('request', (request) => console.log(request.url()));
	page.on('response', (response) =>
		console.log(response.url(), response.status())
	);
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

test('UI Controls', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	const userName = page.locator('#username');
	const passWord = page.locator("[type='password']");
	const signIn = page.locator('#signInBtn');
	const documentLink = page.locator("[href*='documents-request']");
	const dropdown = page.locator('select.form-control');
	await dropdown.selectOption('consult');
	await page.locator('.radiotextsty').last().click();
	await page.locator('#okayBtn').click();
	console.log(await page.locator('.radiotextsty').last().isChecked());
	await expect(page.locator('.radiotextsty').last()).toBeChecked();
	await page.locator('#terms').click();
	await expect(page.locator('#terms')).toBeChecked();
	await page.locator('#terms').uncheck();
	expect(await page.locator('#terms').isChecked()).toBeFalsy();
	await expect(documentLink).toHaveAttribute('class', 'blinkingText');
	// await page.pause();
});

test('Child windows handle', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	const userName = page.locator('#username');
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
	const documentLink = page.locator("[href*='documents-request']");
	const [newPage, newPage2] = await Promise.all([
		context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
		documentLink.click(),
	]); // new page opened
	// newPage2.click(); for when there is multiple tabs
	const text = await newPage.locator('.red').textContent();
	const arrayText = text.split('@');
	const domain = arrayText[1].split(' ')[0];
	console.log(domain);
	await page.locator('#username').fill(domain);
	// await page.pause();
	console.log(await page.locator('#username').textContent());
});

test('codegen test', async ({ page }) => {
	await page.goto('https://www.google.com/');
	await page.getByLabel('Search', { exact: true }).fill('loc tran');
	await page.goto('https://loctran.com.au/');
});
