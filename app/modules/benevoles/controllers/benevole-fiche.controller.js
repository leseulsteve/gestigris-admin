'use strict';

angular.module('benevoles').controller('BenevoleFicheController',
  function ($scope, $mdDialog, $mdToast, MessageDialog) {

    var ctrl = this;

    $scope.benevole = $scope.benevole || ctrl.benevole;

    ctrl.sendMessage = function ($event, benevole) {

      MessageDialog.show($event, {
        receivers: [benevole],
        keepLastDialog: true
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
          $mdToast.show(
            $mdToast.simple()
            .textContent(benevole.toString() + ' a été supprimé.')
          );
        });
      });
    };

  });
