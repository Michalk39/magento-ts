import { Given, Then, When } from "cucumber";
import { MagentoCustomerGroups } from "../pages/app/magentoCustomerGroups";
import { MagentoCustomerGroupsEdit } from "../pages/app/magentoCustomerGroupsEdit";
import { CustomWait } from "../support/wait";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoCustomerGroups: MagentoCustomerGroups = new MagentoCustomerGroups();
const magentoCustomerGroupsEdit: MagentoCustomerGroupsEdit = new MagentoCustomerGroupsEdit();

Given(/^Navigate to Customers > Customer Groups$/, async function() {
    await magentoCustomerGroups.navigateTo();
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
