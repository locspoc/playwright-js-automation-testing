const { When, Then, Given } = require('@cucumber/cucumber');
const { test, expect, playwright, chromium } = require('@playwright/test');
// const { chromium } = require('playwright-chromium');

const { POManager } = require('../../pageObjects/POManager');

Given(
	'A login to Ecommerce application with {string} and {string}',
	{ timeout: 100 * 1000 },
	async function (username, password) {
		const browser = await chromium.launch();
		const context = await browser.newContext();
		this.page = await context.newPage();

		// Page Objects Manager
		this.poManager = new POManager(this.page);

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
	const cartPage = this.poManager.getCartPage();
	await cartPage.VerifyProductIsDisplayed(productName);
	await cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function (string) {
	// Order Reviews Page
	const ordersReviewPage = this.poManager.getOrdersReviewPage();
	await ordersReviewPage.searchCountryAndSelect('ind', 'India');
	const orderId = await ordersReviewPage.SubmitAndGetOrderId();
	console.log('orderId: ', orderId);
});

Then('Verify order is present in the OrderHistory', async function (string) {
	// Order History Page
	await this.dashboardPage.navigateToOrders();
	const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
	await ordersHistoryPage.searchOrderAndSelect(orderId);
	console.log('orderId: ', orderId);
	console.log(
		'ordersHistoryPage.getOrderId(): ',
		ordersHistoryPage.getOrderId()
	);
	expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
