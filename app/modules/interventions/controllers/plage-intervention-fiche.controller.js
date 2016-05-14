'use strict';

angular.module('interventions').controller('PlageFicheController',
  function ($scope, PlageIntervention) {

    var ctrl = this;

    if (ctrl.intervention) {
      PlageIntervention.findByIntervention(ctrl.intervention).then(function (plage) {
        $scope.plage = plage;
        _.forEach(plage.interventions, function (intervention) {
          intervention.getBenevoles('confirmed').then(function (benevoles) {
            intervention.confirmed = benevoles;
          });
          intervention.getBenevoles('interested').then(function (benevoles) {
            intervention.interested = benevoles;
          });
        });
      });
    }
  });
