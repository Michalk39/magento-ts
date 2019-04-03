import { ElementFinder, $, by } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";

export class MagentoStoresConfigurationGeneralWeb {
    private url = "index.php/admin/admin/system_config/edit/section/web/";
    private useSecureUrlsOnStorefrontCheckbox: ElementFinder;
    private useSecureUrlsOnStorefrontSelect: ElementFinder;
    private baseUrlsSecureSection: ElementFinder;
    private saveConfigButton: ElementFinder;
    private saveConfigSuccesMessage: ElementFinder;

    constructor() {
        this.useSecureUrlsOnStorefrontCheckbox = $("#web_secure_use_in_frontend_inherit");
        this.useSecureUrlsOnStorefrontSelect = $("#web_secure_use_in_frontend");
        this.baseUrlsSecureSection = $("#web_secure-head");
        this.saveConfigButton = $("#save");
        this.saveConfigSuccesMessage = $("div.message.message-success.success");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async expandBaseUrlsSecureSection() {
        if ((await this.baseUrlsSecureSection.getAttribute("class")) != "open") {
            await Actions.click(this.baseUrlsSecureSection);
        }
    }

    public async clickUseSecureUrlsOnStorefrontCheckbox() {
        await Actions.click(this.useSecureUrlsOnStorefrontCheckbox);
    }

    public async selectUseSecureUrlsOnStorefrontSelectValue(value: string) {
        await Actions.click(
            this.useSecureUrlsOnStorefrontSelect.element(by.cssContainingText("option", value))
        );
    }

    public async clickSaveConfigButton() {
        await Actions.click(this.saveConfigButton);
    }

    public async uncheckUseSecureUrlsOnStorefrontCheckbox() {
        if ((await this.useSecureUrlsOnStorefrontCheckbox.getAttribute("checked")) == "true") {
            await this.clickUseSecureUrlsOnStorefrontCheckbox();
        }
    }

    public async isSaveConfigSuccesMessageVisible() {
        return await this.saveConfigSuccesMessage.isPresent();
    }

    public async configureHttpsData() {
        await this.expandBaseUrlsSecureSection();
        await this.uncheckUseSecureUrlsOnStorefrontCheckbox();
        await this.selectUseSecureUrlsOnStorefrontSelectValue("Yes");
        await this.clickSaveConfigButton();
    }
}
