import { BrowserActions } from "../../support/browser";
import { ElementFinder, $ } from "protractor";
import { Actions } from "../../support/actions";

export class MagentoCheckout {
    private url: string = "index.php/checkout";
    private emailAdressField: ElementFinder;
    private nextButton: ElementFinder;
    private customerEmailErrorMessage: ElementFinder;

    constructor() {
        this.emailAdressField = $("#customer-email");
        this.nextButton = $("button.button.action.continue.primary");
        this.customerEmailErrorMessage = $("#customer-email-error");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillEmailAdressField(email: string) {
        await Actions.sendKeys(this.emailAdressField, email);
    }

    public async clickNextButton() {
        await Actions.click(this.nextButton);
    }

    public async isEmailErrorVisible() {
        return await this.customerEmailErrorMessage.isPresent();
    }
}
