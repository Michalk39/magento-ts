import { browser, ExpectedConditions, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

class CustomWait {

    private static EC = protractor.ExpectedConditions;

    public static timeouts = {
        "tiny": 1000,
        "short": 3000,
        "medium": 10000,
        "long": 30000
    }

    public static async waitForTextInElement(element, text: string, ms: number) {
        await browser.wait(browser.ExpectedConditions.textToBePresentInElement(element, text), ms);
    };

    public static async waitForNewHandlerToLoad(ms: number) {
        await browser.sleep(ms);
    };

    public static async waitForLoad(ms: number) {
        await browser.sleep(ms);
    };
    public static async waitForEmail(ms: number) {
        await browser.sleep(ms);
    };

    public static async waitForInvisibility(element, ms: number) {
        await browser.wait(browser.ExpectedConditions.invisibilityOf(element), ms);
    };

    public static async waitForAttributeToContain(item: ElementFinder, attribute: string) {
       return await browser.wait(async function() {
            return await item.getAttribute(attribute);
        }, 5000);
    };

    public static async waitForElementToBeClickable(element, timeout = this.timeouts.short) {
        await browser.wait(this.EC.elementToBeClickable(element), timeout);
    }
}

export { CustomWait };