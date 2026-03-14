import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import * as helpers from "../utils/helpers.js"


test.describe('Login Page Tests', () => {

    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test('Login Page loads correctly.', async ({page}) => {
        await expect(page).toHaveURL('login');
    });

    test('Check see password button, it supposed to be not clickable without writing any password.', async ({}) => {
        const result = await loginPage.isShowPasswordButtonClickable();
        expect(result).toBeFalsy();
    });

    test('Check see password button, it supposed to be clickable after writing any password.', async ({}) => {
        await loginPage.writePassword();
        const result = await loginPage.isShowPasswordButtonClickable();
        expect(result).toBeTruthy();
    });

    test('Clicking forgot button brings forgot password page.', async ({page}) => {
        await loginPage.clickForgotButton();
        await expect(page).toHaveURL('forgot-password');
    });

    test('Clicking create account button brings forgot register page.', async ({page}) => {
        await loginPage.clickCreateAccountButton();
        await expect(page).toHaveURL('register');
    });

    test('Not submitting any credentials should trigger both validation errors.', async ({}) => {
        await loginPage.clickLoginButton();
        const isEmailErrorVisible = await loginPage.isEmailErrorVisible();
        const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
        const emailErrorText = await loginPage.getEmailErrorText();
        const passwordErrorText = await loginPage.getPasswordErrorText();

        expect(isEmailErrorVisible).toBeTruthy();
        expect(emailErrorText).toBeTruthy();
        expect(emailErrorText.toLowerCase()).toContain('email');

        expect(isPasswordErrorVisible).toBeTruthy();
        expect(passwordErrorText).toBeTruthy();
        expect(passwordErrorText.toLowerCase()).toContain('password');
    });

    test('Invalid email address should trigger validation error.', async ({}) => {
        await loginPage.writeEmail(helpers.getInvalidEmail());
        await loginPage.clickLoginButton();
        const isEmailErrorVisible = await loginPage.isEmailErrorVisible();
        const emailErrorText = await loginPage.getEmailErrorText();

        expect(isEmailErrorVisible).toBeTruthy();
        expect(emailErrorText).toBeTruthy();
        expect(emailErrorText.toLowerCase()).toContain('email');
    });

    test('Invalid password should trigger validation error.', async ({  }) => {
        await loginPage.writePassword(helpers.getInvalidPassword());
        await loginPage.clickLoginButton();
        const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
        const passwordErrorText = await loginPage.getPasswordErrorText();

        expect(isPasswordErrorVisible).toBeTruthy();
        expect(passwordErrorText).toBeTruthy();
        expect(passwordErrorText.toLowerCase()).toContain('password');
    });

    /* TODO: Even though password is validated during registration ->
        Password should be 8-72 characters long and include at least one uppercase, lowercase, number and special character.
        It is not validated on login.

        test('Valid email with invalid password should trigger only password validation error.', async ({  }) => {
            await loginPage.writeEmail(helpers.getValidEmail());
            await loginPage.writePassword(helpers.getInvalidPassword());
            await loginPage.clickLoginButton();

            const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
            const isEmailErrorVisible = await loginPage.isEmailErrorVisible();
            const passwordErrorText = await loginPage.getPasswordErrorText();

            expect(isPasswordErrorVisible).toBeTruthy();
            expect(passwordErrorText).toBeTruthy();
            expect(passwordErrorText.toLowerCase()).toContain('password');
            expect(isEmailErrorVisible).toBeFalsy();
        });
    */

    test('Invalid email with valid password should trigger only email validation error.', async ({  }) => {
        await loginPage.writeEmail(helpers.getInvalidEmail());
        await loginPage.writePassword(helpers.getValidPassword());
        await loginPage.clickLoginButton();

        const isEmailErrorVisible = await loginPage.isEmailErrorVisible();
        const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
        const emailErrorText = await loginPage.getEmailErrorText();

        expect(isEmailErrorVisible).toBeTruthy();
        expect(emailErrorText).toBeTruthy();
        expect(emailErrorText.toLowerCase()).toContain('email');
        expect(isPasswordErrorVisible).toBeFalsy();
    });

})