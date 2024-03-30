const { test, expect, request } = require('@playwright/test');

const { APIUtils } = require('./utils/APIUtils');

const loginPayLoad = {
	userEmail: 'anshika@gmail.com',
	userPassword: 'Iamking@000',
};
const orderPayLoad = {
	orders: [
		{
			country: 'India',
			productOrderedId: '6581ca399fd99c85e8ee7f45',
		},
	],
};
const fakePayLoadOrders = { data: [], message: 'No Orders' };

let response;
// let token;

test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const apiUtils = new APIUtils(apiContext, loginPayLoad);
	response = await apiUtils.createOrder(orderPayLoad);
});

// test.beforeEach(() => {});

test('Add To Cart -> Checkout example', async ({ page }) => {
	page.addInitScript((value) => {
		window.localStorage.setItem('token', value);
	}, response.token);
	await page.goto('https://rahulshettyacademy.com/client/');
	await page.route(
		'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
		async (route) => {
			// intercepting response - API response->{ playwright fakeresponse }->browser->render data on front end
			const response = await page.request.fetch(route.request());
			let body = JSON.stringify(fakePayLoadOrders);
			route.fulfill({
				response,
				body,
			});
		}
	);
	await page.locator("button[routerlink*='/dashboard/myorders']").click();
	// await page.pause();
	await page.waitForResponse(
		'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
	);
	// await page.waitForURL(
	// 	'https://rahulshettyacademy.com/client/dashboard/myorders'
	// );
	// await page.pause();
	// await page.locator('tbody').waitFor();
	// const rows = await page.locator('tbody tr');
	console.log(await page.locator('.mt-4').textContent());
});
