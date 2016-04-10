'use strict';

angular.module('users')
  .config(function ($stateProvider) {

    $stateProvider.

    state('bottin', {
      url: '/bottin',
      templateUrl: 'modules/users/views/bottin.section.html',
      controller: 'BottinController',
      controllerAs: 'bottinCtrl'
    });
  });
