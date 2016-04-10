'use strict';

angular.module('users').controller('LoginController',
  function ($scope, $state) {

    this.handleLogin = function (loginForm, credentials) {
      $scope.signin(loginForm, credentials);
    };

    this.handleLogedIn = function () {
      $state.go('interventions');
    };
  });
