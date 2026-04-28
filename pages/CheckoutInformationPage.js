const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutInformationPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async expectLoaded() {
    await this.expectUrl(/checkout-step-one\.html/);
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
    await this.expectUrl(/checkout-step-two\.html/);
  }

  async expectErrorMessage(message) {
    const error = this.page.locator('[data-test="error"]');
    await error.waitFor();
    await expect(error).toHaveText(message);
  }
}

module.exports = { CheckoutInformationPage };
