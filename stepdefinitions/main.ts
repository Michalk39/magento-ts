import { Given, Then, When } from "cucumber";
import { testConfig } from "../config/test-config";
import { MagentoAdminLogin } from "../pages/app/magentoAdminLogin";
import { MagentoDashboard } from "../pages/app/magentoDashboard";
import { MagnetoRegisterPage } from "../pages/app/magentoRegisterPage";
import { MagentoStoresConfigurationGeneralWeb } from "../pages/app/magentoStoresConfigurationGeneralWeb";
import { CustomWait } from "../support/wait";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoDashboard: MagentoDashboard = new MagentoDashboard();
const magentoStoresConfigurationGeneralWeb: MagentoStoresConfigurationGeneralWeb = new MagentoStoresConfigurationGeneralWeb();
const magentoRegisterPage: MagnetoRegisterPage = new MagnetoRegisterPage();

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

When(/^Admin save selected settings$/, async function() {
    await magentoStoresConfigurationGeneralWeb.navigateTo();
    await magentoStoresConfigurationGeneralWeb.configureHttpsData("Yes");
});

Then(/^Configuration should be saved$/, async function() {
    expect(await magentoStoresConfigurationGeneralWeb.isSaveConfigSuccesMessageVisible()).equal(true);
});

Given(/^I am on register page$/, async function() {
    await magentoRegisterPage.navigateTo();
});

When(/^I enter password (.*)$/, async function(password: string) {
    await magentoRegisterPage.fillRegisterForm("John", "Doe", "John@example.com", password, password);
});

Then(/^The message should be (.*)$/, async function(message: string) {
    expect(await magentoRegisterPage.getPasswordErrorText()).equal(message);
});
