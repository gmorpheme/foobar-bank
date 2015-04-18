'use strict';

var dashboardPage = require('./dashboard.object');
var loginPage     = require('../login/login.object.js');
var GetTransferByIndex = dashboardPage.GetTransferByIndex;

describe('The foobank', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  it('should allow a user to navigate to the transfer page', function() {
    // We need to login to create a session on this page
    loginPage.enterDetailsAndSubmitForm('Username', 'Password');

    expect(dashboardPage.getTransferLink()).not.toBeUndefined();
    dashboardPage.getTransferLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/dashboard/transfer');
  });

  it('should log a user out and destroy their session', function() {
    // We need to login to create a session on this page
    loginPage.enterDetailsAndSubmitForm('Username', 'Password');

    expect(dashboardPage.getLogoutLink()).not.toBeUndefined();
    dashboardPage.getLogoutLink().click();
    expect(browser.getLocationAbsUrl()).toBe('/');

    // Going nack shouldn't work
    browser.get('http://localhost:3000/dashboard');
    expect(browser.getLocationAbsUrl()).toBe('/');
  });

  it('should list a set of transactions', function() {
    // We need to login to create a session on this page
    loginPage.enterDetailsAndSubmitForm('Username', 'Password');

    var transfer = new GetTransferByIndex(1);
    var transfer2 = new GetTransferByIndex(2);
    var transfer3 = new GetTransferByIndex(3);

    transfer.getAmount(function(amount) {
      expect(amount).toBe('398.45');
    });

    transfer.getAccount(function(account) {
      expect(account).toBe('4098093484');
    });

    transfer2.getAmount(function(amount) {
      expect(amount).toBe('38');
    });

    transfer2.getAccount(function(account) {
      expect(account).toBe('2398738347');
    });

    transfer3.getAmount(function(amount) {
      expect(amount).toBe('102');
    });

    transfer3.getAccount(function(account) {
      expect(account).toBe('2398747393');
    });

  });

});
