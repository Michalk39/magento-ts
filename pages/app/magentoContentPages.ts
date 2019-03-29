import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$, browser, by } from "protractor";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";
import { MagentoContentPagesAddNewPage } from "./magentoContentPagesAddNewPage";
import { CustomWait } from "../../support/wait";


export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page";
    private addNewPageButton: ElementFinder;
    private lastRowTitle: ElementFinder;
    private lastRowUrl: ElementFinder;
    private EC = protractor.ExpectedConditions;
    private magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage;
    private actionsSelectList: ElementFinder;
    
    // private rowCheckbox;    
    //private tableOfPages;

    constructor() {
        this.addNewPageButton = $('#add');
        this.lastRowTitle = $('tbody > tr.data-row:last-child>td:nth-child(3)>div');
        this.lastRowUrl = $('tbody > tr.data-row:last-child>td:nth-child(4)>div');
        this.actionsSelectList = $("button.action-select");
        
        //this.tableOfPages = this.buildTable();
    }

    private async buildTable() {
        //zbudować jakos tabele
    }

    async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickActionsSelectList() {
        await Actions.click(this.actionsSelectList);
    }

    async selectActionFromList(action: string) {
        let list = $("ul.action-menu._active");
        await Actions.click(list.$("li[data-repeat-index='1'] > span"));
        await Actions.click($("body.cms-page-index.page-layout-admin-1column:nth-child(2) div.page-wrapper:nth-child(5) main.page-content:nth-child(4) div.page-columns div.admin__old div.main-col div.admin__data-grid-outer-wrap div.admin__data-grid-header div.admin__data-grid-header-row.row.row-gutter:nth-child(2) div.col-xs-2 div.action-select-wrap._active ul.action-menu._active li:nth-child(2) > span.action-menu-item"));
    }

    async clickAddNewPageButton() {
        await Actions.click(this.addNewPageButton);
    }

    async getLastRowTitle() {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);        
        return await this.lastRowTitle.getText();
    }

    async getLastRowUrl() {
        await CustomWait.waitForElementToBeClickable(this.lastRowUrl);        
        return await this.lastRowUrl.getText();
    }

    async createNewTestPage(pageName: string = "Test Cms Page") {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);        
        await this.clickAddNewPageButton();
        await this.magentoContentPagesAddNewPage.fillPageTitleField(pageName);
        await this.magentoContentPagesAddNewPage.clickSaveButton();
    }

    async createMultipleTestPages(number: number) {
        for(let i = 0; i < number; i++) {
            await this.createNewTestPage("TestCMSPage" + String(i + 1));
        }
    }

    async clickRowCheckboxReversed(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let checkBox = $("table[data-role='grid'] > tbody > tr:nth-last-child(" + number + ") > td:first-child")
        await Actions.click(checkBox);
    }

    async selectMultipleRowsReversed(quantity: number) {
        this.navigateTo();
        for(let i = 1; i <= quantity; i++) {
            await this.clickRowCheckboxReversed(i);
        }
    }

}