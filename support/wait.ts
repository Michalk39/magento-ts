import { browser, ElementFinder } from 'protractor';

class CustomWait {

    static until = browser.ExpectedConditions;

    public static timeouts = {
        "tiny": 1000,
        "short": 3000,
        "medium": 10000,
        "long": 30000
    }

    public static async waitForTextInElement(element, text: string, ms: number) {
        await browser.wait(this.until.textToBePresentInElement(element, text), ms);
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
        await browser.wait(this.until.invisibilityOf(element), ms);
    };

    public static async waitForAttributeToContain(item: ElementFinder, attribute: string) {
       return await browser.wait(async function() {
            return await item.getAttribute(attribute);
        }, this.timeouts.medium);
    };

    public static async waitForElementToBeClickable(element, timeout = this.timeouts.short) {
        await browser.wait(this.until.elementToBeClickable(element), timeout);
    }
}

export { CustomWait };