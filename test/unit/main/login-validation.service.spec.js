'use strict';

describe('The LoginValidationSrv Service', function() {

  var LoginValidationSrv;

  beforeEach(module('foobank'));

  beforeEach(inject(function(_LoginValidationSrv_) {
    LoginValidationSrv = _LoginValidationSrv_;
  }));

  it('should expose the correct public methods', function() {
    expect(LoginValidationSrv.validate).toBeTruthy();
  });

  it('should correctly invalidate an undefined argument', function() {
    expect(LoginValidationSrv.validate(undefined).valid).toBe(false);
    expect(LoginValidationSrv.validate(undefined).message).toBe('You must enter a username and password');
  });

  it('should correctly invalidate an undefined username', function() {
    expect(LoginValidationSrv.validate({
      password: 'foo'
    }).valid).toBe(false);
    expect(LoginValidationSrv.validate({
      password: 'foo'
    }).message).toBe('You must enter a username');
  });

  it('should correctly invalidate an undefined password', function() {
    expect(LoginValidationSrv.validate({
      username: 'foo'
    }).valid).toBe(false);
    expect(LoginValidationSrv.validate({
      username: 'foo'
    }).message).toBe('You must enter a password');
  });

  it('should correctly validate a valid user', function() {
    expect(LoginValidationSrv.validate({
      username: 'foo',
      password: 'bar'
    })).toBeUndefined();
  });

});
