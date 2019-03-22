import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$ } from "protractor";
import { Actions } from "../../support/actions";




export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page";
    private addNewPageButton: ElementFinder;
    private tableRows: ElementArrayFinder;

    constructor() {
        this.addNewPageButton = $('#add');
        this.tableRows = $$('tbody > tr');
    }

    async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickAddNewPageButton() {
        await Actions.click(this.addNewPageButton);
    }



}