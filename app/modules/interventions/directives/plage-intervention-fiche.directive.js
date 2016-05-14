'use strict';

angular.module('interventions').directive('plageInterventionFiche',
  function () {
    return {
      restrict: 'E',
      scope: {
        plage: '='
      },
      templateUrl: 'modules/interventions/views/plage-intervention.fiche.html',
      controller: 'PlageFicheController',
      controllerAs: 'plageFicheCtrl'
    };
  });
