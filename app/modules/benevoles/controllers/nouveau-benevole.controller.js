'use strict';

angular.module('etablissements').controller('NouveauBenevoleController',
  function($scope, $mdToast, Benevole) {

    var ctrl = this;

    $scope.benevole = new Benevole();

    ctrl.create = function(form, params) {

      if (form.$valid) {
        return Benevole.create(params).then(function(benevole) {
          ctrl.dialog.hide(benevole);
          $mdToast.show(
            $mdToast.simple()
            .action('voir')
            .textContent('Le bénévole ' + benevole.toString() + ' a été créé!')
          ).then(function(response) {
            if (response === 'ok') {
              $state.go('benevoles.fiche', {
                benevoleId: benevole._id
              });
            }
          });
        });
      }

      _.forEach(form.userProfileForm.$error, function(field) {
        _.forEach(field, function(errorField) {
          errorField.$setTouched();
        });
      });

      ctrl.dialog.shake();
    };
  });