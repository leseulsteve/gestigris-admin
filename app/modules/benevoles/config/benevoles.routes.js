'use strict';

angular.module('benevoles').config(
  function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      title: 'Bénévoles',
      params: {
        filters: null
      },
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl'
    }).

    state('benevoles.fiche', {
      url: '/:benevoleId'
    });
  });
