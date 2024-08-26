const axios = require('axios');
import { expect } from '@playwright/test';
const cookie = require('cookie');

let accessToken, deleteUserId, apiUrl

async function authenticateUser(username, password, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
    };
    const requestBody = {
        email: username,
        password: password,
    };
    const response = await request.post(apiUrl + "/users/login", {
        data: JSON.stringify(requestBody),
        headers,
    });

    const statusCode = response.status();
    expect(statusCode).toBe(200);

    // Extract the Set-Cookie header
    const cookiesHeader = response.headers()['set-cookie'];
    expect(cookiesHeader).toBeDefined();
    console.log("@@@@@@ Cookies Header: ", cookiesHeader);

    // Initialize token variable
    let token;

    // Handle the case where cookiesHeader is a single string
    if (typeof cookiesHeader === 'string') {
        console.log("Single Cookie String: ", cookiesHeader); // Log the cookie string

        // Find and extract the token from the cookie string
        if (cookiesHeader.includes('token=')) {
            token = cookiesHeader.split('token=')[1].split(';')[0].trim();
        }
    } else if (Array.isArray(cookiesHeader)) {
        for (const cookie of cookiesHeader) {
            console.log("Cookie: ", cookie); // Log each individual cookie string

            // Find and extract the token from the cookie string
            if (cookie.includes('token=')) {
                token = cookie.split('token=')[1].split(';')[0].trim();
                break;
            }
        }
    } else {
        console.log("Unexpected format for Set-Cookie header.");
    }

    console.log("########## Token: " + token);
    expect(token).toBeDefined(); // Ensure token is defined

    return token; // Return the extracted token
}

async function getApiBaseUrl() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = 'https://thinking-tester-contact-list.herokuapp.com'; //https://mmpv2vuat.digitalmta.com //https://mmp2backenddev.vanillatech.asia
    }
    return apiUrl;
}
async function createEntity(userData, accessToken, module, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });

    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);
    if (responseBody && responseBody.id) {
        return responseBody.id;
    } else {
        return null; // Or you can return any default value if ID is not present
    }
}

async function deleteEntity(accessToken, module, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.delete(apiUrl + module, {
        headers,
    });
    console.log("###############" + JSON.stringify(response))
    const statusCode = response.status();
    expect(statusCode).toBe(204);
}

async function validateEntity(accessToken, module, status, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': "Bearer " + accessToken,
    };
    const response = await request.get(apiUrl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
}

async function getCurrentDateTimeStamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it is zero-based
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

module.exports = { authenticateUser, createEntity, deleteEntity, validateEntity, getCurrentDateTimeStamp };
