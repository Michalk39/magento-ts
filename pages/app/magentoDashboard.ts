import { $, $$, ElementFinder, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";

export class MagentoDashboard {
    static url: string = "index.php/admin/admin/dashboard";
    public h1: ElementFinder;

    constructor() {
        this.h1 = $("h1.page-title");
    }
}
