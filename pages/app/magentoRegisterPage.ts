import { BrowserActions } from "../../support/browser";
import { ElementFinder, $ } from "protractor";
import { Actions } from "../../support/actions";

export class MagnetoRegisterPage {
    private url = "customer/account/create/";
    private firstNameField: ElementFinder;
    private lastNameField: ElementFinder;
    private emailFielld: ElementFinder;
    private passwordField: ElementFinder;
    private confirmPasswordField: ElementFinder;
    private createAccountButton: ElementFinder;
    private passwordErrorMessage: ElementFinder;

    constructor() {
        this.firstNameField = $("#firstname");
        this.lastNameField = $("#lastname");
        this.emailFielld = $("#email_address");
        this.passwordField = $("#password");
        this.confirmPasswordField = $("#password-confirmation");
        this.createAccountButton = $("button[title='Create an Account']");
        this.passwordErrorMessage = $("#password-error");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillFirstName(name: string) {
        await Actions.sendKeys(this.firstNameField, name);
    }
    public async fillLastName(lastName: string) {
        await Actions.sendKeys(this.lastNameField, lastName);
    }
    public async fillEmail(email: string) {
        await Actions.sendKeys(this.emailFielld, email);
    }
    public async fillPassword(password: string) {
        await Actions.sendKeys(this.passwordField, password);
    }
    public async fillConfirmPassword(confirmPassword: string) {
        await Actions.sendKeys(this.confirmPasswordField, confirmPassword);
    }

    public async fillRegisterForm(
        name: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string
    ) {
        await this.fillFirstName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(confirmPassword);
    }

    public async clickCreateAccountButton() {
        await Actions.click(this.createAccountButton);
    }

    public async isPasswordErrorVisible() {
        return await this.passwordErrorMessage.isDisplayed();
    }

    public async getPasswordErrorText() {
        if (this.isPasswordErrorVisible()) {
            return await this.passwordErrorMessage.getText();
        } else {
            return "";
        }
    }
}
