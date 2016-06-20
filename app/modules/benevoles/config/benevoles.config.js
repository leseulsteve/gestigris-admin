'use strict';

angular.module('benevoles').config(
  function (SearchServiceProvider, benevoleConstants, RightPanelProvider) {

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'Bénévole',
      icon: benevoleConstants.USER_ICON_NAME,
      dialog: {
        controller: 'BenevoleFicheController',
        controllerAs: 'benevoleFicheCtrl',
        templateUrl: 'modules/benevoles/views/benevole-fiche.dialog.html',
        itemName: 'benevole'
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
