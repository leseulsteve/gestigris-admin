'use strict';

angular.module('interventions').config(
  function (FabSpeedDialServiceProvider, INTERVENTIONS) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE
    });

  });
