import {BasePage} from "./BasePage";

export class JourneysPage extends BasePage {
    constructor(page) {
        super(page);
        this.journeyCountTitle = this.page.locator('[data-e2e-id=section-header__title]');
        this.selectAllJourneysButton = this.page.locator('[aria-label="Select all"]');
        this.deSelectAllJourneysButton = this.page.locator('[aria-label="Deselect all"]');
        this.deleteAllJourneysButton = this.page.locator('[aria-label="Delete"]');
        this.confirmDeleteAllButton = this.page.locator('[data-e2e-id="molecule-popover__confirm-entity-delete-button"]');
        this.cancelDeleteAllButton = this.page.getByRole('button', {name: 'Cancel'}); // Cancel button doesn't have data-e2e-id property
        this.createJourneyButton = this.page.locator('[data-e2e-id="journey-overview__create-button"]')

    }

    async getJourneyCount() {
        let journeyCountRaw = await this.getText(this.journeyCountTitle);
        return journeyCountRaw.split(' ').at(0);
    }

    async selectAllJourneys() {
        const journeyCount = await this.getJourneyCount();
        if (journeyCount === 0) throw new Error('No journeys found.');
        else await this.click(this.selectAllJourneysButton);
    }

    async deselectAllJourneysButton() {
        const isDeselectAllJourneysButtonVisible = this.isVisible(this.deselectAllJourneysButton);
        if (!isDeselectAllJourneysButtonVisible) throw new Error('Deselect all journeys button not available. Make sure select all journeys first.');
        else await this.click(this.deSelectAllJourneysButton);
    }

    async clickDeleteAllJourneysButton() {
        await this.click(this.deleteAllJourneysButton);
    }

    async clickConfirmDeleteAllButton() {
        await this.click(this.confirmDeleteAllButton);
    }

    async clickCancelDeleteAllButton() {
        await this.click(this.cancelDeleteAllButton);
    }

    async clickCreateJourneyButton() {
        await this.click(this.createJourneyButton);
    }

    async deleteAllJourneys() {
        await this.selectAllJourneys();
        await this.clickDeleteAllJourneysButton();
        await this.clickConfirmDeleteAllButton();
    }
}