import 'dotenv/config';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = this.page.getByLabel('Email input');
        this.passwordInput = this.page.getByLabel('Password input');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }
    async open() {
        await this.goto('/');
        return this;
    }
    getCredentials() {
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;
        return { login, password };
    }
    async login() {
        const credentials = this.getCredentials();
        await this.sendKeys(this.emailInput, credentials.login);
        await this.sendKeys(this.passwordInput, credentials.password);
        await this.click(this.loginButton);
    }
}