import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';

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

    test('Invite button brings Organization Members section in settings.', async ({ page }) => {
        await homePage.clickInviteButton();
        const allMembersUrl = await homePage.getAllMembersUrl();
        await expect(page).toHaveURL(allMembersUrl);
    })

    test('See more button brings New Journey screen.', async ({ page }) => {
        await homePage.clickSeeMoreButton();
        const workspaceUrl = await homePage.getJourneyUrl();
        await expect(page).toHaveURL(new RegExp(workspaceUrl));
        const breadCrumb = await homePage.getBreadCrumbItemText(1);
        expect(breadCrumb).toMatch(/New journey/i);
    });
})