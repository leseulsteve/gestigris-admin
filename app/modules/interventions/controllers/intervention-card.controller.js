'use strict';

angular.module('interventions').controller('InterventionCardController',
  function ($scope, $mdDialog) {

    var ctrl = this;

    ctrl.showDetails = function ($event) {
      $mdDialog.show({
        templateUrl: 'modules/interventions/views/intervention.dialog.html',
        controller: 'InterventionDialogController',
        controllerAs: 'interventionDialogCtrl',
        scope: $scope,
        targetEvent: $event,
        fullscreen: true
      });
    };

  });
