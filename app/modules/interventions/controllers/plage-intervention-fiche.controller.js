'use strict';

angular.module('interventions').controller('PlageFicheController',
  function ($scope, $q, $state, PlageIntervention, Intervention) {

    var ctrl = this;

    function populatePlage(plage) {
      plage.getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });

      plage.getEtablissement().then(function (etablissement) {
        ctrl.etablissement = etablissement;
      });

      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    populatePlage($scope.plage).then(function () {
      ctrl.plage = $scope.plage;
    });

    ctrl.close = function () {
      $state.go('home');
    };

  });
