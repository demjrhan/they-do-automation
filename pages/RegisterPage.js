import {BasePage} from "./BasePage";


export class RegisterPage extends BasePage {

    constructor(page) {
        super(page);
        this.emailInput = this.page.getByRole('textbox', {name: 'Work Email'});
        this.passwordInput = this.page.getByRole('textbox', {name: 'Password'});
        this.loginButton = this.page.getByRole('link', {name: 'Login'});
        this.createAccountButton = this.page.getByRole('button', {name: 'Create account'});
        this.privacyPolicy = this.page.getByRole('link', {name: 'Privacy Policy'});
        this.termsOfService = this.page.getByRole('link', {name: 'Terms of Service'});

        /*
         * .p-text-underline:nth-child(2)
         * a[href*='terms']
         * //a[contains(@href,'terms')]
         * //a[@class='p-text-underline'][2]
         * //a[text()='Terms of Service']
         */

        this.seePasswordButton = this.page.getByLabel('Show');

        /*
         * [aria-label='Show']
         * //button[@aria-label='Show']
         */

        this.emailError = this.page.getByText('Invalid email address');
        this.passwordError = this.page.getByText(/Password should be 8-72/i);

        /*
         * [data-e2e-id='register__password-field'] [data-e2e-id='form-error__text']
         * //div[@data-e2e-id='register__password-field']//p
         *
         *
         */
    }

    async open() {
        await this.goto('/register');
        return this;
    }

    async register() {
        const credentials = await this.getCredentials();
        await this.writePassword(credentials.login);
        await this.writePassword(credentials.password);
        await this.clickCreateAccountButton();
    }

    async writePassword(password) {
        const value = !password?.trim() ? 'test_password' : password.trim();
        await this.sendKeys(this.passwordInput, value);
    }

    async writeEmail(email) {
        const value = !email?.trim() ? 'test@example.com' : email.trim();
        await this.sendKeys(this.emailInput, value);
    }

    async clickPrivacyPolicyButton() {
        await this.click(this.privacyPolicy);
    }

    async clickTermsOfService() {
        await this.click(this.termsOfService);
    }

    async clickLoginButton() {
        await this.createAccountButton.click();
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

    async getEmailErrorText() {
        return await this.getText(this.emailError);
    }

    async getPasswordErrorText() {
        return await this.getText(this.passwordError);
    }
}