const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItemNames = page.locator('.cart_item .inventory_item_name');
  }

  async expectLoaded() {
    await this.expectUrl(/cart\.html/);
  }

  async expectProductName(productName) {
    await expect(this.cartItemNames).toHaveText(productName);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
    await this.expectUrl(/checkout-step-one\.html/);
  }
}

module.exports = { CartPage };
