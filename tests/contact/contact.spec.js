import { test } from '@playwright/test';
import { LoginPage } from '../../pageOjects/login.po.js';
import { ContactPage } from '../../pageOjects/contact.po.js';
const testData = require('../../fixtures/loginFixture.json');
const contactTestData = require('../../fixtures/contactFixture.json');
const { authenticateUser, createEntity, deleteEntity, getEntity, validateEntity } = require('../../utils/helper.spec.js');
let accessToken;

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
})

test.describe('Contact testcases', () => {
    test('Contact Add test', async ({ page, context, request }) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
        const id = await getEntity(accessToken, '/contacts', '200', { request });
        await deleteEntity(accessToken, `/contacts/${id}`, { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    })

    test('Contact Edit test', async ({ page, request }) => {
        const Data = {
            "firstName": "Saurav",
            "lastName": "Tuladhar",
            "birthdate": "1995-06-30",
            "email": "sauravtuladhar143@gmail.com",
            "phone": "9849777665",
            "street1": "Nhyokha",
            "city": "Kathmandu",
            "stateProvince": "Bagmati",
            "postalCode": "44600",
            "country": "Nepal"
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact.lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        const id = await getEntity(accessToken, '/contacts', '200', { request });
        await deleteEntity(accessToken, `/contacts/${id}`, { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    })
})

test.afterEach(async ({ page }) => {
    await page.close();
})