'use strict';

var transferPage = require('./transfer.object');
var loginPage    = require('../login/login.object');
var dashboardPage = require('../dashboard/dashboard.object');

describe('The foobank', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');
    loginPage.enterDetailsAndSubmitForm('Username', 'Password');
    dashboardPage.getTransferLink().click();
  });

  it('should create a single transfer and show the user a success message', function() {
    transferPage.addTransfer('2000', '348093840930');

    expect(transferPage.getSuccessMessage().isDisplayed()).toBeTruthy();
  });

  it('should allow a user to navigate back tot he dashboard page', function() {
    expect(transferPage.getBackToDashboardLink()).not.toBeUndefined();
    transferPage.getBackToDashboardLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/dashboard');
  });

});
