'use strict';

angular.module('interventions').controller('AddParticipantController',
  function ($scope, Benevole, BENEVOLES) {

    var ctrl = this;

    ctrl.icon = BENEVOLES.ICONS.BENEVOLE;

    $scope.message = {};

    ctrl.selectedItemChange = function (item) {
      $scope.message.destinataire = item;
    };

    ctrl.add = function (addParticipantForm, message) {

      if (addParticipantForm.$valid) {
        ctrl.dialog.hide(message);
      }
    };

    ctrl.search = function (terms) {
      return Benevole.search({
        _id: {
          $nin: ctrl.exclude
        },
        benevoleName: terms
      });
    };
  });
