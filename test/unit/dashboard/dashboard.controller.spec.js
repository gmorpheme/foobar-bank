'use strict';

describe('The Dashboard controller', function() {
  var scope;
  var DashboardCtrl;
  var UserSrv;

  beforeEach(module('boilerplate'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    UserSrv = {
      destroySession: sinon.stub()
    };

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      transfers: {
        data: {
          transfers: [{
            foo: 'bar'
          }]
        }
      },
      UserSrv: UserSrv
    });
  }));

  it('should expose the correct properties to the view', inject(function() {
    expect(DashboardCtrl).not.toBeUndefined();
    expect(DashboardCtrl.logout).not.toBeUndefined();
    expect(DashboardCtrl.transfers).not.toBeUndefined();
  }));

  it('should call the user service to initiate a logout', inject(function() {
    DashboardCtrl.logout();
    expect(UserSrv.destroySession.called).toBeTruthy();
  }));

  it('should add the injected transfers into the scope', inject(function() {
    expect(DashboardCtrl.transfers[0].foo).toBe('bar');
  }));

});
