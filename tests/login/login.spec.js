import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageOjects/login.po';
import testData from '../../fixtures/loginFixture.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Login tests', () => {
    testData.users.forEach(user => {
        test(`Login test for username: ${user.userName} and password: ${user.password}`, async ({ page }) => {
            const login = new LoginPage(page);
            await login.login(user.userName, user.password);
            if (user.isValid) {
                await login.verifyValidLogin();
            } else {
                await login.verifyInvalidLogin();
            }
        });
    });

    test('LogOut test', async ({ page }) => {
        const login = new LoginPage(page);
        const validUser = testData.users.find(user => user.isValid);
        await login.login(validUser.userName, validUser.password);
        /* await login.login(testData.validUser.userName, testData.validUser.password);
        await login.verifyValidLogin(); */
        await login.verifyLogOut();
    })
});

test.afterEach(async ({ page }) => {
    await page.close();
});
