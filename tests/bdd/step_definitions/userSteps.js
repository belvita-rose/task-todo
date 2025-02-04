const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const axios = require('axios');

Given('the registration page is open', function () {
    
});

When('I enter {string} as email and {string} as password', function (email, password) {
    this.email = email;
    this.password = password;
});

When('I submit the registration form', async function () {
    const response = await axios.post('http://localhost:3000/api/register', {
        email: this.email,
        password: this.password
    });
    this.response = response;
});

Then('I should see {string}', function (message) {
    assert.strictEqual(this.response.data, message);
});

