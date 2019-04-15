import { Given, Then, When } from "cucumber";
import { MagentoUserRoles } from "../pages/app/magentoUserRoles";
import { MagentoUserRolesNewRole } from "../pages/app/magentoUserRolesNewRole";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const magentoUserRoles: MagentoUserRoles = new MagentoUserRoles();
const magentoUserRolesNewRole: MagentoUserRolesNewRole = new MagentoUserRolesNewRole();

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
