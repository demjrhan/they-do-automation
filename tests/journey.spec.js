import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {HomePage} from "../pages/HomePage";
import {JourneysPage} from "../pages/JourneysPage";
import {SettingsPage} from "../pages/SettingsPage";

test.describe('Journey Page Tests', () => {

    let loginPage;
    let homePage;
    let journeysPage;
    let settingsPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        journeysPage = new JourneysPage(page);
        settingsPage = new SettingsPage(page);

        await journeysPage.open();
        await loginPage.login();
    })

    test('X Journeys count matches with actual journey item count', async () => {
        const journeyCountFromTitle = await journeysPage.getJourneyCountFromTitle();
        const journeyCountFromList = await journeysPage.getJourneyCountFromList();
        expect(journeyCountFromList).toBe(Number(journeyCountFromTitle));
    });

    test('X Journeys selected count from bulk edit bar matches with actual journey item count', async () => {
        const journeyCountFromTitle = await journeysPage.getJourneyCountFromTitle();
        await journeysPage.selectAllJourneys();
        const journeyCountFromBulkEditBar = await journeysPage.getJourneyCountFromBulkEditBar();
        expect(journeyCountFromTitle).toBe(journeyCountFromBulkEditBar);

    });
});
