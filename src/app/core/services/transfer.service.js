'use strict';

angular.module('boilerplate')
  .service('TransferSrv', [
    '$http',
    '$location',
    'api',
    'UserSrv',
    function TransferSrv($http, $location, api, UserSrv) {

      /**
       * This function enriches the standard Angular response transforms with custom transfers
       * @param  {Array} defaults  An array of Anular's default transfform
       * @param  {Function} transform The new transform
       * @return {Array}           The enriched array
       */
      function appendTransform(defaults, transform) {
        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults];
        // Append the new transformation to the defaults
        return defaults.concat(transform);
      }

      function handleSessionError(value, response, status) {
        if (status > 400 && status < 500) {
          $location.path('/');
        }
        return value;
      }

      /**
       * Get a list of transfers
       * @return {Function} Promise
       */
      var _get = function() {
        return $http({
          url: [api.base, api.session.create, UserSrv.getSession(), '/', api.transfer.get].join(''),
          method: 'GET',
          transformResponse: appendTransform($http.defaults.transformResponse, handleSessionError)
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
          data: transfer,
          transformResponse: appendTransform($http.defaults.transformResponse, handleSessionError)
        });
      };

      return {
        get: _get,
        create: _create
      };

  }]);