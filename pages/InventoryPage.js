const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await this.expectUrl(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async getFirstProductName() {
    return this.inventoryItems.first().locator('.inventory_item_name').innerText();
  }

  async addFirstProductToCart() {
    await this.inventoryItems.first().locator('button').click();
    await expect(this.shoppingCartBadge).toHaveText('1');
  }
}

module.exports = { InventoryPage };
