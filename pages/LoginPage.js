import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = this.page.getByLabel('Email input');
        this.passwordInput = this.page.getByLabel('Password input');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.seePasswordButton = this.page.getByLabel('Show');
    }
    async open() {
        await this.goto('/login');
        return this;
    }

    async login() {
        const credentials = await this.getCredentials();
        await this.sendKeys(this.emailInput, credentials.login);
        await this.sendKeys(this.passwordInput, credentials.password);
        await this.click(this.loginButton);
    }
    async isShowPasswordButtonClickable() {
        return await this.isEnabled(this.seePasswordButton);
    }
}