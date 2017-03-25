'use strict';

angular.module('interventions').config(
  function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/plage-interventions',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        plages: function ($q, $timeout, PlageIntervention, PARAMS, $stateParams) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            ($stateParams.filters ? PlageIntervention.formatFilters($stateParams.filters) : $q.when({})).then(function (query) {
              return PlageIntervention.find(query);
            })
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, plages, $stateParams) {
        if ($location.path().split('/').length === 2 && plages.length) {
          $state.go('interventions.fiche', {
            plageId: _.get(_.first(plages), '_id'),
            filters: $stateParams.filters
          });
        }
      }
    }).

    state('interventions.fiche', {
      url: '/:plageId',
      title: 'Plages d\'interventions',
      params: {
        filters: null
      },
      templateUrl: 'modules/interventions/views/plages-interventions.section.html',
      controller: 'PlagesInterventionsSectionController',
      controllerAs: 'plagesInterventionsSectionCtrl'
    });

  });
