import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.inviteButton = this.page.getByRole('button', {name: 'Invite'});
        this.seeMoreButton = this.page.getByRole('button', {name: 'See more'});
        this.viewAllButton = this.page.getByRole('button', {name: 'View all'});
        this.createJourneyButton = this.page.getByRole('button', {name: 'Create journey'});
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
        const organizationName = await this.getOrganizationName();
        return '/' + organizationName + '/settings/users';
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
}