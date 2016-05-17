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

    state('fiche-intervention', {
      url: '/intervention/:_id',
      resolve: {
        plage: function (PlageIntervention) {
          return PlageIntervention.find().then(function (plages) {
            return plages[0];
          });
        }
      },
      template: '<plage-intervention-fiche plage="plage" layout="column" flex></plage-intervention-fiche>',
      controller: function ($scope, plage) {
        $scope.plage = plage;
      }
    });
  });
