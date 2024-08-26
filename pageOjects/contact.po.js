const { expect } = require("@playwright/test");


exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContact = '//button[@id="add-contact"]';
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.dob = '//input[@placeholder="yyyy-MM-dd"]';
        this.email = '//input[@id="email"]';
        this.phone = '//input[@id="phone"]';
        this.address = '//input[@placeholder="Address 1"]';
        this.city = '//input[@placeholder="City"]';
        this.state = '//input[@placeholder="State or Province"]';
        this.postal = '//input[@placeholder="Postal Code"]';
        this.country = '//input[@placeholder="Country"]';
        this.Save = '//button[@id="submit"]';
        this.savedFirstName = '//span[@id="firstName"]';
        this.savedLastName = '//span[@id="lastName"]';
        this.savedDOB = '//span[@id="birthdate"]';
        this.savedEmail = '//span[@id="email"]';
        this.savedPhone = '//span[@id="phone"]';
        this.savedAddress = '//span[@id="street1"]';
        this.savedCity = '//span[@id="city"]';
        this.savedState = '//span[@id="stateProvince"]';
        this.savedPostal = '//span[@id="postalCode"]';
        this.savedCountry = '//span[@id="country"]';
        this.viewCreatedContact = '//th[contains(text(),"Name")]//following::td[2]';
        this.editContact = '//button[@id="edit-contact"]';


    }

    async contactAdd(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {

        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.dob).fill(dateOfBirth);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.state).fill(state);
        await this.page.locator(this.postal).fill(postal);
        await this.page.locator(this.country).fill(country);
        await this.page.locator(this.Save).click();
    }

    async validateContactCreated(fName, lName, dob, email, phone, address, city, state, postal, country) {
        //await this.page.locator(this.viewCreatedContact).click();
        const fNameValidation = await this.page.locator(this.savedFirstName);
        const lNameValidation = await this.page.locator(this.savedLastName);
        const dobValidation = await this.page.locator(this.savedDOB);
        const emailValidation = await this.page.locator(this.savedEmail);
        const phoneValidation = await this.page.locator(this.savedPhone);
        const addressValidation = await this.page.locator(this.savedAddress);
        const cityValidation = await this.page.locator(this.savedCity);
        const stateValidation = await this.page.locator(this.savedState);
        const postalValidation = await this.page.locator(this.savedPostal);
        const countryValidation = await this.page.locator(this.savedCountry);
        await expect(fNameValidation).toHaveText(fName);
        await expect(lNameValidation).toHaveText(lName);
        await expect(dobValidation).toHaveText(dob);
        await expect(emailValidation).toHaveText(email);
        await expect(phoneValidation).toHaveText(phone);
        await expect(addressValidation).toHaveText(address);
        await expect(cityValidation).toHaveText(city);
        await expect(stateValidation).toHaveText(state);
        await expect(postalValidation).toHaveText(postal);
        await expect(countryValidation).toHaveText(country);
    }

    async viewContact() {
        await this.page.locator(this.viewCreatedContact).click();
    }

    async contactEdit(firstName) {
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Save).click();
    }

}





