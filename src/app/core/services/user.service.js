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
       * Creates a session on the server, returns a promise but local caches the session first
       * @param  {Object} user A user object
       * @return {Function}      A promise
       */
      var _createSession = function(user) {
        return $http({
          url: [api.base, api.session.create].join(''),
          method: 'POST',
          data: user
        });
      };

      /**
       * Return the current sesssion
       * @return {String} The current session
       */
      var _getSession = function() {
        return session;
      };

      var _setSession = function(ses) {
        session = ses;
      };

      /**
       * Destroys a current session and redirects to the landing page
       * @return {[type]} [description]
       */
      var _destroySession = function() {
        session = undefined;
      };

      return {
        createSession: _createSession,
        getSession: _getSession,
        setSession: _setSession,
        destroySession: _destroySession
      };

    }]);
