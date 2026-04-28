const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutInformationPage } = require('./pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('./pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('./pages/CheckoutCompletePage');

test('add the first SauceDemo product to cart and complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.loginWithVisibleCredentials();
  await inventoryPage.expectLoaded();

  const productName = await inventoryPage.getFirstProductName();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.shoppingCartLink.click();

  await cartPage.expectLoaded();
  await cartPage.expectProductName(productName);
  await cartPage.goToCheckout();

  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.fillInformation('Rikki', 'Panwar', '250001');
  await checkoutInformationPage.continue();

  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectProductName(productName);
  await checkoutOverviewPage.finish();

  await checkoutCompletePage.expectLoaded();
});
