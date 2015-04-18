'use strict';

// Primative page interfaces
function getTransferLink() {
  return element(by.css('#transfer'));
}

function getLogoutLink() {
  return element(by.css('#logout'));
}

var GetTransferByIndex = function(index) {

  this.getAmount = function(next) {
    element(by.css('#transfer-' + index + '-amount')).getText().then(next);
  };

  this.getAccount = function(next) {
    element(by.css('#transfer-' + index + '-account')).getText().then(next);
  };

  this.getDate = function(next) {
    element(by.css('#transfer-' + index + '-date')).getText().then(next);
  };

};

module.exports = {
  getTransferLink: getTransferLink,
  getLogoutLink: getLogoutLink,
  GetTransferByIndex: GetTransferByIndex
};
