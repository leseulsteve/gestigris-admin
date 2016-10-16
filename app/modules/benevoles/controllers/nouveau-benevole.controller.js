'use strict';

angular.module('etablissements').controller('NouveauBenevoleController',
  function ($scope, $mdToast, Benevole) {

    var ctrl = this;

    $scope.benevole = {};

    ctrl.create = function (form, params) {

      if (form.$valid) {
        return Benevole.create(params).then(function (benevole) {
          ctrl.dialog.hide(benevole);
          $mdToast.show(
            $mdToast.simple()
            .textContent('Le bénévole ' + benevole.toString() + ' a été créé!')
          );
        });
      }

      ctrl.dialog.shake();

    };

  });
