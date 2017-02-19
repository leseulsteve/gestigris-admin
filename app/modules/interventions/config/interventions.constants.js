'use strict';

angular.module('interventions').constant('INTERVENTIONS', {
  ICONS: {
    PLAGE: 'action:event'
  },
  DIALOGS: {
    ADD_PLAGE: {
      templateUrl: 'modules/interventions/views/nouvelle-plage-intervention.dialog.html',
      controller: 'NouvellePlageInterventionController',
      controllerAs: 'nouvellePlageCtrl'
    }
  }
});

angular.module('interventions').run(
  function ($rootScope, INTERVENTIONS) {
    $rootScope.INTERVENTIONS = INTERVENTIONS;
  });
