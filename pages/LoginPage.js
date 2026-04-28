const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.gotoHome();
    await this.loginButton.waitFor();
  }

  async getVisibleCredentials() {
    const pageText = await this.getBodyText();
    const usernameMatch = pageText.match(/Accepted usernames are:\s*([^\s]+)/i);
    const passwordMatch = pageText.match(/Password for all users:\s*([^\s]+)/i);

    if (!usernameMatch || !passwordMatch) {
      throw new Error('Could not find the SauceDemo credentials on the page.');
    }

    return {
      username: usernameMatch[1],
      password: passwordMatch[1],
    };
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.expectUrl(/inventory\.html/);
  }

  async loginWithVisibleCredentials() {
    const credentials = await this.getVisibleCredentials();
    await this.login(credentials.username, credentials.password);
  }
}

module.exports = { LoginPage };
