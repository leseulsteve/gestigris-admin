'use strict';

angular.module('benevoles').config(
  function (SearchServiceProvider, FabSpeedDialServiceProvider, RightPanelProvider, BENEVOLES) {

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'Bénévole',
      icon: BENEVOLES.ICONS.BENEVOLE,
      resultState: {
        name: 'benevoles.fiche',
        param: 'benevoleId'
      }
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'bénévole',
      icon: BENEVOLES.ICONS.BENEVOLE,
      dialog: {
        templateUrl: 'modules/benevoles/views/nouveau-benevole.dialog.html',
        controller: 'NouveauBenevoleController',
        controllerAs: 'nouveauBenevoleCtrl'
      }
    });

    RightPanelProvider.register({
      panelName: 'benevole',
      templateUrl: 'modules/benevoles/views/benevole.fiche.html',
      controller: 'BenevoleFicheController',
      controllerAs: 'benevoleFicheCtrl',
      itemName: 'benevole'
    });

  });
