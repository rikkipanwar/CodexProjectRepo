const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutInformationPage } = require('./pages/CheckoutInformationPage');

test.describe('SauceDemo negative', () => {
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

  test('@negative checkout cannot continue with empty information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await loginPage.goto();
    await loginPage.loginWithVisibleCredentials();
    await inventoryPage.expectLoaded();

    await inventoryPage.addFirstProductToCart();
    await inventoryPage.shoppingCartLink.click();
    await cartPage.expectLoaded();
    await cartPage.goToCheckout();

    await checkoutInformationPage.expectLoaded();
    await checkoutInformationPage.fillInformation('', '', '');
    await checkoutInformationPage.continueButton.click();
    await checkoutInformationPage.expectErrorMessage('Error: First Name is required');
  });
});
