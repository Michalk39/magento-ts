import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder } from "protractor";
import { protractor } from "protractor/built/ptor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";
import { MagentoContentPagesAddNewPage } from "./magentoContentPagesAddNewPage";

export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page/";
    private addNewPageButton: ElementFinder;
    private lastRowTitle: ElementFinder;
    private lastRowUrl: ElementFinder;
    private EC = protractor.ExpectedConditions;
    private magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage();
    private okButtonOnDeletePopup: ElementFinder;
    private actionsDropdownList: ElementFinder;

    constructor() {
        this.addNewPageButton = $("#add");
        this.lastRowTitle = $("tbody > tr.data-row:last-child>td:nth-child(3)>div");
        this.lastRowUrl = $("tbody > tr.data-row:last-child>td:nth-child(4)>div");
        this.okButtonOnDeletePopup = $(".action-accept span");
        this.actionsDropdownList = $(
            "div.admin__data-grid-header-row.row.row-gutter > div > div.action-select-wrap > button.action-select"
        );
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async clickActionsSelectList() {
        await Actions.click(this.actionsDropdownList);
    }

    public async selectActionFromList(action: string) {
        let listItem = await element(by.cssContainingText("ul > li > span.action-menu-item", action));
        await this.clickActionsSelectList();
        await Actions.click(listItem);
    }

    public async clickAddNewPageButton() {
        await CustomWait.waitForElementToBeClickable(this.addNewPageButton);
        await Actions.click(this.addNewPageButton);
    }

    public async getLastRowTitle() {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        return await this.lastRowTitle.getText();
    }

    public async getLastRowUrl() {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowUrl);
        return this.lastRowUrl.getText();
    }

    public async createNewTestPage(pageName: string = "Test Cms Page") {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        await this.clickAddNewPageButton();
        await this.magentoContentPagesAddNewPage.fillPageTitleField(pageName);
        await this.magentoContentPagesAddNewPage.clickSaveButton();
    }

    public async createMultipleTestPages(numberOfPages: number) {
        for (let i = 0; i < numberOfPages; i++) {
            await this.createNewTestPage("TestCMSPage" + String(i + 1));
        }
    }

    public async clickRowCheckbox(numberOfRow: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        const tableRowOffset = 1;
        numberOfRow = numberOfRow + tableRowOffset;
        let checkBox = $(`table[data-role='grid'] > tbody > tr:nth-child(${numberOfRow}) > td:first-child`);
        await Actions.click(checkBox);
    }

    public async clickRowCheckboxReversed(numberOfRow: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let checkBox = $(`table[data-role='grid'] > tbody > tr:nth-last-child(${numberOfRow}) > td:first-child`);
        await Actions.click(checkBox);
    }

    public async selectMultipleRowsReversed(quantity: number) {
        this.navigateTo();
        for (let i = 1; i <= quantity; i++) {
            await this.clickRowCheckboxReversed(i);
        }
    }

    public async getRowStatusReversed(numberOfRow: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let statusField = $(
            `table[data-role='grid'] > tbody > tr:nth-last-child(${numberOfRow}) > td:nth-child(7) > div`
        );
        let status = await statusField.getText();
        return await status;
    }

    public async getRowUrlKey(numberOfRow: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        const tableRowOffset = 1;
        numberOfRow = numberOfRow + tableRowOffset;
        let urlKeyField = $(`table[data-role='grid'] > tbody > tr:nth-child(${numberOfRow}) > td:nth-child(4) > div`);
        let urlKey = await urlKeyField.getText();
        return urlKey;
    }

    public async getMultipleRowsStatusReversed(quantity: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let rowsStatusReversed = new Array();
        for (let i = 1; i <= quantity; i++) {
            let status: string = await this.getRowStatusReversed(i);
            await rowsStatusReversed.push(status);
        }
        return await rowsStatusReversed;
    }

    public async deleteTestPagesIfExist() {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let numOfRows = await $$("table[data-role='grid'] > tbody > tr").count();

        for (let i = 1; i < numOfRows; i++) {
            let urlKey = await this.getRowUrlKey(i);
            if (urlKey.includes("testcmspage")) {
                await this.clickRowCheckbox(i);
            }
        }

        await this.selectActionFromList("Delete");
        await CustomWait.waitForElementToBeClickable(this.okButtonOnDeletePopup);
        await Actions.click(this.okButtonOnDeletePopup);
    }

    public async getItemCmsPageText(url: string) {
        await BrowserActions.get(url);
        let cmsPageHeader = await $("li.item.cms_page:nth-child(2) > strong");
        await CustomWait.waitForElementToBeVisible(cmsPageHeader);
        return await cmsPageHeader.getText();
    }
}
