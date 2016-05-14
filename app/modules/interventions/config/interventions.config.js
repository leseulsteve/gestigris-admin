'use strict';

angular.module('interventions').config(
  function (FabSpeedDialServiceProvider, INTERVENTIONS, SearchServiceProvider, EventServiceProvider) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      dialog: {
        templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

    SearchServiceProvider.register({
      factory: 'PlageIntervention',
      type: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
    });

    EventServiceProvider.register({
      factory: 'Intervention',
      type: 'intervention',
      stateIcon: true,
      dialog: {
        controller: 'PlageFicheController',
        controllerAs: 'plageFicheCtrl',
        templateUrl: 'modules/interventions/views/plage-intervention-fiche.dialog.html',
        itemName: 'intervention',
        fullscreen: true
      }
    });

  });
