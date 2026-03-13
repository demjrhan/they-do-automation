import 'dotenv/config';

export class BasePage {
  constructor(page) {
      this.page = page;
      this.defaultTimeout = 5000;
  }

  async goto(url) {
      await this.page.goto(url);
      return this;
  }

  async refresh() {
      await this.page.reload();
      return this;
  }

  async getCredentials() {
      const login = process.env.LOGIN;
      const password = process.env.PASSWORD;
      return { login, password };
  }

  async getOrganizationName(){
    return process.env.ORGANIZATION;
  }

  locator(selector) {
      return this.page.locator(selector);
  }

  toLocator(selectorOrLocator) {
      return typeof selectorOrLocator === 'string'
          ? this.locator(selectorOrLocator)
          : selectorOrLocator;
  }

  find(selector) {
      return this.page.locator(selector).first();
  }

  findAll(selector) {
      return this.page.locator(selector);
  }

  async acceptAllCookies() {
      const button = this.page.locator();
      try {
          await this.waitUntilElementVisibility();
          await button.click();
      } catch {
          // Popup not visible, already accepted or any other error occurred.
      }
      return this;
  }

  async findElementPresence(selector) {
      const loc = this.toLocator(selector).first();
      await loc.waitFor({state: 'attached', timeout: this.defaultTimeout});
      return loc;
  }

  async findElementVisibility(selector) {
      const loc = this.toLocator(selector).first();
      await loc.waitFor({state: 'visible', timeout: this.defaultTimeout});
      return loc;
  }

  async findElementsPresence(selector) {
      const loc = this.toLocator(selector);
      await loc.first().waitFor({state: 'attached', timeout: this.defaultTimeout});
      return loc;
  }

  async findElementsVisibility(selector) {
      const loc = this.toLocator(selector);
      await loc.first().waitFor({state: 'visible', timeout: this.defaultTimeout});
      return loc;
  }

  async waitUntilElementVisibility(selector) {
      await this.toLocator(selector).first().waitFor({state: 'visible', timeout: this.defaultTimeout});
      return this;
  }

  async waitUntilElementInvisibility(selector) {
      await this.toLocator(selector).first().waitFor({state: 'hidden', timeout: this.defaultTimeout});
      return this;
  }

  async waitUntilElementPresence(selector) {
      await this.toLocator(selector).first().waitFor({state: 'attached', timeout: this.defaultTimeout});
      return this;
  }

  async waitUntilExists(selector) {
      await this.waitUntilElementPresence(selector);
      return this;
  }

  async waitUntilExistsInside(parentSelector, childSelector) {
      await this.waitUntilElementPresence(parentSelector);
      await this.toLocator(parentSelector).locator(childSelector).first().waitFor({
          state: 'attached', timeout: this.defaultTimeout
      });
      return this;
  }

  async clearTextField(locator) {
      const el = this.toLocator(locator).first();
      await el.fill('');
      return this;
  }

  async sendKeys(selector, text) {
      const el = this.toLocator(selector).first();
      await el.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await el.fill('');
      await el.fill(text);
      return this;
  }

  async sendEnter(selector) {
      const el = this.toLocator(selector).first();
      await el.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await el.press('Enter');
      return this;
  }

  async sendTab(selector) {
      const el = this.toLocator(selector).first();
      await el.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await el.press('Tab');
      return this;
  }

  async sendSpace(selector) {
      const el = this.toLocator(selector).first();
      await el.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await el.press('Space');
      return this;
  }

  async click(selector) {
      const loc = this.toLocator(selector).first();
      await this.scrollToElement(loc);
      await loc.click();
      return this;
  }

  async dragAndDrop(fromSelector, toSelector) {
      const from = this.toLocator(fromSelector).first();
      const to = this.toLocator(toSelector).first();
      await from.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await to.waitFor({state: 'visible', timeout: this.defaultTimeout});
      await from.dragTo(to);
      return this;
  }

  async scrollToElement(selector) {
      const loc = this.toLocator(selector).first();
      await loc.scrollIntoViewIfNeeded();
      return this;
  }

  async scrollToElementSmooth(selector) {
      const loc = this.toLocator(selector).first();
      await loc.evaluate((el) => el.scrollIntoView({behavior: 'smooth'}));
      return this;
  }

  async getText(selector) {
      const el = this.toLocator(selector).first();
      await el.waitFor({state: 'attached', timeout: this.defaultTimeout});
      return (await el.textContent()).trim();
  }

  async getTextInside(parentLocator, childSelector) {
      const child = this.toLocator(parentLocator).locator(childSelector).first();
      return (await child.textContent()).trim();
  }

  findInside(parentLocator, childSelector) {
      return this.toLocator(parentLocator).locator(childSelector).first();
  }

  async existsInside(parentLocator, childSelector) {
      try {
          return (await this.toLocator(parentLocator).locator(childSelector).count()) > 0;
      } catch {
          return false;
      }
  }

  async hasChildElements(parentLocator, childSelector = '> div') {
      const items = this.toLocator(parentLocator).locator(childSelector);
      return (await items.count()) > 0;
  }

  async isExists(selector) {
      try {
          return (await this.toLocator(selector).count()) > 0;
      } catch {
          return false;
      }
  }

  async isVisible(selector) {
      try {
          return await this.toLocator(selector).first().isVisible();
      } catch {
          return false;
      }
  }

  async isEnabled(selector) {
      try {
          return await this.toLocator(selector).first().isEnabled();
      } catch {
          return false;
      }
  }

  async isSelected(selector) {
      try {
          return await this.toLocator(selector).first().isChecked();
      } catch {
          return false;
      }
  }
}
