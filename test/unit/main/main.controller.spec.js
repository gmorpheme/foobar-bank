'use strict';

describe('The Main controller', function() {
  var scope;
  var MainCtrl;
  var $location;
  var UserSrv;
  var validity;

  var LoginValidationSrv = {
    validate: sinon.stub()
  };

  LoginValidationSrv.validate.onCall(0).returns(undefined);

  LoginValidationSrv.validate.returns({
    valid: false
  });

  beforeEach(module('boilerplate'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    $location = {
      path: sinon.spy()
    };

    UserSrv = {
      createSession: sinon.stub().returns({
        then: sinon.stub()
      })
    };

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: $location,
      LoginValidationSrv: LoginValidationSrv,
      UserSrv: UserSrv
    });

  }));

  it('should expose the correct properties to the view', inject(function() {
    expect(MainCtrl).not.toBeUndefined();
    expect(MainCtrl.login).not.toBeUndefined();
    expect(MainCtrl.loginSuccess).not.toBeUndefined();
    expect(MainCtrl.setError).not.toBeUndefined();
  }));

  it('should set an error into the scope', inject(function() {
    MainCtrl.setError('An error');
    expect(MainCtrl.error).toBe('An error');
  }));

  it('should redirect to the dashboard when successfully logged in', inject(function() {
    MainCtrl.loginSuccess();
    expect($location.path.called).toBeTruthy();
    expect($location.path.calledWith('/dashboard')).toBeTruthy();
  }));

  it('call the login service if user is valid', inject(function() {
    MainCtrl.login({
      username: 'foo',
      password: 'bar'
    });
    expect(LoginValidationSrv.validate.called).toBeTruthy();
    expect(UserSrv.createSession.called).toBeTruthy();
  }));

  it('call the error service if user is not valid', inject(function() {
    MainCtrl.login(undefined);
    expect(LoginValidationSrv.validate.called).toBeTruthy();
    expect(UserSrv.createSession.called).toBe(false);
  }));

});
