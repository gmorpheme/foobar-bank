'use strict';

describe('Routes test with resolves', function() {
  beforeEach(module('boilerplate'));

  var $location;
  var $route;
  var $rootScope;
  var UserSrv;
  var httpBackend;

  beforeEach(inject(function(_$location_, _$route_, _$rootScope_, $httpBackend, $templateCache, _UserSrv_) {
    $location = _$location_;
    $route = _$route_;
    $rootScope = _$rootScope_;
    httpBackend = $httpBackend;
    UserSrv = _UserSrv_;
  }));

  it('should load the login page on successful load of /', inject(function() {
    httpBackend.expectGET('app/main/main.html').respond(200, 'Main template!');
    $location.path('/');
    $rootScope.$digest();

    expect($location.path()).toBe('/');
    expect($route.current.controller).toBe('MainCtrl');
  }));

  it('should load the dashboard page when a session exists', inject(function() {
    UserSrv.setSession('1234');
    httpBackend.expectGET('/api/session/1234/transfer/').respond(200, {
      foo: 'bar'
    });
    httpBackend.expectGET('app/dashboard/dashboard.html').respond(200, 'Dashboard template!');

    $location.path('/dashboard');
    $rootScope.$digest();

    expect($location.path()).toBe('/dashboard');
    expect($route.current.controller).toBe('DashboardCtrl');
  }));

  it('should load the transfer page when a session exists', inject(function() {
    UserSrv.setSession('1234');
    httpBackend.expectGET('app/dashboard/transfer/transfer.html').respond(200, 'Transfer template!');

    $location.path('/dashboard/transfer');
    $rootScope.$digest();

    expect($location.path()).toBe('/dashboard/transfer');
    expect($route.current.controller).toBe('TransferCtrl');
  }));

  it('should rediect to the index if no session exists when requesting the dashboard', inject(function() {
    UserSrv.setSession(undefined);
    httpBackend.expectGET('/api/session//transfer/').respond(404);
    httpBackend.expectGET('app/dashboard/dashboard.html').respond(200, 'Dashboard template!');
    httpBackend.expectGET('app/main/main.html').respond(200, 'Dashboard template!');

    $location.path('/dashboard');
    $rootScope.$digest();

    expect($location.path()).toBe('/');
    expect($route.current.controller).toBe('MainCtrl');
  }));

  it('should rediect to the index if no session exists when requesting the transfer page', inject(function() {
    UserSrv.setSession(undefined);
    httpBackend.expectGET('app/dashboard/transfer/transfer.html').respond(200, 'Transfer template!');
    httpBackend.expectGET('app/main/main.html').respond(200, 'Dashboard template!');

    $location.path('/dashboard/transfer');
    $rootScope.$digest();

    expect($location.path()).toBe('/');
    expect($route.current.controller).toBe('MainCtrl');
  }));

  afterEach(function() {
    httpBackend.flush();
  });
});
