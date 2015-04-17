'use strict';

angular.module('boilerplate')
  .controller('DashboardCtrl', [
    'transfers',
    'UserSrv',
    function(transfers, UserSrv) {

      /**
       * Destroys a user session
       * @return {[type]} [description]
       */
      function logout() {
        UserSrv.destroySession();
      }

      _.extend(this, {
        logout: logout,
        transfers: transfers.data.transfers
      });

    } ]);
