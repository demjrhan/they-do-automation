import {BasePage} from "./BasePage";


export class SettingsPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebarAccountLink = this.page.getByRole('link', {name: 'Account'});
        this.firstNameField = this.page.getByRole('textbox', {name: 'First name'});
        this.lastNameField = this.page.getByRole('textbox', {name: 'Last name'});
        this.jobTitle = this.page.getByRole('textbox', {name: 'Job title'});
    }

    async navigateToAccount(){
        await this.click(this.sidebarAccountLink);
    }
    async getFirstName(){
        await this.navigateToAccount();
        return await this.getInputValue(this.firstNameField);
    }
    async getLastName(){
        await this.navigateToAccount();
        return await this.getInputValue(this.lastNameField);
    }
    async getJobTitle(){
        await this.navigateToAccount();
        return await this.getInputValue(this.jobTitle);
    }
}