const { Status, After, Before } = require("cucumber");

import { browser } from "protractor";
import { Actions } from "./actions";
import { BrowserActions } from "./browser";
import { MagentoStoresConfigurationGeneralWeb } from "../pages/app/magentoStoresConfigurationGeneralWeb";

var { setDefaultTimeout } = require("cucumber");

const magentoStoresConfigurationGeneralWeb: MagentoStoresConfigurationGeneralWeb = new MagentoStoresConfigurationGeneralWeb();

setDefaultTimeout(99999 * 1000);

Before(async function(scenario) {
    // await BrowserActions.get("/");
    await Actions.attachScreenshot(this);
    // await Actions.log(`Loaded "/"`);
});

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        await Actions.attachScreenshot(this);
    }
    await BrowserActions.clearBrowserData();
});

After({ tags: "@https" }, async function() {
    await magentoStoresConfigurationGeneralWeb.navigateTo();
    await magentoStoresConfigurationGeneralWeb.configureHttpsData("No");
});
