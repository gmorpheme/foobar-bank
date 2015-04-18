'use strict';

describe('The TransferSrv Service', function() {

  var TransferSrv;
  var UserSrv;
  var $httpBackend;

  beforeEach(module('foobank'));

  beforeEach(inject(function(_TransferSrv_,  _$httpBackend_, _UserSrv_) {
    TransferSrv = _TransferSrv_;
    $httpBackend = _$httpBackend_;
    UserSrv = _UserSrv_;
    UserSrv.setSession('1234');
  }));

  it('should should request a list of transfers', function() {
    $httpBackend.expectGET('/api/session/1234/transfer/').respond(200, {
      foo: 'bar'
    });

    TransferSrv.get().then(function(data) {
      expect(data.data.foo).toBe('bar');
    });
  });

  it('should should create a new transfer', function() {
    $httpBackend.expectPOST('/api/session/1234/transfer/').respond(200, {
      blork: 'foo'
    });

    TransferSrv.create({
      foo: 'bar'
    }).then(function(data) {
      expect(data.data.blork).toBe('foo');
    });
  });

  afterEach(function() {
    $httpBackend.flush();
  });

});
