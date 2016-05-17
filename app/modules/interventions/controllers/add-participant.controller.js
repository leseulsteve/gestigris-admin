'use strict';

angular.module('interventions').controller('AddParticipantController',
  function ($scope, Benevole, benevoleConstants) {

    var ctrl = this;

    ctrl.icon = benevoleConstants.USER_ICON_NAME;

    $scope.message = {};

    ctrl.selectedItemChange = function (item) {
      $scope.message.destinataire = item;
    };

    ctrl.add = function (addParticipantForm, message) {

      if (addParticipantForm.$valid) {
        ctrl.dialog.hide(message.destinataire);
      }
    };

    ctrl.search = Benevole.search;
  });
