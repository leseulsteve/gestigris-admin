'use strict';

angular.module('etablissements').config(
  function ($stateProvider) {

    $stateProvider.

    state('etablissements', {
      url: '/etablissements',
      title: 'Établissements',
      templateUrl: 'modules/etablissements/views/etablissements.section.html',
      controller: 'EtablissementsSectionController',
      controllerAs: 'etablissementsSectionCtrl',
      resolve: {
        etablissements: function (Etablissement) {
          return Etablissement.find();
        }
      },
      toolbar: {
        tools: [{
          icon: 'content:add',
          action: 'addEtablissement'
        }]
      }
    });
  });
