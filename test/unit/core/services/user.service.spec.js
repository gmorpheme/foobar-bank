'use strict';

describe('The UserSrv Service', function() {

  var UserSrv;
  var $httpBackend;

  beforeEach(module('boilerplate'));

  beforeEach(inject(function(_UserSrv_,  _$httpBackend_) {
    UserSrv = _UserSrv_;
    $httpBackend = _$httpBackend_;
  }));

  it('should create a session', function() {
    $httpBackend.expectPOST('/api/session/').respond(200, {
      foo: 'bar'
    });

    UserSrv.createSession().then(function(data) {
      expect(data.data.foo).toBe('bar');
      $httpBackend.flush();
    });
  });

  it('should get and set a session', function() {
    UserSrv.setSession('1234');
    expect(UserSrv.getSession()).toBe('1234');
  });

  it('should destroy a session', function() {
    UserSrv.setSession('1234');
    expect(UserSrv.getSession()).toBe('1234');
    UserSrv.destroySession();
    expect(UserSrv.getSession()).toBe(undefined);
  });

});
