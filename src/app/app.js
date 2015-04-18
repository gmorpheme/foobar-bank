'use strict';

angular.module('foobank', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngRoute',
  'ConfigModule'
  ])
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/dashboard', {
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboard',
          resolve: {
            auth: function(UserSrv, $location) {
              if (!UserSrv.getSession()) {
                $location.path('/');
              }
            },

            transfers: function(TransferSrv) {
              return TransferSrv.get();
            }
          }
        })
        .when('/dashboard/transfer', {
          templateUrl: 'app/dashboard/transfer/transfer.html',
          controller: 'TransferCtrl',
          controllerAs: 'newTransfer',
          resolve: {
            auth: function(UserSrv, $location) {
              if (!UserSrv.getSession()) {
                $location.path('/');
              }
            }
          }
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
