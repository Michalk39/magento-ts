import { BrowserActions } from "../../support/browser";
import { ElementFinder, $ } from "protractor";
import { Actions } from "../../support/actions";

export class MagentoUserRoles {
    private url: string = "index.php/admin/admin/user_role";
    private addNewRoleButton: ElementFinder;
    private lastTableRow: ElementFinder;

    constructor() {
        this.addNewRoleButton = $("#add");
        this.lastTableRow = $("tbody > tr:last-child > td:nth-child(2)");
    }

    public async navigateTo()
    {
        await BrowserActions.get(this.url);
    }

    public async clickAddNewRoleButton() {
        await Actions.click(this.addNewRoleButton);
    }

    public async getLastTableRowText() {
        return await this.lastTableRow.getText();
    }

    public async deleteLastRoleIfExist(userRoleName) {
        let lastRole = await this.lastTableRow.getText();
        if (lastRole == userRoleName) {
            await Actions.click(this.lastTableRow);
            await Actions.click($("button[title='Delete Role']"));
            await Actions.click($("button.action-primary.action-accept"));
        }
    }
}