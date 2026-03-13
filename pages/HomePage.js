import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    constructor(page){
        super(page);
    }
    async getWorkspaceUrl() {
        const organizationName = await this.getOrganizationName();
        return '/' + organizationName + '/workspace';
    }

}