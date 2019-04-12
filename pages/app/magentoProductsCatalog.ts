import { $, $$, by, element, ElementFinder, browser, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";
import { MagentoAdminLogin } from "./magentoAdminLogin";

export class MagentoProductsCatalog {
    private magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
    private url: string = "index.php/admin/catalog/product/";
    private addProductButton: ElementFinder;
    private productNameField: ElementFinder;
    private productSkuField: ElementFinder;
    private productPriceField: ElementFinder;
    private productQuantityField: ElementFinder;
    private categorySelect: ElementFinder;
    private defaultCategory: ElementFinder;
    private saveButton: ElementFinder;
    private productsList: any[];

    constructor() {
        this.addProductButton = $("#add_new_product-button");
        this.productNameField = $("input[name='product[name]']");
        this.productSkuField = $("input[name='product[sku]']");
        this.productPriceField = $("input[name='product[price]']");
        this.productQuantityField = $("input[name='product[quantity_and_stock_status][qty]']");
        this.categorySelect = element(
            by.cssContainingText(".admin__action-multiselect-text", "Select...")
        );

        this.defaultCategory = element(
            by.cssContainingText(".admin__action-multiselect-label > span", "Default Category")
        );
        this.saveButton = $("#save-button");
    }

    public async navigateTo() {
        BrowserActions.get(this.url);
    }

    // TODO: by API
    public async createExampleProduct(productName: string) {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.addProductButton);
        await Actions.click(this.addProductButton);
        await CustomWait.waitForElementToBeClickable(this.productNameField);

        await Actions.sendKeys(this.productNameField, productName);
        await Actions.sendKeys(this.productSkuField, productName);
        await Actions.sendKeys(this.productPriceField, "9,99");
        await Actions.sendKeys(this.productQuantityField, "100");
        await Actions.click(this.categorySelect);
        await Actions.click(this.defaultCategory);
        await Actions.click(this.saveButton);
        await browser.sleep(10000);
    }

    public async checkIfProductExist(productName: string) {
        let product: ElementFinder = await element(
            by.cssContainingText(".data-grid-cell-content", productName)
        );

        if (await product.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public async createExampeProductIfNotExist(productName: string) {
        await this.magentoLoginPage.logIn();
        await browser.sleep(2000);
        await this.navigateTo();
        await browser.sleep(5000);
        if (!(await this.checkIfProductExist(productName))) {
            await this.createExampleProduct(productName);
        }
    }
}
