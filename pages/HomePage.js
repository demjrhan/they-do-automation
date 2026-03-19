import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    constructor(page){
        super(page);
        this.inviteButton = this.page.getByRole('button', { name: 'Invite' });
        this.seeMoreButton = this.page.getByRole('button', { name: 'See more' });
        this.viewAllButton = this.page.getByRole('button', { name: 'View all' });
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

    async clickInviteButton(){
        await this.click(this.inviteButton);
    }

    async clickSeeMoreButton(){
        await this.click(this.seeMoreButton);
    }

    async clickViewAllButton(){
        await this.click(this.viewAllButton);
    }

    async getBreadCrumbItemText(index){
        let breadCrumbItemLocator = `[data-e2e-id='breadcrumbs-item-${index}']`;
        return await this.getText(breadCrumbItemLocator);
    }
}