'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function ($scope, $mdToast, $state, Etablissement, PlaceToEtablissementConverter) {

    var ctrl = this;

    $scope.etablissement = new Etablissement();

    $scope.$watch('place', function (place) {
      _.assign($scope.etablissement, place ? PlaceToEtablissementConverter.convert(place) : {});
    });

    ctrl.create = function (form, params) {

      if (form.$valid) {
        return Etablissement.create(params).then(function (etablissement) {
          ctrl.dialog.hide();
          $mdToast.show(
            $mdToast.simple()
            .action('voir')
            .textContent('L\'établissement ' + etablissement.toString() + ' a été créé!')
          ).then(function (response) {
            if (response === 'ok') {
              $state.go('etablissements.fiche', {
                etablissementId: etablissement._id
              });
            }
          });
        });
      }

      _.forEach(form.etablissementForm.$error, function (field) {
        _.forEach(field, function (errorField) {
          errorField.$setTouched();
        });
      });

      ctrl.dialog.shake();

    };

  });
