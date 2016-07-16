'use strict';

angular.module('etablissements').config(
  function (SearchServiceProvider, FabSpeedDialServiceProvider, ETABLISSEMENTS) {

    SearchServiceProvider.register({
      factory: 'Etablissement',
      type: 'établissement',
      icon: 'ETABLISSEMENTS.ICONS.ETABLISSEMENT'
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'établissement',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      dialog: {
        templateUrl: 'modules/etablissements/views/nouvel-etablissement.dialog.html',
        controller: 'NouvelEtablissementController',
        controllerAs: 'nouvelEtablissementCtrl'
      }
    });

  });
