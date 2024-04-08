// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	/* Test directory - where are your tests? */
	testDir: './tests',
	/* Maximum time one test can run for. */
	// timeout: 100 * 1000, // for debugging
	timeout: 300 * 1000,
	expect: {
		timeout: 5000,
	},
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	projects: [
		{
			name: 'safari',
			use: {
				browserName: 'webkit',
				headless: false,
				screenshot: 'on', // on, off, only-on-failure
				// trace: 'on',
				trace: 'on', // on, off, retain-on-failure
				...devices['iPhone 11'],
			},
		},
		{
			name: 'chrome',
			use: {
				browserName: 'chromium',
				headless: false,
				screenshot: 'on', // on, off, only-on-failure
				ignoreHTTPSErrors: true,
				permissions: ['geolocation'],
				// trace: 'on',
				trace: 'on', // on, off, retain-on-failure
				// ...devices[''],
				// viewport: { width: 720, height: 720 },
			},
		},
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
});
