'use strict';

angular.module('interventions').directive('urgentInterventionsCard',
  function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/interventions/views/urgent-interventions.card.html',
      controller: 'UrgentInterventionsCardController',
      controllerAs: 'urgentInterventionsCardCtrl'
    };
  });
