const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');

test('log in to SauceDemo using credentials shown on the page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginWithVisibleCredentials();
  await inventoryPage.expectLoaded();
});
