'use strict';

angular.module('benevoles').config(
  function ($stateProvider, PARAMS) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles/:filters',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        benevoles: function ($q, $timeout, Benevole) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Benevole.find()
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, benevoles) {
        if ($location.path().split('/').length === 2) {
          $state.go('benevoles.fiche', {
            benevoleId: _.first(benevoles)._id
          });
        }
      }
    }).

    state('benevoles.fiche', {
      url: '/:benevoleId',
      title: 'Bénévoles',
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl'
    });
  });
