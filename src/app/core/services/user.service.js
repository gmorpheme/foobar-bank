'use strict';

angular.module('boilerplate')
  .service('UserSrv', [
    '$http',
    '$location',
    'api',
    function UserSrv($http, $location, api) {

      /**
       * Store a local copy of our session ID
       * @type {String}
       */
      var session;

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

      /**
       * Creates a session on the server, returns a promise but local caches the session first
       * @param  {Object} user A user object
       * @return {Function}      A promise
       */
      var _createSession = function(user) {
        return $http({
          url: [api.base, api.session.create].join(''),
          method: 'POST',
          data: user,
          transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
            session = value.id;
            return value;
          })
        });
      };

      /**
       * Return the current sesssion
       * @return {String} The current session
       */
      var _getSession = function() {
        return session;
      };

      /**
       * Destroys a current session and redirects to the landing page
       * @return {[type]} [description]
       */
      var _destroySession = function() {
        session = undefined;
        $location.path('/');
      };

      return {
        createSession: _createSession,
        getSession: _getSession,
        destroySession: _destroySession
      };

    }]);
