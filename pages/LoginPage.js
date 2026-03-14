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
        this.emailError = this.page.getByText('Invalid email address');
        this.passwordError = this.page.getByText('Password is required');
    }

    async open() {
        await this.goto('/login');
        return this;
    }

    async login() {
        const credentials = await this.getCredentials();
        await this.writePassword(credentials.login);
        await this.writePassword(credentials.password);
        await this.clickLoginButton();
    }

    async writePassword(password) {
        const value = !password?.trim() ? 'test_password' : password.trim();
        await this.sendKeys(this.passwordInput, value);
    }

    async writeEmail(email) {
        const value = !email?.trim() ? 'test@example.com' : email.trim();
        await this.sendKeys(this.emailInput, value);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickForgotButton() {
        await this.click(this.forgotButton);
    }

    async clickCreateAccountButton() {
        await this.click(this.createAccountButton);
    }

    async isShowPasswordButtonClickable() {
        return await this.isEnabled(this.seePasswordButton);
    }

    async isEmailErrorVisible() {
        return await this.isVisible(this.emailError);
    }

    async isPasswordErrorVisible() {
        return await this.isVisible(this.passwordError);
    }

    async getEmailErrorText(){
        return await this.getText(this.emailError);
    }

    async getPasswordErrorText(){
        return await this.getText(this.passwordError);
    }

}