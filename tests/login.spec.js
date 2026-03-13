import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";


test.describe('Login Page Tests', () => {

    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    })

    test('Login Page loads correctly.', async ({page}) => {
        await expect(page).toHaveURL('login');
    })

    test('Check see password button, it supposed to be not clickable without writing any password.', async ({page}) => {
        const result = await loginPage.isShowPasswordButtonClickable();
        expect(result).toBeFalsy();
    })

})