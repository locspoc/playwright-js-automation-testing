const { When, Then, Given } = require('@cucumber/cucumber');
const { test, expect, playwright, chromium } = require('@playwright/test');
// const { chromium } = require('playwright-chromium');

const { POManager } = require('../../pageObjects/POManager');

Given(
	'A login to Ecommerce application with {string} and {string}',
	{ timeout: 100 * 1000 },
	async function (username, password) {
		// Login
		const products = await this.page.locator('.card-body');
		const loginPage = await this.poManager.getLoginPage();
		await loginPage.goTo();
		await loginPage.validLogin(username, password);
	}
);

When('Add {string} to Cart', async function (productName) {
	// Dashboard
	this.dashboardPage = this.poManager.getDashboardPage();
	await this.dashboardPage.searchProductAddCart(productName);
	await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
	// Cart Page
	this.cartPage = this.poManager.getCartPage();
	// await this.cartPage.VerifyProductIsDisplayed(productName);
});

When(
	'Enter valid details and Place the Order',
	{ timeout: 100 * 1000 },
	async function (string) {
		// Order Reviews Page
		await this.cartPage.Checkout();
		const ordersReviewPage = this.poManager.getOrdersReviewPage();
		await ordersReviewPage.searchCountryAndSelect('ind', 'India');
		this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
		console.log('this.orderId: ', this.orderId);
	}
);

Then('Verify order is present in the OrderHistory', async function (string) {
	// Order History Page
	await this.dashboardPage.navigateToOrders();
	const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
	await ordersHistoryPage.searchOrderAndSelect(this.orderId);
	console.log('this.orderId: ', this.orderId);
	console.log(
		'ordersHistoryPage.getOrderId(): ',
		ordersHistoryPage.getOrderId()
	);
	expect(
		this.orderId.includes(await ordersHistoryPage.getOrderId())
	).toBeTruthy();
});

Given(
	'A login to Ecommerce2 application with {string} and {string}',
	async function (username, password) {
		await this.page.goto(
			'https://rahulshettyacademy.com/loginpagePractise/'
		);
		console.log(await this.page.title());
		const userName = this.page.locator('#username');
		const passWord = this.page.locator("[type='password']");
		const signIn = this.page.locator('#signInBtn');
		const cardTitles = this.page.locator('.card-body a');
		await userName.fill(username);
		await passWord.fill(password);
		await signIn.click();
	}
);

Then('Verify Error message is displayed', async function () {
	console.log(await this.page.locator("[style*='block']").textContent());
	await expect(this.page.locator("[style*='block']")).toContainText(
		'Incorrect'
	);
});
