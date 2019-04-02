import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder } from "protractor";
import { protractor } from "protractor/built/ptor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";
import { CustomWait } from "../../support/wait";
import { MagentoContentPagesAddNewPage } from "./magentoContentPagesAddNewPage";

export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page";
    private addNewPageButton: ElementFinder;
    private lastRowTitle: ElementFinder;
    private lastRowUrl: ElementFinder;
    private EC = protractor.ExpectedConditions;
    private magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage();
    private actionsSelectList: ElementFinder;
    private okButtonOnDeletePopup: ElementFinder;

    constructor() {
        this.addNewPageButton = $("#add");
        this.lastRowTitle = $("tbody > tr.data-row:last-child>td:nth-child(3)>div");
        this.lastRowUrl = $("tbody > tr.data-row:last-child>td:nth-child(4)>div");
        this.actionsSelectList = $("button.action-select");
        this.okButtonOnDeletePopup = $(".action-accept span");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async clickActionsSelectList() {
        await Actions.click(this.actionsSelectList);
    }

    public async selectActionFromList(action: string) {
        let listItem = await element(
            by.cssContainingText("ul > li > span.action-menu-item", action)
        );
        await Actions.click(
            $(
                "div.admin__data-grid-header-row.row.row-gutter > div > div.action-select-wrap > button.action-select"
            )
        );
        await Actions.click(listItem);
    }

    public async clickAddNewPageButton() {
        await Actions.click(this.addNewPageButton);
    }

    public async getLastRowTitle() {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        return await this.lastRowTitle.getText();
    }

    public async getLastRowUrl() {
        await CustomWait.waitForElementToBeClickable(this.lastRowUrl);
        return await this.lastRowUrl.getText();
    }

    public async createNewTestPage(pageName: string = "Test Cms Page") {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        await this.clickAddNewPageButton();
        await this.magentoContentPagesAddNewPage.fillPageTitleField(pageName);
        await this.magentoContentPagesAddNewPage.clickSaveButton();
    }

    public async createMultipleTestPages(number: number) {
        for (let i = 0; i < number; i++) {
            await this.createNewTestPage("TestCMSPage" + String(i + 1));
        }
    }

    public async clickRowCheckbox(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        const tableRowOffset = 1;
        number = number + tableRowOffset;
        let checkBox = $(
            "table[data-role='grid'] > tbody > tr:nth-child(" + number + ") > td:first-child"
        );
        await Actions.click(checkBox);
    }

    public async clickRowCheckboxReversed(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let checkBox = $(
            "table[data-role='grid'] > tbody > tr:nth-last-child(" + number + ") > td:first-child"
        );
        await Actions.click(checkBox);
    }

    public async selectMultipleRowsReversed(quantity: number) {
        this.navigateTo();
        for (let i = 1; i <= quantity; i++) {
            await this.clickRowCheckboxReversed(i);
        }
    }

    public async getRowStatusReversed(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let statusField = $(
            "table[data-role='grid'] > tbody > tr:nth-last-child(" +
                number +
                ") > td:nth-child(7) > div"
        );
        let status = await statusField.getText();
        return await status;
    }

    public async getRowUrlKey(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        const tableRowOffset = 1;
        number = number + tableRowOffset;
        let urlKeyField = $(
            "table[data-role='grid'] > tbody > tr:nth-child(" + number + ") > td:nth-child(4) > div"
        );
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
        let UrlKeys = $$("table[data-role='grid'] > tbody > tr > td:nth-child(4) > div");
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
}
