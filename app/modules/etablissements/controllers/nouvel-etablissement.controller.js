'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function($scope, $mdToast, $document, $animate, Etablissement) {

    var ctrl = this;

    $scope.etablissement = new Etablissement();

    ctrl.create = function(form, params) {

      form.etablissementType.$setTouched();
      form.arrondissement.$setTouched();
      form.ville.$setTouched();
      form.province.$setTouched();

      if (form.$valid) {
        return Etablissement.create(params).then(function() {
          ctrl.dialog.hide();
          $mdToast.show(
            $mdToast.simple()
            .textContent('L\'établissement ' + params.name + ' a été créé!')
          );
        });
      }

      ctrl.dialog.shake();

    };

  });