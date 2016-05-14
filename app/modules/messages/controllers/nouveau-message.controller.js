'use strict';

angular.module('messages').controller('NouveauMessageController',
  function ($scope, Benevole) {

    var ctrl = this;

    $scope.message = {
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (query) {
      return Benevole.search(query).then(function (results) {
        return _.difference(results, $scope.message.destinataires);
      });
    };

    ctrl.send = function (messageForm) {
      messageForm.destinataires.$setValidity('required', $scope.message.destinataires.length > 0);
      console.log(messageForm.destinataires);
      if (messageForm.$valid) {
        console.log('SEND MESSAGE');
        if (ctrl.dialog) {
          ctrl.dialog.hide();
        }
      }
    };

  });
