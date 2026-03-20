import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.inviteButton = this.page.getByRole('button', {name: 'Invite'});
        this.seeMoreButton = this.page.getByRole('button', {name: 'See more'});
        this.viewAllButton = this.page.getByRole('button', {name: 'View all'});
        this.welcomeTitle = this.page.locator('[data-e2e-id="dashboard-overview__onboarding-welcome"]')

        this.jumpBackInCard = this.page.locator('[data-e2e-id="journey-dashboard__recently-worked-on-journey__card"]');
        this.jumpBackInCardIconInitials = this.page.locator('[data-e2e-id="user-avatar"]');

        /* This button represents the button in Jump back in section. */
        this.createJourneyButton = this.page.getByRole('button', {name: 'Create journey'});

        /* These buttons belong to the 3 button group below the Welcome, X! section.
        * createACustomerButton is follow up button after clicking Create personas button.
        */
        this.createPersonasButton = this.page.locator('[data-e2e-id="dashboard-overview__add-personas"]');
        this.createACustomerButton = this.page.getByRole('button', {name: 'Create a customer'});
        this.startAJourneyButton = this.page.locator('[data-e2e-id="dashboard-overview__create-journey"]');

        /* This locator represents Start with a template sections template cards. */
        this.templateCard = this.page.locator('[data-e2e-id="template-card__content"]')

    }

    async getWorkspaceUrl() {
        const organizationName = await this.getOrganizationName();
        return '/' + organizationName + '/workspace';
    }

    async getJourneyUrl() {
        const organizationName = await this.getWorkspaceUrl();
        return organizationName + '/journey';
    }

    async getAllMembersUrl() {
        const organizationName = await this.getWorkspaceUrl();
        return organizationName + '/settings/users';
    }

    async getPersonasUrl() {
        const organizationName = await this.getWorkspaceUrl();
        return organizationName + '/persona';

    }

    async getWelcomeName() {
        const fullWelcomeText = await this.getText(this.welcomeTitle);
        return fullWelcomeText.split(',').at(1).replace('!', '').trim();
    }

    async getJumpBackInCardCount() {
        return await this.count(this.jumpBackInCard);
    }

    async getJourneyCardIconInitials(){
        return await this.getText(this.jumpBackInCardIconInitials);
    }

    async isCreateJourneyVisible() {
        return await this.isVisible(this.createJourneyButton);
    }

    async clickInviteButton() {
        await this.click(this.inviteButton);
    }

    async clickSeeMoreButton() {
        await this.click(this.seeMoreButton);
    }

    async clickViewAllButton() {
        await this.click(this.viewAllButton);
    }

    async clickCreateJourneyButton() {
        await this.click(this.createJourneyButton);
    }

    async clickCreatePersonasButton() {
        await this.click(this.createPersonasButton);
    }

    /* This button is visible after clicking create personas button. */
    async clickCreateACustomerButton() {
        await this.click(this.createACustomerButton);
    }

    async clickStartAJourneyButton() {
        await this.click(this.startAJourneyButton);
    }

    async selectRandomTemplateCardAndGetItsTitle() {
        const templateCount = await this.count(this.templateCard);
        const randomNumber = Math.floor(Math.random() * templateCount);
        const title = await this.getText(this.templateCard, randomNumber);
        await this.click(this.templateCard, randomNumber);
        return title.replace('TheyDo', '');
    }
}