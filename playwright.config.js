// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 90000,
  /* Run tests in parallel with maximum number of workers */
  workers: process.env.CI ? 1 : undefined, // Use 1 in CI environments, otherwise use default (CPU/2)
  /* Retry failed tests to verify if they're truly flaky */
  retries: 1,
  /* Reporter to use. */
  reporter: 'html',
  /* Global expect timeout for assertions */
  expect: {
    timeout: 20000,
  },
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationexercise.com',
    
    /* Collect trace and screenshots only when a test fails. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
    /* Increased timeouts for improved stability */
    navigationTimeout: 45000,
    actionTimeout: 30000,
    
    /* Viewport size for more reliable element visibility */
    viewport: { width: 1280, height: 800 },
    
    /* Small delay between actions for more reliable automation */
    launchOptions: {
      slowMo: 200,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* Additional options to improve browser stability */
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--disable-features=BlockInsecurePrivateNetworkRequests'
          ]
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

