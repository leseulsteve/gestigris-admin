'use strict';

angular.module('benevoles').config(
  function (SearchServiceProvider, benevoleConstants) {

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

  });
