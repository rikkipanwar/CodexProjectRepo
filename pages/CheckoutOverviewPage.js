const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.productNames = page.locator('.inventory_item_name');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async expectLoaded() {
    await this.expectUrl(/checkout-step-two\.html/);
  }

  async expectProductName(productName) {
    await expect(this.productNames.first()).toHaveText(productName);
  }

  async finish() {
    await this.finishButton.click();
    await this.expectUrl(/checkout-complete\.html/);
  }
}

module.exports = { CheckoutOverviewPage };
