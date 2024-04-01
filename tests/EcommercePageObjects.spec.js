const { test, expect } = require('@playwright/test');

const { POManager } = require('../pageObjects/POManager');

test('Add To Cart -> Checkout example', async ({ page }) => {
	// Page Objects Manager
	const poManager = new POManager(page);

	// Login
	const username = 'anshika@gmail.com';
	const password = 'Iamking@000';
	const productName = 'ZARA COAT 3';
	const products = page.locator('.card-body');
	const loginPage = poManager.getLoginPage();
	await loginPage.goTo();
	await loginPage.validLogin(username, password);

	// Dashboard
	const dashboardPage = poManager.getDashboardPage();
	await dashboardPage.searchProductAddCart(productName);
	await dashboardPage.navigateToCart();

	// Cart Page
	const cartPage = poManager.getCartPage();
	await cartPage.VerifyProductIsDisplayed(productName);
	await cartPage.Checkout();

	// Order Reviews Page
	const ordersReviewPage = poManager.getOrdersReviewPage();
	await ordersReviewPage.searchCountryAndSelect('ind', 'India');
	const orderId = await ordersReviewPage.SubmitAndGetOrderId();
	console.log('orderId: ', orderId);

	// Order History Page
	await dashboardPage.navigateToOrders();
	const ordersHistoryPage = poManager.getOrdersHistoryPage();
	await ordersHistoryPage.searchOrderAndSelect(orderId);
	expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
