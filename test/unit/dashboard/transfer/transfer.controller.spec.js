'use strict';

describe('The Transfer controller', function() {
  var scope;
  var TransferCtrl;
  var TransferSrv;

  beforeEach(module('foobank'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    TransferSrv = {
      create: sinon.stub().returns({
        then: sinon.stub()
      })
    };

    TransferCtrl = $controller('TransferCtrl', {
      $scope: scope,
      TransferSrv: TransferSrv
    });
  }));

  it('should expose the correct properties to the view', inject(function() {
    expect(TransferCtrl).not.toBeUndefined();
    expect(TransferCtrl.create).not.toBeUndefined();
    expect(TransferCtrl.transferCreateSuccess).not.toBeUndefined();
    expect(TransferCtrl.transferCreateFailure).not.toBeUndefined();
  }));

  it('should mark a transfer as successfully created', inject(function() {
    TransferCtrl.transferCreateSuccess();
    expect(TransferCtrl.success).toBeTruthy();
  }));

  it('should mark a transfer as failed', inject(function() {
    TransferCtrl.transferCreateFailure();
    expect(TransferCtrl.error).toBeTruthy();
  }));

  it('should call the transfer service to initiate a transfer', inject(function() {
    TransferCtrl.create();
    expect(TransferSrv.create.called).toBeTruthy();
  }));

});
