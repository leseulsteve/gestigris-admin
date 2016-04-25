'use strict';

angular.module('dashboard').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Gestigris',
      templateUrl: 'modules/dashboard/views/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl'
    });
  });
