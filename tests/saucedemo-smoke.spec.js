const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('SauceDemo smoke', () => {
  test('@smoke valid login and add first product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.loginWithVisibleCredentials();
    await inventoryPage.expectLoaded();

    const productName = await inventoryPage.getFirstProductName();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.shoppingCartLink.click();
    await cartPage.expectLoaded();
    await cartPage.expectProductName(productName);
  });
});
