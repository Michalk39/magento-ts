import { $, ElementFinder, ActionSequence } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";

export class MagentoCustomerGroupsEdit {
    private groupNameField: ElementFinder;

    constructor() {
        this.groupNameField = $("#customer_group_code");
    }

    public async getGroupNameFieldValue(name: string) {
        console.log(
            "nameFromStep: " +
                name +
                " \nnameFromField: " +
                (await this.groupNameField.getAttribute("value"))
        );
        await CustomWait.waitForElementToBeClickable(this.groupNameField);
        return await this.groupNameField.getAttribute("value");
    }

    public async isGroupNameFieldDisable() {
        return await this.groupNameField.getAttribute("disabled");
    }
}
