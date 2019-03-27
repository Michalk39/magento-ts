import { When, Then, Before, Given } from "cucumber";
import { Google } from "../pages/app/google";
import { Actions } from "../support/actions";
import { ImageCompare } from "../support/imageCompare";
import { $, browser, $$, ElementArrayFinder, ExpectedConditions } from "protractor";
import { MagentoAdminLogin } from "../pages/app/magentoAdminLogin";
import { MagentoDashboard } from "../pages/app/magentoDashboard";
import { async } from "q";
import { BrowserActions } from "../support/browser";
import { MagentoCustomerGroups } from "../pages/app/magentoCustomerGroups";
import { MagentoCustomerGroupsEdit } from "../pages/app/magentoCustomerGroupsEdit";
import { MagentoContentPages } from "../pages/app/magentoContentPages";
import { MagentoContentPagesAddNewPage } from "../pages/app/magentoContentPagesAddNewPage";
import { MagentoUserRoles } from "../pages/app/magentoUserRoles";
import { MagentoUserRolesNewRole } from "../pages/app/magentoUserRolesNewRole";
import { MagentoStoresConfigurationGeneralWeb } from "../pages/app/magentoStoresConfigurationGeneralWeb";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Google = new Google();
const imageCompare: ImageCompare = new ImageCompare();
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoDashboard: MagentoDashboard = new MagentoDashboard();
const magentoCustomerGroups: MagentoCustomerGroups = new MagentoCustomerGroups;
const magentoContentPages: MagentoContentPages = new MagentoContentPages;
const magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage;
const magentoUserRoles: MagentoUserRoles = new MagentoUserRoles;
const magentoUserRolesNewRole: MagentoUserRolesNewRole = new MagentoUserRolesNewRole;
const magentoStoresConfigurationGeneralWeb: MagentoStoresConfigurationGeneralWeb = new MagentoStoresConfigurationGeneralWeb;


When(/^I enter "([^"]+)" phrase$/, async function (phrase: string) {
    await Actions.attachScreenshot(this);
    await googlePage.search(phrase);
});

Then(/^I should see "([^"]+)" page in the (.+) row of the results$/, async function(expectedPhrase, resultRowIdx) {
    await Actions.attachScreenshot(this);
    expect(await googlePage.getResult(resultRowIdx)).to.contain(expectedPhrase);
});

Then(/^We should get a Google page$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkFullPageScreen('googlePage')).to.equal(0);
})

Then(/^We should see a Google Logo$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($('#hplogo'), 'googleLogo')).to.equal(0);
})

Then(/^This should be fail$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($('#hplogo'), 'googleLogoFail')).to.not.equal(0); // To make it failing just remove "not"
})

When(/^I log in as (.+?) with (.+?) password$/, async function(username:string, password:string) {
    await magentoLoginPage.navigateTo();
    await magentoLoginPage.logIn(username, password);
})

Then(/^I should login successfully$/, async function() {
    expect(await magentoDashboard.h1.getText()).equal('Dashboard');
})

Then(/^I shouldn't login successfully$/, async function() {
    expect(await magentoLoginPage.isErrorMessageVisible()).equal(true); //tu error
})

When(/^I enter incorrect data$/, async function() {
    await magentoLoginPage.navigateTo();
    await magentoLoginPage.logIn('wrong', 'wrong');
})

Given(/^Navigate to Customers > Customer Groups$/, async function() {
    await magentoCustomerGroups.navigateTo();
})

Given(/^Navigate to Content > Elements > Pages$/, async function() {
    await magentoContentPages.navigateTo();
    await browser.wait(magentoContentPages.tableIsLoaded, 5000);
})

When(/^Select system Customer Group .*$/, async function() {
    await browser.wait(browser.ExpectedConditions.elementToBeClickable(magentoCustomerGroups.selectIdZeroRow), 100000);
    await magentoCustomerGroups.clickEdit();
})

Then(/^Group Name field text is (.+)$/, async function(name: string) {
    expect(await MagentoCustomerGroupsEdit.groupNameField.getAttribute("value")).equal(name);
})

Then(/^Group Name field is disabled$/, async function() {
    expect(await MagentoCustomerGroupsEdit.groupNameField.getAttribute("disabled")).equal("true");
})

Given(/^Start to create new CMS Page$/, async function() {
    await magentoContentPages.clickAddNewPageButton();
})

Given(/^Fill out fields data according to data set$/, async function() {
    this.pageTitle = "NewCmsPage";
    await magentoContentPagesAddNewPage.fillPageTitleField(this.pageTitle);
})

When(/^Save CMS Page$/, async function() {
    await magentoContentPagesAddNewPage.clickSaveButton();
})

Then(/^Page should be visible in table$/, async function() {
    await magentoContentPages.navigateTo();
    await browser.wait(magentoContentPages.tableIsLoaded, 5000);
    expect(await magentoContentPages.getLastRowTitle()).equal(this.pageTitle);
})

Then(/^Page url should be reachable$/, async function() {
    await BrowserActions.get(await magentoContentPages.getLastRowUrl());
    expect(await $("li.item.cms_page:nth-child(2) > strong").getText()).equal(this.pageTitle);
})

When(/^User add New Role in User Roles page$/, async function() {
    this.userRoleName = "Admin Role";
    await magentoUserRoles.navigateTo();
    await magentoUserRoles.deleteLastRoleIfExist(this.userRoleName);
    await magentoUserRoles.clickAddNewRoleButton();
    await magentoUserRolesNewRole.createNewRole(this.userRoleName);
})

Then(/^New Role should be created$/, async function() {
    expect(await magentoUserRoles.getLastTableRowText()).equal(this.userRoleName);
})

When(/^Admin save selected settings$/, async function() {
    await magentoStoresConfigurationGeneralWeb.navigateTo();
    await magentoStoresConfigurationGeneralWeb.configureHttpsData();
}) 

Then(/^Configuration should be saved$/, async function() {
    expect(await magentoStoresConfigurationGeneralWeb.isSaveConfigSuccesMessageVisible()).equal(true);
})
