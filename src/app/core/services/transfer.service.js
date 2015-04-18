'use strict';

angular.module('foobank')
  .service('TransferSrv', [
    '$http',
    'api',
    'UserSrv',
    function TransferSrv($http, api, UserSrv) {

      /**
       * Get a list of transfers
       * @return {Function} Promise
       */
      var _get = function() {
        return $http({
          url: [api.base, api.session.create, UserSrv.getSession(), '/', api.transfer.get].join(''),
          method: 'GET'
        });
      };

      /**
       * Create a transfer
       * @param  {Object} transfer A transfer object
       * @return {Function}          A promise
       */
      var _create = function(transfer) {
        return $http({
          url: [api.base, api.session.create, UserSrv.getSession(), '/', api.transfer.create].join(''),
          method: 'POST',
          data: transfer
        });
      };

      return {
        get: _get,
        create: _create
      };

    }]);
