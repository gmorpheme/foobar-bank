'use strict';

angular.module('boilerplate')
  .service('LoginValidationSrv', function LoginValidationSrv() {

    /**
     * Performs some very naive validation of properties on an object
     * @param  {Object} user The user object to validate
     * @return {Object}      A validation object
     */
    var _validate = function(user) {
      if (!user) {
        return {
          valid: false,
          message: 'You must enter a username and password'
        };
      }

      if (!user.username) {
        return {
          valid: false,
          message: 'You must enter a username'
        };
      }

      if (!user.password) {
        return {
          valid: false,
          message: 'You must enter a password'
        };
      }

      return {
        valid: true
      };
    };

    return {
      validate: _validate
    };

  });
