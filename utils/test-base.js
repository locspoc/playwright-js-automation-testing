const { base } = require('@playwright/test');

exports.test = base.test.extend({
	testDataForOrder: {
		username: 'anshika@gmail.com',
		password: 'Iamking@000',
		productName: 'ZARA COAT 3',
	},
});
