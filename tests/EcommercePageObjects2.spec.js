// import { test } from '@playwright/test';
// import { customtest, expect } from '../utils/test-base';

const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');

const dataset = JSON.parse(
	JSON.stringify(require('../utils/PlaceOrderTestData.json'))
);
const { POManager } = require('../pageObjects/POManager');

customtest.only(
	`Add To Cart -> Checkout -> Place Order for: customtest`,
	async ({ page, testDataForOrder }) => {
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

		// Dashboard
		const dashboardPage = poManager.getDashboardPage();
		await dashboardPage.searchProductAddCart(testDataForOrder.productName);
		await dashboardPage.navigateToCart();

		// Cart Page
		const cartPage = poManager.getCartPage();
		await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
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
		console.log('orderId: ', orderId);
		console.log(
			'ordersHistoryPage.getOrderId(): ',
			ordersHistoryPage.getOrderId()
		);
		expect(
			orderId.includes(await ordersHistoryPage.getOrderId())
		).toBeTruthy();
	}
);
