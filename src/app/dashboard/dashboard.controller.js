'use strict';

angular.module('boilerplate')
  .controller('DashboardCtrl', [
    '$location',
    'transfers',
    'UserSrv',
    function($location, transfers, UserSrv) {

      /**
       * Destroys a user session
       * @return {[type]} [description]
       */
      function logout() {
        UserSrv.destroySession();
        $location.path('/');
      }

      _.extend(this, {
        logout: logout,
        transfers: transfers.data.transfers
      });

    }]);
