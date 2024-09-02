import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageOjects/login.po';
import { NavigateModules } from '../pageOjects/navigateModules.po.js';
const testData = require('../fixtures/loginFixture.json');
const navigateData = require('../fixtures/navigateModules.json'); // Import the JSON data

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    const validUser = testData.users.find(user => user.isValid);
    await login.login(validUser.userName, validUser.password);
    await login.verifyValidLogin();
});

test.describe('Navigate and validate pages', () => {
    test('Verify pages are opening as expected and validate URL', async ({ page }) => {
        const navigateModules = new NavigateModules(page);

        for (const module of navigateData) {
            await navigateModules.clickModule(module.module);
            await navigateModules.verifyPageUrl(module.url);
        }
    });
});

test.afterEach(async ({ page }) => {
    await page.close();
});
