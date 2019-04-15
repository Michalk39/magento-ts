import { Given, Then, When } from "cucumber";
import { MagentoCheckout } from "../pages/app/magentoCheckout";
import { MagentoHomePage } from "../pages/app/magentoHomePage";
import { MagentoProductsCatalog } from "../pages/app/magentoProductsCatalog";
import { Actions } from "../support/actions";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoHomePage: MagentoHomePage = new MagentoHomePage();
const magentoCheckout: MagentoCheckout = new MagentoCheckout();
const magentoProductsCatalog: MagentoProductsCatalog = new MagentoProductsCatalog();

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
    await magentoCheckout.fillEmailAdressField("wrongMail");
    await Actions.attachScreenshot(this);
    await magentoCheckout.fillFirstNameField("John");
    await magentoCheckout.clickNextButton();
    await Actions.attachScreenshot(this);
});

Then(/^He should see error message with invalid message information$/, async function() {
    expect(await magentoCheckout.isEmailErrorVisible()).equal(true);
});
