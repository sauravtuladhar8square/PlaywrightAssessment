import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageOjects/login.po';
const testData = require('../../fixtures/loginFixture.json');

let accessToken, apiResponse

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Valid login tests', () => {
    test('Login using valid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, testData.validUser.password);
        await login.verifyValidLogin();
    });
})

test.describe('Invalid login tests', () => {
    test('Login using invalid username and valid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName, testData.validUser.password);
        await login.verifyInvalidLogin();
    });

    test('Login using valid username and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, testData.invalidUser.password);
        await login.verifyInvalidLogin();
    });

    test('Login using invalid username and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName, testData.invalidUser.password);
        await login.verifyInvalidLogin();
    })

    test('Login using no username and no password and click login', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("", "");
        await login.verifyInvalidLogin();

    })

    test('Login using no username and click on login', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("", testData.validUser.password);
        await login.verifyInvalidLogin();
    })

    test('Login using no password and click on login', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, "");
        await login.verifyInvalidLogin();
    })
})

test.afterEach(async ({ page }) => {
    await page.close();
})