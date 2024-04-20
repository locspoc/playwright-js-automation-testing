const { chromium } = require('@playwright/test');
const {
	Before,
	BeforeStep,
	After,
	AfterStep,
	Status,
} = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');

Before(async function () {
	const browser = await chromium.launch({ headless: false });
	const context = await browser.newContext();
	this.page = await context.newPage();

	// Page Objects Manager
	this.poManager = new POManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function ({ result }) {
	if (result.status === Status.FAILED) {
		await this.page.screenshot({ path: 'screenshot1.png' });
	}
});

After(function () {
	console.log('I am the last to execute');
});
