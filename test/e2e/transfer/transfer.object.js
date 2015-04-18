'use strict';

// Primative page interfaces
function enterAmount(amount) {
  return element(by.model('newTransfer.transfer.amount')).sendKeys(amount);
}

function enterAccount(account) {
  return element(by.model('newTransfer.transfer.account')).sendKeys(account);
}

function makeTransfer() {
  return element(by.css('.transfer')).click();
}

function getBackToDashboardLink() {
  return element(by.css('#back'));
}

function getSuccessMessage() {
  return element(by.css('#transfer-success'));
}

function addTransfer(amount, account) {
  enterAmount(amount);
  enterAccount(account);
  makeTransfer();
}

module.exports = {
  addTransfer: addTransfer,
  enterAccount: enterAccount,
  enterAmount: enterAmount,
  makeTransfer: makeTransfer,
  getBackToDashboardLink: getBackToDashboardLink,
  getSuccessMessage: getSuccessMessage
};
