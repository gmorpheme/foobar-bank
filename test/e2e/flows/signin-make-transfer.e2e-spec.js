'use strict';

var loginPage = require('../login/login.object');
var dashboardPage = require('../dashboard/dashboard.object');
var transferPage = require('../transfer/transfer.object');

describe('The foobank', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  it('the user should signin, make a transfer and go back to the dashboard and then logout', function() {

    // Login page
    loginPage.enterDetailsAndSubmitForm('Username', 'Password');
    expect(browser.getLocationAbsUrl()).toBe('/dashboard');

    // Dashboard page
    dashboardPage.getTransferLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/dashboard/transfer');

    // Transfer page
    transferPage.addTransfer('2000', '348093840930');

    expect(transferPage.getSuccessMessage().isDisplayed()).toBeTruthy();

    transferPage.getBackToDashboardLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/dashboard');

    dashboardPage.getLogoutLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/');

  });

});
