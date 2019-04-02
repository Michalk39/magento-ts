import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$, browser, by, element } from "protractor";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";
import { MagentoContentPagesAddNewPage } from "./magentoContentPagesAddNewPage";
import { CustomWait } from "../../support/wait";
import { stringify } from "querystring";


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



    public async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickActionsSelectList() {
        await Actions.click(this.actionsSelectList);
    }

    async selectActionFromList(action: string) {
        let listItem = await element(by.cssContainingText("ul > li > span.action-menu-item", action));
        await Actions.click($("div.admin__data-grid-header-row.row.row-gutter > div > div.action-select-wrap > button.action-select"));        
        await Actions.click(listItem);
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
        let checkBox = $("table[data-role='grid'] > tbody > tr:nth-last-child(" + number + ") > td:first-child");
        await Actions.click(checkBox);
    }

    async selectMultipleRowsReversed(quantity: number) {
        this.navigateTo();
        for(let i = 1; i <= quantity; i++) {
            await this.clickRowCheckboxReversed(i);
        }
    }

    async getRowStatusReversed(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let statusField = $("table[data-role='grid'] > tbody > tr:nth-last-child(1) > td:nth-child(7) > div");
        let status = await statusField.getText();
        return await status;        
    }

    async getMultipleRowsStatusReversed(quantity: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let rowsStatusReversed = new Array();
        for(let i = 1; i <= quantity; i++) {
            let status:string = await this.getRowStatusReversed(i);
            await rowsStatusReversed.push(status);            
        }
        return await rowsStatusReversed;
    }

}