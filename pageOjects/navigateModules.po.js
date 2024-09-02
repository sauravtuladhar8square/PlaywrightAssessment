const { expect } = require('@playwright/test');

exports.NavigateModules = class NavigateModules {
    constructor(page) {
        this.page = page;
    }

    async clickModule(moduleName) {
        await this.page.click(`//*[text() = '${moduleName}']`);
        await this.page.waitForTimeout(1000); // Wait for the page to load
    }

    async verifyPageUrl(expectedUrl) {
        const currentURL = this.page.url();
        expect(currentURL).toContain(expectedUrl, {
            message: `URL mismatch. Expected URL to contain: ${expectedUrl}, Actual: ${currentURL}`
        });
    }
}
