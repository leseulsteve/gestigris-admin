'use strict';

angular.module('etablissements').config(
  function (SearchServiceProvider, FabSpeedDialServiceProvider, ETABLISSEMENTS) {

    SearchServiceProvider.register({
      factory: 'Etablissement',
      type: 'établissement',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      resultState: {
        name: 'etablissements.fiche',
        param: 'etablissementId'
      }
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'établissement',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      dialog: ETABLISSEMENTS.DIALOGS.ADD_ETABLISSEMENT
    });

  });
