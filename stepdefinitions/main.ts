import { Before, Given, Then, When } from "cucumber";
import { $, $$, browser, element, ElementArrayFinder, ExpectedConditions } from "protractor";
import { async } from "q";
import { testConfig } from "../config/test-config";
import { MagentoAdminLogin } from "../pages/app/magentoAdminLogin";
import { MagentoCheckout } from "../pages/app/magentoCheckout";
import { MagentoContentPages } from "../pages/app/magentoContentPages";
import { MagentoContentPagesAddNewPage } from "../pages/app/magentoContentPagesAddNewPage";
import { MagentoCustomerGroups } from "../pages/app/magentoCustomerGroups";
import { MagentoCustomerGroupsEdit } from "../pages/app/magentoCustomerGroupsEdit";
import { MagentoDashboard } from "../pages/app/magentoDashboard";
import { MagentoHomePage } from "../pages/app/magentoHomePage";
import { MagnetoRegisterPage } from "../pages/app/magentoRegisterPage";
import { MagentoStoresConfigurationGeneralWeb } from "../pages/app/magentoStoresConfigurationGeneralWeb";
import { MagentoUserRoles } from "../pages/app/magentoUserRoles";
import { MagentoUserRolesNewRole } from "../pages/app/magentoUserRolesNewRole";
import { Actions } from "../support/actions";
import { BrowserActions } from "../support/browser";
import { ImageCompare } from "../support/imageCompare";
import { CustomWait } from "../support/wait";
import { MagentoProductsCatalog } from "../pages/app/magentoProductsCatalog";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoDashboard: MagentoDashboard = new MagentoDashboard();
const magentoCustomerGroups: MagentoCustomerGroups = new MagentoCustomerGroups();
const magentoContentPages: MagentoContentPages = new MagentoContentPages();
const magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage();
const magentoUserRoles: MagentoUserRoles = new MagentoUserRoles();
const magentoCustomerGroupsEdit: MagentoCustomerGroupsEdit = new MagentoCustomerGroupsEdit();
const magentoUserRolesNewRole: MagentoUserRolesNewRole = new MagentoUserRolesNewRole();
const magentoStoresConfigurationGeneralWeb: MagentoStoresConfigurationGeneralWeb = new MagentoStoresConfigurationGeneralWeb();
const magentoHomePage: MagentoHomePage = new MagentoHomePage();
const magentoCheckout: MagentoCheckout = new MagentoCheckout();
const magentoRegisterPage: MagnetoRegisterPage = new MagnetoRegisterPage();
const magentoProductsCatalog: MagentoProductsCatalog = new MagentoProductsCatalog();

When(/^I log in as admin with correct data$/, async function() {
    await magentoLoginPage.logIn();
});

When(/^I log in as admin with incorrect data$/, async function() {
    await magentoLoginPage.logIn(testConfig.adminLogin, testConfig.adminWrongPassword);
});

Then(/^I should login successfully$/, async function() {
    await CustomWait.waitForElementToBeVisible(await magentoDashboard.h1, CustomWait.timeouts.long);
    expect(await magentoDashboard.h1.getText()).equal("Dashboard");
});

Then(/^I shouldn't login successfully$/, async function() {
    expect(await magentoLoginPage.isErrorMessageVisible()).equal(true);
});

Given(/^Navigate to Customers > Customer Groups$/, async function() {
    await magentoCustomerGroups.navigateTo();
});

Given(/^Navigate to Content > Elements > Pages$/, async function() {
    await magentoLoginPage.logIn();
    await magentoContentPages.navigateTo();
});

When(/^Select system Customer Group .*$/, async function() {
    await CustomWait.waitForElementToBeClickable(magentoCustomerGroups.selectIdZeroRow);
    await magentoCustomerGroups.clickEdit();
});

Then(/^Group Name field text is (.+)$/, async function(name: string) {
    expect(await magentoCustomerGroupsEdit.getGroupNameFieldValue()).equal(name);
});

Then(/^Group Name field is disabled$/, async function() {
    expect(await magentoCustomerGroupsEdit.isGroupNameFieldDisable()).equal("true");
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
    expect(await $("li.item.cms_page:nth-child(2) > strong").getText()).equal(this.pageTitle);
});

When(/^User add New Role in User Roles page$/, async function() {
    this.userRoleName = "Admin Role";
    await magentoUserRoles.navigateTo();
    await magentoUserRoles.deleteLastRoleIfExist(this.userRoleName);
    await magentoUserRoles.clickAddNewRoleButton();
    await magentoUserRolesNewRole.createNewRole(this.userRoleName);
});

Then(/^New Role should be created$/, async function() {
    expect(await magentoUserRoles.getLastTableRowText()).equal(this.userRoleName);
});

When(/^Admin save selected settings$/, async function() {
    await magentoStoresConfigurationGeneralWeb.navigateTo();
    await magentoStoresConfigurationGeneralWeb.configureHttpsData("Yes");
});

Then(/^Configuration should be saved$/, async function() {
    expect(await magentoStoresConfigurationGeneralWeb.isSaveConfigSuccesMessageVisible()).equal(
        true
    );
});

Given(/^User have non-empty shopping cart$/, async function() {
    await Actions.attachScreenshot(this);
    await magentoProductsCatalog.createExampeProductIfNotExist("Example Product");
    await Actions.attachScreenshot(this);
    await magentoHomePage.addProductToCart();
    await Actions.attachScreenshot(this);
});

When(/^He provides an incorrect email address in e-mail field$/, async function() {
    await magentoCheckout.navigateTo();
    await Actions.attachScreenshot(this);
    await browser.sleep(10000);
    await Actions.attachScreenshot(this);
    await magentoCheckout.fillEmailAdressField("wrongMail");
    await Actions.attachScreenshot(this);
    await magentoCheckout.fillEmailAdressField("John");
    await Actions.attachScreenshot(this);
    await magentoCheckout.clickNextButton();
    await browser.sleep(1000);
});

Then(/^He should see error message with invalid message information$/, async function() {
    expect(await magentoCheckout.isEmailErrorVisible()).equal(true);
});

Given(/^I am on register page$/, async function() {
    await magentoRegisterPage.navigateTo();
});

When(/^I enter password (.*)$/, async function(password: string) {
    await magentoRegisterPage.fillRegisterForm(
        "John",
        "Doe",
        "John@example.com",
        password,
        password
    );
});

Then(/^The message should be (.*)$/, async function(message: string) {
    expect(await magentoRegisterPage.getPasswordErrorText()).equal(message);
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
