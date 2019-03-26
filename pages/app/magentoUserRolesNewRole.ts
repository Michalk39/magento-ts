import { BrowserActions } from "../../support/browser";
import { ElementFinder, $ } from "protractor";
import { Actions } from "../../support/actions";
import { testConfig } from "../../config/test-config";

export class MagentoUserRolesNewRole {
    private url: string = "index.php/admin/admin/user_role/editrole";
    private roleNameField: ElementFinder;
    private yourPasswordField: ElementFinder;
    private roleInfoTab: ElementFinder;
    private roleResourcesTab: ElementFinder;
    private resourceAccessSelect: ElementFinder;
    private resourcesListSalesCheckbox: ElementFinder;
    private saveRoleButton: ElementFinder;

    constructor() {
        this.roleNameField = $("#role_name");
        this.yourPasswordField = $("#current_password");
        this.roleInfoTab = $("#role_info_tabs_info");
        this.roleResourcesTab = $("#role_info_tabs_account");
        this.resourceAccessSelect = $("#all");
        this.resourcesListSalesCheckbox = $("li[data-id='Magento_Sales::sales'] > a > ins:first-child");
        this.saveRoleButton = $("button[title='Save Role']");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillRoleNameField(data: string) {
        await Actions.sendKeys(this.roleNameField, data);
    }
    public async fillYourPasswordField(data: string) {
        await Actions.sendKeys(this.yourPasswordField, data);
    }
    public async clickRoleInfoTab() {
        await Actions.click(this.roleInfoTab);
    }
    public async clickRoleResourcesTab() {
        await Actions.click(this.roleResourcesTab);
    }
    public async clickSalesCheckbox() {
        await Actions.click(this.resourcesListSalesCheckbox);
    }
    public async clickSaveRoleButton() {
        await Actions.click(this.saveRoleButton);
    }
    public async createNewRole(userRoleName: string) {
        await this.fillRoleNameField(userRoleName);
        await this.fillYourPasswordField(testConfig.adminPassword);
        await this.clickRoleResourcesTab();
        await this.clickSalesCheckbox();
        await this.clickSaveRoleButton();
    }

}