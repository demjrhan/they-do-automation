import { expect, test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import * as helpers from "../utils/helpers.js"

test.describe('Register Page Tests', () => {

    let registerPage;

    test.beforeEach( async({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.open();
    })

    test('Register Page loads correctly', async ({ page }) => {
        await expect(page).toHaveURL('register');
    })

})