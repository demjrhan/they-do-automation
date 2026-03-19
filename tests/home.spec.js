import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage.js';
import {LoginPage} from '../pages/LoginPage.js';
import {JourneysPage} from "../pages/JourneysPage";

test.describe('Home Page Tests', () => {

    let loginPage;
    let homePage;
    let journeysPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        journeysPage = new JourneysPage(page);
        await loginPage.open();
        await loginPage.login();
    })

    test('Home Page loads correctly.', async ({page}) => {
        const workspaceUrl = await homePage.getWorkspaceUrl()
        await expect(page).toHaveURL(workspaceUrl);
    })

    test('Invite button brings Organization Members section in settings.', async ({page}) => {
        await homePage.clickInviteButton();
        const allMembersUrl = await homePage.getAllMembersUrl();
        await expect(page).toHaveURL(allMembersUrl);
    })

    test('See more button brings New Journey screen.', async ({page}) => {
        await homePage.clickSeeMoreButton();
        const workspaceUrl = await homePage.getJourneyUrl();
        await expect(page).toHaveURL(new RegExp(workspaceUrl));
        const breadCrumb = await homePage.getBreadCrumbItemText(1);
        expect(breadCrumb).toMatch(/New journey/i);
    });

    test('If journeys count is 0, Jump right in should have Create journey button. Else should be not visible.', async ({page}) => {
        await homePage.navigateToJourneys();
        const journeyCount = await journeysPage.getJourneyCount();
        await journeysPage.navigateToHome();
        const isCreateJourneyVisible = await homePage.isCreateJourneyVisible();
        if (journeyCount === 0) expect(isCreateJourneyVisible).toBeTruthy();
        else expect(isCreateJourneyVisible).toBeFalsy();
    });

    test.only('Create a journey, and delete it all. After deleting all journeys Create journey button should appear on Home Page and trying to delete all should throw error.', async ({page}) => {
        await test.step('Create a journey and navigate back journeys page.', async ({}) => {
            await homePage.navigateToJourneys();
            await journeysPage.clickCreateJourneyButton();
            await journeysPage.showSideBar();
            await journeysPage.navigateToJourneys();
        });
        await test.step('Select all journeys and delete them. In the end return to home page.', async ({}) => {
            await journeysPage.deleteAllJourneys();
            await journeysPage.navigateToHome();
        });
        await test.step('Since all journeys deleted, Create Journey button should be visible.', async ({}) => {
            const isCreateJourneyVisible = await homePage.isCreateJourneyVisible();
            expect(isCreateJourneyVisible).toBeTruthy();
        })
    })
})