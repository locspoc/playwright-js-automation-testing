// import { base } from '@playwright/test';
require('dotenv').config();
const base = require('@playwright/test');

exports.customtest = base.test.extend({
	testDataForOrder: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		productName: 'ZARA COAT 3',
	},
});
