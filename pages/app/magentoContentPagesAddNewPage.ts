import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$ } from "protractor";
import { Actions } from "../../support/actions";

export class MagentoContentPagesAddNewPage {
    private saveButton: ElementFinder;
    private pageTitleField: ElementFinder;

    constructor() {
        this.saveButton = $("#save-button");
        this.pageTitleField = $("input[name='title']");
    }

    public async fillPageTitleField(title: string) {
        await Actions.sendKeys(this.pageTitleField, title);
    }

    public async clickSaveButton() {
        await Actions.click(this.saveButton);
    }
}
