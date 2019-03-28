import { BrowserActions } from "../../support/browser";
import { ElementFinder, $ } from "protractor";
import { Actions } from "../../support/actions";

export class MagnetoRegisterPage {
    private url = "customer/account/create";
    private firstNameField: ElementFinder;
    private lastNameField: ElementFinder;
    private emailFielld: ElementFinder;
    private passwordField: ElementFinder;
    private confirmPasswordField: ElementFinder;
    private createAccountButton: ElementFinder;


    constructor() {
        this.firstNameField = $("#firstname");
        this.lastNameField = $("#lastname");
        this.emailFielld = $("#email_address");
        this.passwordField = $("#password");
        this.confirmPasswordField = $("#password-confirmation");
        this.createAccountButton = $("button[title='Create an Account']");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillFirstName(name: string) {await Actions.sendKeys(this.firstNameField, name);}
    public async fillLastName(name: string) {await Actions.sendKeys(this.lastNameField, lastName);}
    public async fillEmail(name: string) {await Actions.sendKeys(this.emailFielld, email);}
    public async fillPassword(name: string) {await Actions.sendKeys(this.passwordField, password);}
    public async fillConfirmPassword(name: string) {await Actions.sendKeys(this.confirmPasswordField, confirmPassword);}

    


}