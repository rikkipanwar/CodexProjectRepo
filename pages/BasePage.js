const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async expectUrl(urlPattern) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async getBodyText() {
    return this.page.locator('body').innerText();
  }
}

module.exports = { BasePage };
