'use strict';

angular.module('interventions').controller('PlageInterventionController',
  function ($scope, Intervention) {

    var ctrl = this;

    Intervention.findByPlageId($scope.plage._id).then(function (interventions) {
      ctrl.interventions = interventions;
    });

    ctrl.addIntervention = function () {
      console.log('Adding intervention');
    };

  });
