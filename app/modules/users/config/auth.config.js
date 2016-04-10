'use strict';

angular.module('users')
  .config(function (UserAuthProvider) {

    UserAuthProvider.config({
      userSchema: 'User',
      loginStateName: 'login',
      signinForm: {
        animate: true
      },
      sendPasswordToken: {
        urlRedirection: 'http://localhost:9001/#!/reset_password',
      },
      confirmEmail: {
        urlRedirection: 'http://localhost:9001/#!/confirm_email',
      }
    });
  });
