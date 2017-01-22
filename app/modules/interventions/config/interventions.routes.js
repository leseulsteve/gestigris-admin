'use strict';

angular.module('interventions').config(
  function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/plage-interventions',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        plages: function ($q, $timeout, PlageIntervention, PARAMS) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            PlageIntervention.find()
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, plages) {
        if ($location.path().split('/').length === 2) {
          $state.go('interventions.fiche', {
            plageId: _.first(plages)._id
          });
        }
      }
    }).

    state('interventions.fiche', {
      url: '/:plageId',
      title: 'Plages d\'interventions',
      templateUrl: 'modules/interventions/views/plages-interventions.section.html',
      controller: 'PlagesInterventionsSectionController',
      controllerAs: 'plagesInterventionsSectionCtrl'
    });

  });
