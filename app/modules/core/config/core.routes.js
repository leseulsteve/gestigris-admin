'use strict';

angular.module('core').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Home',
      template: ''
    });
  });
