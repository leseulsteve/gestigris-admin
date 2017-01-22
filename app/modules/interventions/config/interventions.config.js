'use strict';

angular.module('interventions').config(
  function (FabSpeedDialServiceProvider, INTERVENTIONS, SearchServiceProvider, EventServiceProvider) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      dialog: {
        templateUrl: 'modules/interventions/views/nouvelle-plage-intervention.dialog.html',
        controller: 'NouvellePlageInterventionController',
        controllerAs: 'nouvellePlageCtrl'
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
      route: 'fiche-intervention'
    });

  });
