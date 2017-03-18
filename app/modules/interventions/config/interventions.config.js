'use strict';

angular.module('interventions').config(
  function (ToolbarMenuServiceProvider, FabSpeedDialServiceProvider, SearchServiceProvider, EventServiceProvider, INTERVENTIONS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Interventions',
      icon: INTERVENTIONS.ICONS.PLAGE,
      route: 'interventions'
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      dialog: INTERVENTIONS.DIALOGS.ADD_PLAGE
    });

    SearchServiceProvider.register({
      factory: 'PlageIntervention',
      type: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      resultState: {
        name: 'interventions.fiche',
        param: 'plageId'
      }
    });

    EventServiceProvider.register({
      factory: 'Intervention',
      type: 'intervention',
      stateIcon: true,
      route: 'fiche-intervention'
    });

  });
