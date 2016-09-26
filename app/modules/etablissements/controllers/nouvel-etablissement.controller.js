'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function ($scope, $mdToast, $document, $animate, Etablissement) {

    var ctrl = this;

    $scope.etablissement = new Etablissement();

    ctrl.create = function (form, params) {

      form.etablissementType.$setTouched();
      form.arrondissement.$setTouched();
      form.ville.$setTouched();
      form.province.$setTouched();

      if (form.$valid) {
        Etablissement.create(params).then(function () {
          ctrl.dialog.hide();
          $mdToast.show(
            $mdToast.simple()
            .textContent('L\'établissement ' + params.name + ' a été créé!')
          );
        });
      } else {
        var dialog = $document.find('md-dialog');
        $animate.addClass(dialog, 'shake-it').then(function () {
          $animate.removeClass(dialog, 'shake-it');
        });
      }
    };

  });
