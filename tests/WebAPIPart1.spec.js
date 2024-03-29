const { test, expect, request } = require('@playwright/test');
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

let orderId;
let token;

test.beforeAll(async () => {
	const apiContext = await request.newContext();
	const loginResponse = await apiContext.post(
		'https://rahulshettyacademy.com/api/ecom/auth/login',
		{
			data: loginPayLoad,
		}
	); // 200,201,202
	expect(loginResponse.ok()).toBeTruthy();
	const loginResponseJson = await loginResponse.json();
	token = loginResponseJson.token;
	console.log('token: ', token);
	const orderResponse = await apiContext.post(
		'https://rahulshettyacademy.com/api/ecom/order/create-order',
		{
			data: orderPayLoad,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
	const orderResponseJson = await orderResponse.json();
	console.log('orderResponseJson: ', orderResponseJson);
	orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {});

test('Add To Cart -> Checkout example', async ({ page }) => {
	page.addInitScript((value) => {
		window.localStorage.setItem('token', value);
	}, token);

	// await page.goto('https://www.rahulshettyacademy.com/client');
	// await page.locator('#userEmail').fill(email);
	// await page.locator('#userPassword').fill('Iamking@000');
	// await page.locator('[value="Login"]').click();
	// await page.waitForLoadState('networkidle');

	const email = 'anshika@gmail.com';
	const productName = 'ZARA COAT 3';
	await page.goto('https://rahulshettyacademy.com/client/');
	// const products = page.locator('.card-body');
	// await page.locator('.card-body b').first().waitFor();
	// const titles = await page.locator('.card-body b').allTextContents();
	// console.log(titles);
	// const count = await products.count();
	// for (let i = 0; i < count; i++) {
	// 	if (
	// 		(await products.nth(i).locator('b').textContent()) === productName
	// 	) {
	// 		// add to cart
	// 		await products.nth(i).locator('text= Add To Cart').click();
	// 		// await page.pause();
	// 		break;
	// 	}
	// 	// await page.pause();
	// }
	// await page.locator("[routerlink*='/dashboard/cart']").click();
	// // await page.pause();
	// await page.locator('div li').first().waitFor();
	// // await page.pause();
	// const bool = page.locator('h3:has-text("ZARA COAT 3")').isVisible();
	// expect(bool).toBeTruthy();
	// await page.locator('text=Checkout').click();
	// // check email address
	// // select country
	// await page.locator("[placeholder*='Country']").pressSequentially('ind');
	// const dropdown = page.locator('.ta-results');
	// console.log('dropdown: ', dropdown);
	// // await page.pause();
	// await dropdown.waitFor();
	// await dropdown.locator('button').count();
	// console.log('button count: ', await dropdown.locator('button').count());
	// // await page.pause();
	// const optionsCount = await dropdown.locator('button').count();
	// console.log('optionsCount: ', optionsCount);
	// for (let i = 0; i < optionsCount; i++) {
	// 	const text = await dropdown.locator('button').nth(i).textContent();
	// 	console.log('text: ', text);
	// 	if (text === ' India') {
	// 		await dropdown.locator('button').nth(i).click();
	// 		// await page.pause();
	// 		break;
	// 	}
	// }
	// // await page.pause();
	// await page.locator('.action__submit').click();
	// await expect(page.locator('.hero-primary')).toHaveText(
	// 	' Thankyou for the order. '
	// );
	// const orderId = await page
	// 	.locator('.em-spacer-1 .ng-star-inserted')
	// 	.textContent();
	// console.log('orderId: ', orderId);
	// await page.pause();
	await page.locator("button[routerlink*='/dashboard/myorders']").click();
	await page.locator('tbody').waitFor();
	const rows = await page.locator('tbody tr');
	for (let i = 0; i < (await rows.count()); i++) {
		const rowOrderId = await rows.nth(i).locator('th').textContent();
		if (orderId.includes(rowOrderId)) {
			await rows.nth(i).locator('button').first().click();
			break;
		}
	}
	await page.locator('.col-text').textContent();
	const orderIdDetails = await page.locator('.col-text').textContent();
	await page.pause();
	expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

// Verify if order created is showing in history page
// Precondition - create order -
