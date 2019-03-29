import { $, $$, ElementFinder, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { logger } from '../../support/logger'

export class MagentoAdminLogin {
    private url: string = "index.php/admin/admin";
    private usernameInput: ElementFinder;
    private passwordInput: ElementFinder;
    private signInButton: ElementFinder;
    private messageError: ElementFinder;

    constructor() {
        this.usernameInput = $('#username');
        this.passwordInput = $('#login');
        this.signInButton = $('button.action-login.action-primary');
        this.messageError = $('div.message.message-error.error');
    };

    async navigateTo() {
        BrowserActions.get(this.url)
    };

    async logIn(username: string, password: string) {
        await Actions.sendKeys(this.usernameInput, username);
        await Actions.sendKeys(this.passwordInput, password);
        await Actions.click(this.signInButton);
    };

    async getErrorMessage() {
        let text = await this.messageError.getText();
        logger.debug("Text: " + text);
        return text;
    }

    async isErrorMessageVisible() {
        return await this.messageError.isPresent();
    }
}
