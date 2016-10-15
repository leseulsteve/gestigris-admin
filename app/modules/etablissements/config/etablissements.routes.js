'use strict';

angular.module('etablissements').config(
  function($stateProvider) {

    $stateProvider.

    state('etablissements', {
      url: '/etablissements',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        etablissements: function($q, $timeout, Etablissement, PARAMS) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Etablissement.find()
          ]).then(function(results) {
            return _.last(results);
          });
        }
      },
      controller: function($state, $location, etablissements) {
        if ($location.path().split('/').length === 2) {
          $state.go('etablissements.fiche', {
            etablissementId: _.first(etablissements)._id
          });
        }
      }
    }).

    state('etablissements.fiche', {
      url: '/:etablissementId',
      title: 'Établissements',
      templateUrl: 'modules/etablissements/views/etablissements.section.html',
      controller: 'EtablissementsSectionController',
      controllerAs: 'etablissementsSectionCtrl'
    });

  });