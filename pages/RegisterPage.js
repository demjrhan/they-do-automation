import { BasePage } from "./BasePage";


export class RegisterPage extends BasePage {

    constructor(page) {
        super(page);
    }

    async open() {
        await this.goto('/register');
        return this;
    }

}