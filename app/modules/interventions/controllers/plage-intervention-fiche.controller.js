'use strict';

angular.module('interventions').controller('PlageFicheController',
  function ($scope, $q, PlageIntervention, Intervention) {

    var ctrl = this;

    function populatePlage(plage) {
      plage.getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });
      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    if (ctrl.intervention) {
      PlageIntervention.findByIntervention(ctrl.intervention).then(function (plage) {
        populatePlage(plage).then(function () {
          ctrl.plage = plage;
        });
      });
    } else if ($scope.plage) {
      populatePlage($scope.plage).then(function () {
        ctrl.plage = $scope.plage;
      });
    }
  });
