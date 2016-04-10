'use strict';

angular.module('interventions').directive('plageIntervention',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/plage-intervention.html',
      controller: 'PlageInterventionController',
      controllerAs: 'plageInterventionCtrl'
    };
  });
