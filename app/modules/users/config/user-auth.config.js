'use strict';

angular.module('gestigris-common')

.config(function (UserAuthProvider) {

  UserAuthProvider.config({
    userSchema: 'User',
    loginStateName: 'login'
  });
});
