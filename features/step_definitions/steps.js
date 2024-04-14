const { When, Then, Given } = require('@cucumber/cucumber');
const { test, expect, playwright } = require('@playwright/test');

const { POManager } = require('../../pageObjects/POManager');

Given(
	'A login to Ecommerce application with {username} and {password}',
	async function (username, password) {
		//
		const browser = await playwright.chromium.launch();
		const context = await browser.newContext();
		const page = await context.newPage();

		// Page Objects Manager
		const poManager = new POManager(page);

		// Login
		const products = page.locator('.card-body');
		const loginPage = poManager.getLoginPage();
		await loginPage.goTo();
		await loginPage.validLogin(
			testDataForOrder.username,
			testDataForOrder.password
		);
	}
);

When('Add {string} to Cart', async function (string) {
	// Dashboard
	const dashboardPage = poManager.getDashboardPage();
	await dashboardPage.searchProductAddCart(testDataForOrder.productName);
	await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (string) {
	// Cart Page
	const cartPage = poManager.getCartPage();
	await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
	await cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function (string) {
	// Order Reviews Page
	const ordersReviewPage = poManager.getOrdersReviewPage();
	await ordersReviewPage.searchCountryAndSelect('ind', 'India');
	const orderId = await ordersReviewPage.SubmitAndGetOrderId();
	console.log('orderId: ', orderId);
});

Then('Verify order is presnt in the OrderHistory', async function (string) {
	// Order History Page
	await dashboardPage.navigateToOrders();
	const ordersHistoryPage = poManager.getOrdersHistoryPage();
	await ordersHistoryPage.searchOrderAndSelect(orderId);
	console.log('orderId: ', orderId);
	console.log(
		'ordersHistoryPage.getOrderId(): ',
		ordersHistoryPage.getOrderId()
	);
	expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
