import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = this.page.getByLabel('Email input');
        this.passwordInput = this.page.getByLabel('Password input');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.seePasswordButton = this.page.getByLabel('Show');
        this.forgotButton = this.page.getByRole('link', { name: 'Forgot' });
        this.createAccountButton = this.page.getByRole('link', { name: 'Create Account' });
    }
    async open() {
        await this.goto('/login');
        return this;
    }

    async writePassword(password) {
        const value = !password?.trim() ? 'test_password' : password.trim();
        await this.sendKeys(this.passwordInput, value);
    }

    async writeEmail(email) {
        const value = !email?.trim() ? 'test@example.com' : email.trim();
        await this.sendKeys(this.emailInput, value);
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

    async clickForgotButton() {
        await this.click(this.forgotButton);
    }

    async clickCreateAccountButton() {
        await this.click(this.createAccountButton);
    }
}