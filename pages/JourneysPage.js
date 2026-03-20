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
        this.createJourneyButton = this.page.locator('[data-e2e-id="journey-overview__create-button"]');
        this.templateCard = this.page.locator('[data-e2e-id="template-selector-item"]');
        this.selectedTemplateCard = this.page.locator('[data-e2e-id="template-selector-item"].is-selected');
        this.templateCardList = this.page.locator('[data-e2e-id="journey-default-templates-list"]');
        this.journeyItem = this.page.locator('[data-e2e-id="organism-table__row-wrap"]');
        this.journeySelectedTextBulkEditBar = this.page.locator('[data-e2e-id="bulk-edit-bar__label"]');
    }

    async open() {
        const path = await this.getJourneyUrl();
        this.page.goto(path)
    }

    async getJourneyCountFromTitle() {
        let journeyCountRaw = await this.getText(this.journeyCountTitle);
        return journeyCountRaw.split(' ').at(0);
    }

    async getJourneyCountFromList() {
        return await this.count(this.journeyItem);
    }

    async getJourneyCountFromBulkEditBar() {
        let journeyCountRaw = await this.getText(this.journeySelectedTextBulkEditBar);
        return journeyCountRaw.split(' ').at(0);
    }

    async selectAllJourneys() {
        await this.click(this.selectAllJourneysButton);
    }

    async deselectAllJourneys() {
        await this.click(this.deSelectAllJourneysButton);
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

    async selectRandomTemplateCardAndGetItsTitle() {
        const templateCount = await this.count(this.templateCard);
        const randomNumber = Math.floor(Math.random() * templateCount);
        const title = await this.getText(this.templateCard, randomNumber);
        return title.replace('TheyDo', '');
    }

    async getSelectedTemplateCardTitle() {
        const title = await this.getText(this.selectedTemplateCard);
        return title.replace('TheyDo', '');
    }
}