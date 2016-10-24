'use strict';

angular.module('core').config(
  function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });
