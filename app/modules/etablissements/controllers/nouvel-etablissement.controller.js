'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function($scope, $mdToast, Etablissement) {

    var ctrl = this;

    $scope.etablissement = new Etablissement();

    ctrl.create = function(form, params) {

      form.etablissementType.$setTouched();
      form.ville.$setTouched();
      form.province.$setTouched();

      if (form.$valid) {
        return Etablissement.create(params).then(function(etablissement) {
          ctrl.dialog.hide();
          $mdToast.show(
            $mdToast.simple()
            .textContent('L\'établissement ' + etablissement.toString() + ' a été créé!')
          );
        });
      }

      ctrl.dialog.shake();

    };

  });