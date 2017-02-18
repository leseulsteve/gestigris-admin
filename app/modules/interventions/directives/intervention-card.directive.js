'use strict';

angular.module('interventions').directive('interventionCard',
  function () {
    return {
      require: '^^plageInterventionFiche',
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/interventions/views/intervention.card.html',
      controller: 'InterventionCardController',
      controllerAs: 'interventionCardCtrl',
      link: function (scope, element) {
        element.toggleClass('booked', scope.intervention.isBooked());
      }
    };
  });
