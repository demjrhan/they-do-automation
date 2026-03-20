import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage.js';
import {LoginPage} from '../pages/LoginPage.js';
import {JourneysPage} from "../pages/JourneysPage";
import {SettingsPage} from "../pages/SettingsPage";

test.describe('Home Page Tests', () => {

    let loginPage;
    let homePage;
    let journeysPage;
    let settingsPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        journeysPage = new JourneysPage(page);
        settingsPage = new SettingsPage(page);
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

    test('If journeys count is 0, Jump right in should have Create journey button. Else should be not visible.', async ({}) => {
        await homePage.navigateToJourneys();
        const journeyCount = await journeysPage.getJourneyCount();
        await journeysPage.navigateToHome();
        const isCreateJourneyVisible = await homePage.isCreateJourneyVisible();
        if (journeyCount === 0) expect(isCreateJourneyVisible).toBeTruthy(); else expect(isCreateJourneyVisible).toBeFalsy();
    });

    test('Create a journey, and delete it all. After deleting all journeys Create journey button should appear ' +
        'on Home Page and trying to delete all should throw error.', async ({}) => {
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
    });

    /* TODO: Create new persona gives an error "There was an error while saving this persona."
        When I go to network tab and check the api response/request I can see that invalid organizationSlug error.
        However, when I directly Personas -> Create new persona this error doesn't occur.

        test('Create new persona using button Create personas under Welcome, X! section in Home Page.', async ({page}) => {
            await homePage.clickCreatePersonasButton();
            await homePage.clickCreateACustomerButton();
            const personasUrl = await homePage.getPersonasUrl();
            await expect(page).toHaveURL(personasUrl);
        })
    */

    test('Check if welcome text includes correct name of user.', async ({}) => {
        const nameFromHome = await homePage.getWelcomeName();
        await homePage.navigateToSettings();
        const nameFromSettings = await settingsPage.getFirstName();
        expect(nameFromHome).toStrictEqual(nameFromSettings);
    });

    test('Delete all journeys, create one from home page by clicking Start a journey. It should appear in Jump back in section.', async ({}) => {
        await test.step('Select all journeys and delete them. In the end return to home page.', async ({}) => {
            await homePage.navigateToJourneys();
            const journeyCount = await journeysPage.getJourneyCount();
            if (journeyCount > 0) {
                await journeysPage.deleteAllJourneys();
            } else console.log('Deleting all journeys skipped since there is no journey existing.')
            await journeysPage.navigateToHome();
        });

        await test.step('Create new journey by clicking Start a journey button. And return back to home.', async ({}) => {
            await homePage.clickStartAJourneyButton();
            await homePage.showSideBar();
            await homePage.navigateToHome();
        });

        await test.step('Check if jump back in journey count is bigger than 0.', async ({}) => {
            const count = await homePage.getJumpBackInCardCount();
            expect(count).toBeTruthy();
        })
    });

    test('Selecting template from Home Page brings the Journey creation page with correctly selected template.', async ({}) => {
        await test.step('Selecting template from the home page.', async ({}) => {
            const title = await homePage.selectRandomTemplateCardAndGetItsTitle();
            const selectedTemplateCardTitle = await journeysPage.getSelectedTemplateCardTitle();
            expect(selectedTemplateCardTitle).toBe(title);
        })
    });

    test('Initials written inside of jump back in card should match with user\'s name and surname', async ({}) => {

        await test.step('Create new journey by clicking Start a journey button. And return back to home.', async ({}) => {
            await homePage.clickStartAJourneyButton();
            await homePage.showSideBar();
            await homePage.navigateToHome();
        });

        const initialsFromHome = await homePage.getJourneyCardIconInitials();
        await homePage.navigateToSettings();
        const initialsFromSettings = await settingsPage.getInitials();
        expect(initialsFromHome).toBe(initialsFromSettings);
    })
})