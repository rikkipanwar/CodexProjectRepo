const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');

test.describe('SauceDemo login', () => {
  test('@smoke @positive log in to SauceDemo using credentials shown on the page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.loginWithVisibleCredentials();
    await inventoryPage.expectLoaded();
  });

  test('@negative invalid credentials show login error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitLogin('wrong_user', 'wrong_password');
    await loginPage.expectErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('@negative locked out user cannot log in', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitLogin('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });
});
