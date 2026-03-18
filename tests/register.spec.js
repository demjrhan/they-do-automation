import { expect, test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage.js";
import * as helpers from "../utils/helpers.js";

test.describe('Register Page Tests', () => {

    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.open();
    });

    test('Register Page loads correctly.', async ({ page }) => {
        await expect(page).toHaveURL('register');
    });

    test('Check see password button, it supposed to be not clickable without writing any password.', async () => {
        const result = await registerPage.isShowPasswordButtonClickable();
        expect(result).toBeFalsy();
    });

    test('Check see password button, it supposed to be clickable after writing any password.', async () => {
        await registerPage.writePassword(helpers.getValidPassword());
        const result = await registerPage.isShowPasswordButtonClickable();
        expect(result).toBeTruthy();
    });

    test('Create account button should not be clickable when no credentials are entered.', async () => {
        const isCreateAccountClickable = await registerPage.isEnabled(registerPage.createAccountButton);
        expect(isCreateAccountClickable).toBeFalsy();
    });

    test('Create account button should be clickable after entering valid credentials.', async () => {
        await registerPage.writeEmail(helpers.getValidEmail());
        await registerPage.writePassword(helpers.getValidPassword());
        const isCreateAccountClickable = await registerPage.isEnabled(registerPage.createAccountButton);
        expect(isCreateAccountClickable).toBeTruthy();
    });

    test('Valid email with invalid password should trigger only password validation error.', async () => {
        await registerPage.writeEmail(helpers.getValidEmail());
        await registerPage.writePassword(helpers.getInvalidPassword());

        const isPasswordErrorVisible = await registerPage.isPasswordErrorVisible();
        const isEmailErrorVisible = await registerPage.isEmailErrorVisible();
        const passwordErrorText = await registerPage.getPasswordErrorText();

        expect(isPasswordErrorVisible).toBeTruthy();
        expect(passwordErrorText).toBeTruthy();
        expect(passwordErrorText.toLowerCase()).toContain('password');
        expect(isEmailErrorVisible).toBeFalsy();
    });

    /* Defect. Even though only email field contains wrong input, both validations rise an error. */
    test('Invalid email with valid password should trigger only email validation error.', async () => {
        await registerPage.writeEmail(helpers.getInvalidEmail());
        await registerPage.writePassword(helpers.getValidPassword());

        const isEmailErrorVisible = await registerPage.isEmailErrorVisible();
        const isPasswordErrorVisible = await registerPage.isPasswordErrorVisible();
        const emailErrorText = await registerPage.getEmailErrorText();

        expect(isEmailErrorVisible).toBeTruthy();
        expect(emailErrorText).toBeTruthy();
        expect(emailErrorText.toLowerCase()).toContain('email');
        expect(isPasswordErrorVisible).toBeFalsy();
    });
});