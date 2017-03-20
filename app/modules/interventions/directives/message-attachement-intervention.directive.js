'use strict';

angular.module('conversations').directive('messageAttachementIntervention',
  function (Intervention, PlageIntervention) {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/intervention.message-attachement.html',
      link: function (scope) {
        return Intervention.findById(scope.attachement.data.intervention)
          .then(function (intervention) {
            PlageIntervention.findById(intervention.plage).then(function (plage) {
              scope.plage = plage;
              scope.etablissement = plage.etablissement;
            });
            console.log(intervention);
            scope.intervention = intervention;
          });
      }
    };
  });
