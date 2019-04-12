import { $, ElementFinder, ActionSequence, browser } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";
import { stringify } from "querystring";

export class MagentoCustomerGroupsEdit {
    private groupNameField: ElementFinder;

    constructor() {
        this.groupNameField = $("#customer_group_code");
    }

    public async getGroupNameFieldValue() {
        // await CustomWait.waitForElementToBeVisible(await this.groupNameField);
        // return await this.groupNameField.getAttribute("value");
        await browser.sleep(10000);
        // await CustomWait.waitForElementToBeVisible(await this.groupNameField);
        return await this.groupNameField.getAttribute("value");
    }

    public async isGroupNameFieldDisable() {
        return await this.groupNameField.getAttribute("disabled");
    }
}
