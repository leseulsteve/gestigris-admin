'use strict';

angular.module('interventions').config(
  function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/plage-interventions',
      title: 'Plages d\'interventions',
      params: {
        filters: null
      },
      templateUrl: 'modules/interventions/views/plages-interventions.section.html',
      controller: 'InterventionsSectionController',
      controllerAs: 'interventionsSectionCtrl'
    }).

    state('interventions.fiche', {
      url: '/:plageId'
    });

  });
