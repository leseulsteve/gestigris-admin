'use strict';

angular.module('benevoles').config(
  function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'Bénévole',
      icon: 'action:account_circle',
      dialog: {
        controller: 'BenevoleFicheController',
        controllerAs: 'benevoleFicheCtrl',
        templateUrl: 'modules/benevoles/views/benevole-fiche.dialog.html',
        itemName: 'benevole'
      }
    });

  });
