// @ts-check

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  timeout: 30_000,
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
