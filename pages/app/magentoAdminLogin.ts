import {$, $$, ElementFinder, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";


export class MagentoAdminLogin {
    static url: string = "index.php/admin/admin";
    private usernameInput: ElementFinder;
    private passwordInput: ElementFinder;
    private signInButton: ElementFinder;

    constructor() {
        this.usernameInput = $('#username');
        this.passwordInput = $('#login');
        this.signInButton = $('button.action-login.action-primary');
    };

    async logIn (username: string, password: string) {
        await Actions.sendKeys(this.usernameInput, username);
        await Actions.sendKeys(this.passwordInput, password);
        await Actions.click(this.signInButton);
    };
}
