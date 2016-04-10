'use strict';

angular.module('users')
  .config(function (UserAuthProvider) {

    UserAuthProvider.config({
      userSchema: 'User',
      loginStateName: 'home'
    });
  });
