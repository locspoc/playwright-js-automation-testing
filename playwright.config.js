// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	/* Test directory - where are your tests? */
	testDir: './tests',
	retries: 2,
	workers: 3,
	/* Maximum time one test can run for. */
	// timeout: 100 * 1000, // for debugging
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		browserName: 'chromium',
		headless: false,
		screenshot: 'on', // on, off, only-on-failure
		// trace: 'on',
		trace: 'on', // on, off, retain-on-failure
	},
});
