'use strict';

angular.module('boilerplate')
  .controller('MainCtrl', [
    '$location',
    'LoginValidationSrv',
    'UserSrv',
    function($location, LoginValidationSrv, UserSrv) {

      /**
       * Method to set an error into th current scope
       * @param {String} err The error string
       */
      function setError(err) {
        this.error = err;
      }

      /**
       * A method called when a user is authenticated successfully
       */
      function loginSuccess(res) {
        UserSrv.setSession(res.data.id);
        $location.path('/dashboard');
      }

      /**
       * Handles user validation and login
       * @param  {Object} user A user object, to be validated
       * @public
       */
      function login(user) {
        var validation = LoginValidationSrv.validate(user);
        var boundError = this.setError.bind(this);

        if (!validation) {
          UserSrv.createSession(user).then(this.loginSuccess, boundError);
        } else {
          boundError(validation.message);
        }

      }

      _.extend(this, {
        login: login,
        setError: setError,
        loginSuccess: loginSuccess
      });

    }]);
