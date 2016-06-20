'use strict';

angular.module('interventions').controller('UrgentInterventionsCardController',
  function (Intervention, $state) {

    var ctrl = this;

    Intervention.getUrgents().then(function (interventions) {

      ctrl.interventions = interventions;

      ctrl.showDetails = function (intervention) {
        $state.go('fiche-intervention', {
          _id: intervention._id
        });
      };
    });

  });
