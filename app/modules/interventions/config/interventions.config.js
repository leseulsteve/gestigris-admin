'use strict';

angular.module('interventions').config(
  function (FabSpeedDialServiceProvider, INTERVENTIONS, SearchServiceProvider) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE
    });

    SearchServiceProvider.register({
      factory: 'PlageIntervention',
      type: 'plage d\'intervention',
      icon: 'action:event'
    });

  });
