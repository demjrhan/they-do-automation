import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage.js';
import {LoginPage} from '../pages/LoginPage.js';

test.describe('Home Page Tests', () => {

    let loginPage;
    let homePage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.open();
        await loginPage.login();
    })

    test('Home Page loads correctly.', async ({ page }) => {
        const workspaceUrl = await homePage.getWorkspaceUrl()
        await expect(page).toHaveURL(workspaceUrl);
    })
})