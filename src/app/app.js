'use strict';

angular.module('boilerplate', [
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
            transfers: function(TransferSrv) {
              return TransferSrv.get();
            }
          }
        })
        .when('/dashboard/transfer', {
          templateUrl: 'app/dashboard/transfer/transfer.html',
          controller: 'TransferCtrl',
          controllerAs: 'newTransfer'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
