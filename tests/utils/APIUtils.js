class APIUtils {
	constructor(apiContext, loginPayLoad) {
		this.apiContext = apiContext;
		this.loginPayLoad = loginPayLoad;
	}

	async getToken() {
		const loginResponse = await apiContext.post(
			'https://rahulshettyacademy.com/api/ecom/auth/login',
			{
				data: this.loginPayLoad,
			}
		); // 200,201,202
		// expect(loginResponse.ok()).toBeTruthy();
		const loginResponseJson = await loginResponse.json();
		token = loginResponseJson.token;
		console.log('token: ', token);
		return token;
	}

	async createOrder(orderPayLoad) {
		const orderResponse = await apiContext.post(
			'https://rahulshettyacademy.com/api/ecom/order/create-order',
			{
				data: orderPayLoad,
				headers: {
					Authorization: this.getToken(),
					'Content-Type': 'application/json',
				},
			}
		);
		const orderResponseJson = await orderResponse.json();
		console.log('orderResponseJson: ', orderResponseJson);
		orderId = orderResponseJson.orders[0];
		return orderId;
	}
}

module.exports = { APIUtils };
