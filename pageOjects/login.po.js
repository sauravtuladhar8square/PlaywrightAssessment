const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#email';
        this.passwordInput = '//input[@placeholder="Password"]';
        this.loginButton = '//button[@id="submit"]';
        this.logOut = '//button[@id="logout"]';
        this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alertMessage = '//span[@id="error"]';
        this.signUp = '//button[@id="signup"]';
    }

    async login(username, password) {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin() {
        const loginValidation = await this.page.locator(this.loginValidation);
        await expect(this.page.locator(this.logOut)).toBeVisible();
        await expect(loginValidation).toHaveText('Click on any contact to view the Contact Details');
    }

    async verifyInvalidLogin() {
        const invalidLogin = await this.page.locator(this.alertMessage);
        await expect(invalidLogin).toHaveText('Incorrect username or password');
    }

    async verifyLogOut() {
        await this.page.locator(this.logOut).click();
        expect(this.signUp).toBeVisible;
    }
}