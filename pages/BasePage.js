import 'dotenv/config';

export class BasePage {
    constructor(page) {
        this.page = page;
        this.defaultTimeout = 5000;
        this.sidebarHomeLink = this.page.getByRole('link', {name: 'Home'});
        this.sidebarJourneysLink = this.page.getByRole('link', {name: 'Journeys'});
        this.sidebarPersonasLink = this.page.getByRole('link', {name: 'Personas'});
        this.sidebarMetricsLink = this.page.getByRole('link', {name: 'Metrics'});
        this.sidebarSettingsLink = this.page.getByRole('link', {name: 'Settings'});
        this.showSideBarButton = this.page.locator('[aria-label="Show sidebar"]');
        this.hideSideBarButton = this.page.locator('[aria-label="Hide navigation sidebar"]');
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
        return {login, password};
    }

    async getOrganizationName() {
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

    find(selector, nth = 0) {
        return this.page.locator(selector).nth(nth);
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

    async findElementPresence(selector, nth = 0) {
        const loc = this.toLocator(selector).nth(nth);
        await loc.waitFor({state: 'attached', timeout: this.defaultTimeout});
        return loc;
    }

    async findElementVisibility(selector, nth = 0) {
        const loc = this.toLocator(selector).nth(nth);
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

    async waitUntilElementVisibility(selector, nth = 0) {
        await this.toLocator(selector).nth(nth).waitFor({state: 'visible', timeout: this.defaultTimeout});
        return this;
    }

    async waitUntilElementInvisibility(selector, nth = 0) {
        await this.toLocator(selector).nth(nth).waitFor({state: 'hidden', timeout: this.defaultTimeout});
        return this;
    }

    async waitUntilElementPresence(selector, nth = 0) {
        await this.toLocator(selector).nth(nth).waitFor({state: 'attached', timeout: this.defaultTimeout});
        return this;
    }

    async waitUntilExists(selector) {
        await this.waitUntilElementPresence(selector);
        return this;
    }

    async waitUntilExistsInside(parentSelector, childSelector, nth = 0) {
        await this.waitUntilElementPresence(parentSelector);
        const childLocator = this.toLocator(parentSelector).locator(childSelector).nth(nth);
        await this.waitUntilElementPresence(childLocator);
        return this;
    }

    async clearTextField(locator, nth = 0) {
        const el = this.toLocator(locator).nth(nth);
        await el.fill('');
        return this;
    }

    async sendKeys(selector, text, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementVisibility(el);
        await el.fill('');
        await el.fill(text);
        return this;
    }

    async sendEnter(selector, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementVisibility(el);
        await el.press('Enter');
        return this;
    }

    async sendTab(selector, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementVisibility(el);
        await el.press('Tab');
        return this;
    }

    async sendSpace(selector, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementVisibility(el);
        await el.press('Space');
        return this;
    }

    async click(selector, nth = 0) {
        await this.waitUntilElementVisibility(selector, nth);
        const loc = this.toLocator(selector).nth(nth);
        await this.scrollToElement(loc);
        await loc.click();
        return this;
    }

    async dragAndDrop(fromSelector, toSelector, fromNth = 0, toNth = 0) {
        const from = this.toLocator(fromSelector).nth(fromNth);
        const to = this.toLocator(toSelector).nth(toNth);
        await this.waitUntilElementVisibility(from);
        await this.waitUntilElementVisibility(to);
        await from.dragTo(to);
        return this;
    }

    async scrollToElement(selector, nth = 0) {
        const loc = this.toLocator(selector).nth(nth);
        await loc.scrollIntoViewIfNeeded();
        return this;
    }

    async scrollToElementSmooth(selector, nth = 0) {
        const loc = this.toLocator(selector).nth(nth);
        await loc.evaluate((el) => el.scrollIntoView({behavior: 'smooth'}));
        return this;
    }

    async getText(selector, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementPresence(el);
        return (await el.textContent()).trim();
    }

    async getInputValue(selector, nth = 0) {
        const el = this.toLocator(selector).nth(nth);
        await this.waitUntilElementPresence(el);
        return (await el.inputValue()).trim();
    }

    async getTextInside(parentLocator, childSelector, nth = 0) {
        const child = this.toLocator(parentLocator).locator(childSelector).nth(nth);
        return (await child.textContent()).trim();
    }

    async findInside(parentLocator, childSelector, nth = 0) {
        return this.toLocator(parentLocator).locator(childSelector).nth(nth);
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

    async count(selector) {
        const locator = this.toLocator(selector);
        await this.waitUntilElementVisibility(locator);
        return locator.count();
    }

    async isExists(selector) {
        try {
            return (await this.toLocator(selector).count()) > 0;
        } catch {
            return false;
        }
    }

    async isVisible(selector, nth = 0) {
        try {
            return await this.toLocator(selector).nth(nth).isVisible();
        } catch {
            return false;
        }
    }

    async isEnabled(selector, nth = 0) {
        try {
            return await this.toLocator(selector).nth(nth).isEnabled();
        } catch {
            return false;
        }
    }

    async isSelected(selector, nth = 0) {
        try {
            return await this.toLocator(selector).nth(nth).isChecked();
        } catch {
            return false;
        }
    }

    /* Breadcrumb */
    async getBreadCrumbItemText(index) {
        let breadCrumbItemLocator = `[data-e2e-id='breadcrumbs-item-${index}']`;
        return await this.getText(breadCrumbItemLocator);
    }

    /* Sidebar */
    async showSideBar(){
        await this.click(this.showSideBarButton);
    }

    async hideSideBar(){
        await this.click(this.hideSideBarButton);
    }

    async navigateToHome() {
        await this.click(this.sidebarHomeLink);
    }

    async navigateToJourneys() {
        await this.click(this.sidebarJourneysLink);
    }

    async navigateToPersonas() {
        await this.click(this.sidebarPersonasLink);
    }

    async navigateToMetrics() {
        await this.click(this.sidebarMetricsLink);
    }

    async navigateToSettings(){
        await this.click(this.sidebarSettingsLink);
    }
}
