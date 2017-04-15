'use strict';

angular.module('etablissements').config(
  function ($stateProvider) {

    $stateProvider.

    state('etablissements', {
      url: '/etablissements',
      title: 'Établissements',
      params: {
        filters: null
      },
      templateUrl: 'modules/etablissements/views/etablissements.section.html',
      controller: 'EtablissementsSectionController',
      controllerAs: 'etablissementsSectionCtrl'
    }).

    state('etablissements.fiche', {
      url: '/:etablissementId'
    });

  });
