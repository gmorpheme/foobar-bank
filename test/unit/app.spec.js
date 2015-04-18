// 'use strict';

// describe('The App config', function() {

//   it('should setup the "/" route with the correct config', function() {
//     module('boilerplate');
//     inject(function($route) {
//       expect($route.routes[ '/' ].controller).toBe('MainCtrl');
//       expect($route.routes[ '/' ].controllerAs).toBe('main');
//       expect($route.routes[ '/' ].templateUrl).toBe('app/main/main.html');
//     });
//   });

//   it('should setup the "/dashboard" route with the correct config', function() {
//     module('boilerplate');
//     inject(function($route) {
//       expect($route.routes[ '/dashboard' ].controller).toBe('DashboardCtrl');
//       expect($route.routes[ '/dashboard' ].controllerAs).toBe('dashboard');
//       expect($route.routes[ '/dashboard' ].templateUrl).toBe('app/dashboard/dashboard.html');
//       expect(typeof $route.routes[ '/dashboard' ].resolve.auth).toBe('function');
//       expect(typeof $route.routes[ '/dashboard' ].resolve.transfers).toBe('function');
//     });
//   });

//   it('should setup the "/dashboard/transfer" route with the correct config', function() {
//     module('boilerplate');
//     inject(function($route) {
//       expect($route.routes[ '/dashboard/transfer' ].controller).toBe('TransferCtrl');
//       expect($route.routes[ '/dashboard/transfer' ].controllerAs).toBe('newTransfer');
//       expect($route.routes[ '/dashboard/transfer' ].templateUrl).toBe('app/dashboard/transfer/transfer.html');
//       expect(typeof $route.routes[ '/dashboard/transfer' ].resolve.auth).toBe('function');
//     });
//   });

// });

describe('Routes test with resolves', function() {
    var httpMock = {};

    beforeEach(module('boilerplate', function($provide){
        // $provide('$http', httpMock);
    }));

    var $location, $route, $rootScope, httpBackend, UserSrv;

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_, $httpBackend, $templateCache, _UserSrv_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        UserSrv = _UserSrv_;

        $templateCache.put('templates/main.html', 'main HTML');

        httpMock.get = sinon.stub().returns('test');
    }));

    it('should load the login page on successful load of /', inject(function($injector) {
      httpBackend.expectGET('app/main/main.html').respond(200, 'Main template!');
      $location.path('/');
      $rootScope.$digest();

      expect($location.path()).toBe('/');
      expect($route.current.controller).toBe('MainCtrl');
    }));

    it('should load the dashboard page when a session exists', inject(function($injector){
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

    it('should load the transfer page when a session exists', inject(function($injector){
      UserSrv.setSession('1234');
      httpBackend.expectGET('app/dashboard/transfer/transfer.html').respond(200, 'Transfer template!');

      $location.path('/dashboard/transfer');
      $rootScope.$digest();

      expect($location.path()).toBe('/dashboard/transfer');
      expect($route.current.controller).toBe('TransferCtrl');
    }));

    it('should rediect to the index if no session exists when requesting the dashboard', inject(function($injector){
      UserSrv.setSession(undefined);
      httpBackend.expectGET('/api/session//transfer/').respond(404);
      httpBackend.expectGET('app/dashboard/dashboard.html').respond(200, 'Dashboard template!');
      httpBackend.expectGET('app/main/main.html').respond(200, 'Dashboard template!');

      $location.path('/dashboard');
      $rootScope.$digest();

      expect($location.path()).toBe('/');
      expect($route.current.controller).toBe('MainCtrl');
    }));

    it('should rediect to the index if no session exists when requesting the transfer page', inject(function($injector){
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
