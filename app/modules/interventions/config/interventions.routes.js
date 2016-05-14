'use strict';

angular.module('interventions').config(
  function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/interventions',
      templateUrl: 'modules/interventions/views/interventions.section.html',
      controller: 'InterventionsSectionController',
      controllerAs: 'interventionsSectionCtrl'
    }).

    state('fiche', {
      url: '/fiche',
      template: '<plage-intervention-fiche plage="plage" layout="column" flex></plage-intervention-fiche>',
      controller: function ($scope, PlageIntervention) {
        PlageIntervention.find().then(function (plages) {
          $scope.plage = plages[0];
        });
      }
    });
  });
