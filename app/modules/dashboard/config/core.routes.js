'use strict';

angular.module('dashboard').config(
  function ($stateProvider) {

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Gestigris',
      templateUrl: 'modules/dashboard/views/dashboard.html'
    });
  });
