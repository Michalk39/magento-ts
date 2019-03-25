import { $, ElementFinder, ActionSequence } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";




export class MagentoCustomerGroups {
    private url: string = "index.php/admin/customer/group";
    public selectIdZeroRow: ElementFinder;


    constructor () {
        this.selectIdZeroRow = $("tr.data-row:nth-child(1) td.data-grid-actions-cell:nth-child(4) > a.action-menu-item");
    };
    
    async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickEdit() {
        await Actions.click(this.selectIdZeroRow);

    } 
}