import { When, Then, Before } from "cucumber";
import { Google } from "../pages/app/google";
import { Actions } from "../support/actions";
import { ImageCompare } from "../support/imageCompare";
import { $ } from "protractor";
import { MagentoAdminLogin } from "../pages/app/magentoAdminLogin";
import { MagentoDashboard } from "../pages/app/magentoDashboard";
import { async } from "q";
import { BrowserActions } from "../support/browser";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Google = new Google();
const imageCompare: ImageCompare = new ImageCompare();
const magentoLoginPage: MagentoAdminLogin = new MagentoAdminLogin();
const magentoDashboard: MagentoDashboard = new MagentoDashboard();

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

When(/^I enter correct data$/, async function() {
    await BrowserActions.get(MagentoAdminLogin.url);
    await magentoLoginPage.logIn('admin', '123123q');
})

Then(/^I should login successfully$/, async function() {
    //Verify login
})
