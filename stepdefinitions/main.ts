import { Before, Given, Then, When } from "cucumber";
import { $, $$, browser, element, ElementArrayFinder, ExpectedConditions } from "protractor";
import { async } from "q";
import { testConfig } from "../config/test-config";
import { Google } from "../pages/app/google";
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

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Google = new Google();
const imageCompare: ImageCompare = new ImageCompare();
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoDashboard: MagentoDashboard = new MagentoDashboard();
const magentoCustomerGroups: MagentoCustomerGroups = new MagentoCustomerGroups();
const magentoContentPages: MagentoContentPages = new MagentoContentPages();
const magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage();
const magentoUserRoles: MagentoUserRoles = new MagentoUserRoles();
const magentoUserRolesNewRole: MagentoUserRolesNewRole = new MagentoUserRolesNewRole();
const magentoStoresConfigurationGeneralWeb: MagentoStoresConfigurationGeneralWeb = new MagentoStoresConfigurationGeneralWeb();
const magentoHomePage: MagentoHomePage = new MagentoHomePage();
const magentoCheckout: MagentoCheckout = new MagentoCheckout();
const magentoRegisterPage: MagnetoRegisterPage = new MagnetoRegisterPage();

When(/^I enter "([^"]+)" phrase$/, async function(phrase: string) {
    await Actions.attachScreenshot(this);
    await googlePage.search(phrase);
});

Then(/^I should see "([^"]+)" page in the (.+) row of the results$/, async function(
    expectedPhrase,
    resultRowIdx
) {
    await Actions.attachScreenshot(this);
    expect(await googlePage.getResult(resultRowIdx)).to.contain(expectedPhrase);
});

Then(/^We should get a Google page$/, async function() {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkFullPageScreen("googlePage")).to.equal(0);
});

Then(/^We should see a Google Logo$/, async function() {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($("#hplogo"), "googleLogo")).to.equal(0);
});

Then(/^This should be fail$/, async function() {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($("#hplogo"), "googleLogoFail")).to.not.equal(0); // To make it failing just remove "not"
});

When(/^I log in as (.+?) with (.+?) password$/, async function(username: string, password: string) {
    await magentoLoginPage.navigateTo();
    await magentoLoginPage.logIn(username, password);
});

Then(/^I should login successfully$/, async function() {
    expect(await magentoDashboard.h1.getText()).equal("Dashboard");
});

Then(/^I shouldn't login successfully$/, async function() {
    expect(await magentoLoginPage.isErrorMessageVisible()).equal(true);
});

When(/^I enter incorrect data$/, async function() {
    await magentoLoginPage.navigateTo();
    await magentoLoginPage.logIn("wrong", "wrong");
});

Given(/^Navigate to Customers > Customer Groups$/, async function() {
    await magentoCustomerGroups.navigateTo();
});

Given(/^Navigate to Content > Elements > Pages$/, async function() {
    await magentoContentPages.navigateTo();
});

When(/^Select system Customer Group .*$/, async function() {
    await CustomWait.waitForElementToBeClickable(magentoCustomerGroups.selectIdZeroRow);
    await magentoCustomerGroups.clickEdit();
});

Then(/^Group Name field text is (.+)$/, async function(name: string) {
    expect(await MagentoCustomerGroupsEdit.groupNameField.getAttribute("value")).equal(name);
});

Then(/^Group Name field is disabled$/, async function() {
    expect(await MagentoCustomerGroupsEdit.groupNameField.getAttribute("disabled")).equal("true");
});

Given(/^Start to create new CMS Page$/, async function() {
    await magentoContentPages.clickAddNewPageButton();
});

Given(/^Fill out fields data according to data set$/, async function() {
    this.pageTitle = "NewCmsPage";
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
    await magentoStoresConfigurationGeneralWeb.configureHttpsData();
});

Then(/^Configuration should be saved$/, async function() {
    expect(await magentoStoresConfigurationGeneralWeb.isSaveConfigSuccesMessageVisible()).equal(
        true
    );
});

Given(/^Shopping cart isn't empty$/, async function() {
    await magentoHomePage.addProductToCart();
});

When(/^Enter incorrect email$/, async function() {
    await magentoCheckout.navigateTo();
    await magentoCheckout.fillEmailAdressField("wrongMail");
    await magentoCheckout.clickNextButton();
});

Then(/^Invalid email error message should be visible$/, async function() {
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
    await magentoLoginPage.logIn(testConfig.adminLogin, testConfig.adminPassword);
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
