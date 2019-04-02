import { ElementFinder, $, element, by, browser } from "protractor";
import { BrowserActions } from "../../support/browser";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";

export class MagentoHomePage {
    private url: string = "";
    private cartIcon: ElementFinder;
    private searchField: ElementFinder;
    private searchMagnifier: ElementFinder;
    private addToCartButton: ElementFinder;
    private EC = protractor.ExpectedConditions;

    constructor() {
        this.cartIcon = $("a.action.showcart");
        this.searchField = $("#search");
        this.searchMagnifier = $("button[title='Search']");
        this.addToCartButton = $("button[title='Add to Cart']");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillSearchField(text: string) {
        await Actions.sendKeys(this.searchField, text);
    }

    public async clickSearchMagnifier() {
        await browser.wait(this.EC.elementToBeClickable(this.searchMagnifier), 2000);
        await Actions.click(this.searchMagnifier);
    }

    public async clickAddToCartButton() {
        await browser.wait(this.EC.elementToBeClickable(this.addToCartButton), 5000);
        await Actions.click(this.addToCartButton);
    }

    public async searchPhrase(phrase: string) {
        await this.fillSearchField(phrase);
        await this.clickSearchMagnifier();
    }

    public async addProductToCart() {
        //to by można było sparametryzować
        let productName: string = "Example Product";
        await this.navigateTo();
        await this.searchPhrase(productName);
        await Actions.click(await element(by.cssContainingText(".product-item-link", productName)));
        await this.clickAddToCartButton();
    }
}
