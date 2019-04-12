import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, element, by, browser } from "protractor";
import { Actions } from "../../support/actions";
import { CustomWait } from "../../support/wait";

export class MagentoCheckout {
    private url: string = "index.php/checkout/";
    private emailAdressField: ElementFinder;
    private nextButton: ElementFinder;
    private customerEmailErrorMessage: ElementFinder;
    private firstNameField: ElementFinder;

    constructor() {
        this.emailAdressField = $("#customer-email");
        this.nextButton = $("button.button.action.continue.primary");
        this.customerEmailErrorMessage = $("#customer-email-error");
        this.firstNameField = $("input[name='firstname']");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
        await browser.waitForAngular();
    }

    public async fillEmailAdressField(email: string) {
        await CustomWait.waitForElementToBeClickable(
            this.emailAdressField,
            CustomWait.timeouts.long
        );
        await Actions.sendKeys(this.emailAdressField, email);
    }

    public async fillFirstNameField(firstName: string) {
        await CustomWait.waitForElementToBeClickable(this.firstNameField, CustomWait.timeouts.long);
        await Actions.sendKeys(this.firstNameField, firstName);
    }

    public async clickNextButton() {
        await Actions.click(this.nextButton);
    }

    public async isEmailErrorVisible() {
        return await this.customerEmailErrorMessage.isPresent();
    }
}
