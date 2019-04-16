import { Given, Then, When } from "cucumber";
import { $ } from "protractor";
import { MagentoAdminLogin } from "../pages/app/magentoAdminLogin";
import { MagentoContentPages } from "../pages/app/magentoContentPages";
import { MagentoContentPagesAddNewPage } from "../pages/app/magentoContentPagesAddNewPage";
import { BrowserActions } from "../support/browser";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoContentPages: MagentoContentPages = new MagentoContentPages();
const magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage();

Given(/^Navigate to Content > Elements > Pages$/, async function() {
    await magentoLoginPage.logIn();
    await magentoContentPages.navigateTo();
});

Given(/^Admin creates ([0-9]+) new cms pages$/, async function(numberOfPages: number) {
    this.numberOfPages = numberOfPages;
    await magentoLoginPage.logIn();
    await magentoContentPages.deleteTestPagesIfExist();
    await magentoContentPages.createMultipleTestPages(this.numberOfPages);
});

When(/^Admin perform mass disable action on the newly created pages$/, async function() {
    await magentoContentPages.selectMultipleRowsReversed(this.numberOfPages);
    await magentoContentPages.selectActionFromList("Disable");
});

Then(/^New pagees should have (.+) status$/, async function(status: string) {
    const results = await magentoContentPages.getMultipleRowsStatusReversed(this.numberOfPages);

    const expected = results.filter(function(result) {
        return result === status;
    });

    expect(results).to.have.length(expected.length);
});

Given(/^Start to create new CMS Page$/, async function() {
    await magentoContentPages.deleteTestPagesIfExist();
    await magentoContentPages.clickAddNewPageButton();
});

Given(/^Fill out fields data according to data set$/, async function() {
    this.pageTitle = "TestCMSPage";
    await magentoContentPagesAddNewPage.fillPageTitleField(this.pageTitle);
});

When(/^Save CMS Page$/, async function() {
    await magentoContentPagesAddNewPage.clickSaveButton();
});

Then(/^Page should be visible in table$/, async function() {
    await magentoContentPages.navigateTo();
    expect(await magentoContentPages.getLastRowTitle()).equal(this.pageTitle);
});

Then(/^Page url should be reachable$/, async function() {
    await BrowserActions.get(await magentoContentPages.getLastRowUrl());
    expect(await magentoContentPages.getItemCmsPageText(await magentoContentPages.getLastRowUrl())).equal(
        this.pageTitle
    );
});
