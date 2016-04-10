'use strict';

angular.module('interventions').controller('BenevoleFicheController',
  function ($scope, $mdDialog, $mdToast) {

    var ctrl = this;

    ctrl.sendMessage = function ($event, benevole) {

      $scope.cancelModal = function () {
        $mdDialog.cancel();
      };

      $scope.closeModal = function (form) {
        if (form.$valid) {
          $mdDialog.hide();
        }
      };

      $scope.message = {};

      $mdDialog.show({
        templateUrl: 'modules/benevoles/views/message.dialogue.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        scope: $scope
      }).then(function () {
        benevole.sendMessage($scope.message).then(function () {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Le message à été envoyé.')
          );
        });
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
