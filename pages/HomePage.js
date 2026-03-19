import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.inviteButton = this.page.getByRole('button', {name: 'Invite'});
        this.seeMoreButton = this.page.getByRole('button', {name: 'See more'});
        this.viewAllButton = this.page.getByRole('button', {name: 'View all'});

        /* This button represents the button in Jump back in section. */
        this.createJourneyButton = this.page.getByRole('button', {name: 'Create journey'});

         /* These buttons belong to the 3 button group below the Welcome, X! section.
         * createACustomerButton is follow up button after clicking Create personas button.
         */
        this.createPersonasButton = this.page.locator('[data-e2e-id="dashboard-overview__add-personas"]');
        this.createACustomerButton = this.page.getByRole('button', {name: 'Create a customer'});
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

    async getPersonasUrl(){
        const organizationName = await this.getWorkspaceUrl();
        return organizationName + '/persona';

    }

    async isCreateJourneyVisible(){
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

    async clickCreateACustomerButton() {
        await this.click(this.createACustomerButton);
    }
}