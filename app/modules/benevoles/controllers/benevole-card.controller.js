'use strict';

angular.module('benevoles').controller('BenevoleCardController',
  function ($scope, $mdDialog, Toast, MessageDialog) {

    var ctrl = this;

    $scope.benevole = $scope.benevole || ctrl.benevole;

    ctrl.sendMessage = function ($event, benevole) {

      MessageDialog.show($event, {
        receivers: [benevole]
      });
    };

    ctrl.saveBenevole = function (showToast) {
      $scope.benevole.save().then(function () {
        if (showToast) {
          Toast.show('Sauvegardé!');
        }
      });
    };

    ctrl.deleteBenevole = function ($event, benevole) {

      var confirmDelete = $mdDialog.confirm()
        .title('Êtes-vous certain de vouloir supprimer ' + benevole.toString() + '?')
        .textContent('Cette opération est irréversible.')
        .ariaLabel('Suppression bénévole')
        .targetEvent($event)
        .ok('Oui')
        .cancel('Une autre fois');

      $mdDialog.show(confirmDelete).then(function () {
        benevole.remove().then(function () {
          Toast.show(benevole.toString() + ' a été supprimé.');
        });
      });
    };

  });
