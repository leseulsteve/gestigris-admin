'use strict';

angular.module('benevoles').constant('BENEVOLES', {
  ICONS: {
    BENEVOLE: 'action:account_circle'
  },
  DIALOGS: {
    ADD_BENEVOLE: {
      templateUrl: 'modules/benevoles/views/nouveau-benevole.dialog.html',
      controller: 'NouveauBenevoleController',
      controllerAs: 'nouveauBenevoleCtrl'
    }
  }
});

angular.module('benevoles').run(
  function ($rootScope, BENEVOLES) {
    $rootScope.BENEVOLES = BENEVOLES;
  });
