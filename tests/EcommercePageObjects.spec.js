const { test, expect } = require('@playwright/test');

const dataset = JSON.parse(
	JSON.stringify(require('../utils/PlaceOrderTestData.json'))
);
const { POManager } = require('../pageObjects/POManager');

for (const data of dataset) {
	test(`@Ecommerce Add To Cart -> Checkout -> Place Order for: ${data.productName}`, async ({
		page,
	}) => {
		// Page Objects Manager
		const poManager = new POManager(page);

		// Login
		const products = page.locator('.card-body');
		const loginPage = poManager.getLoginPage();
		await loginPage.goTo();
		await loginPage.validLogin(data.username, data.password);

		// Dashboard
		const dashboardPage = poManager.getDashboardPage();
		await dashboardPage.searchProductAddCart(data.productName);
		await dashboardPage.navigateToCart();

		// Cart Page
		const cartPage = poManager.getCartPage();
		await cartPage.VerifyProductIsDisplayed(data.productName);
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
		expect(
			orderId.includes(await ordersHistoryPage.getOrderId())
		).toBeTruthy();
	});
}
