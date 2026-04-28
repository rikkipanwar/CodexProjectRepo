const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.completeHeader = page.locator('.complete-header');
  }

  async expectLoaded() {
    await this.expectUrl(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutCompletePage };
