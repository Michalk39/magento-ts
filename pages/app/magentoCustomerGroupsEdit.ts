import { $, ElementFinder, ActionSequence, browser } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";
import { stringify } from "querystring";

export class MagentoCustomerGroupsEdit {
    private groupNameField: ElementFinder;
    private editUrl: string = "index.php/admin/customer/group/edit/id/0/";

    constructor() {
        this.groupNameField = $("#customer_group_code");
    }

    public async getGroupNameFieldValue() {
        await this.navigateToEditGroupZero();
        await browser.waitForAngular();
        return await this.groupNameField.getAttribute("value");
    }

    public async isGroupNameFieldDisable() {
        return await this.groupNameField.getAttribute("disabled");
    }

    public async navigateToEditGroupZero() {
        await BrowserActions.get(this.editUrl);
    }
}
