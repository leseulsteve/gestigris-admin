'use strict';

angular.module('benevoles').config(
  function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        benevoles: function ($q, $timeout, Benevole, PARAMS, $stateParams) {
          $stateParams.filters = _.assign({
            actif: true
          }, $stateParams.filters);
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Benevole.search($stateParams.filters)
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, benevoles, $stateParams) {
        if ($location.path().split('/').length === 2 && benevoles.length) {
          $state.go('benevoles.fiche', {
            benevoleId: _.get(_.first(benevoles), '_id'),
            filters: $stateParams.filters
          });
        }
      }
    }).

    state('benevoles.fiche', {
      url: '/:benevoleId',
      title: 'Bénévoles',
      params: {
        filters: null
      },
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl'
    });
  });
