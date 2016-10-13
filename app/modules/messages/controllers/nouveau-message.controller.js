'use strict';

angular.module('messages').controller('NouveauMessageController',
  function (Benevole, Toast) {

    var ctrl = this;

    ctrl.message = {
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (query) {
      return Benevole.search(query).then(function (results) {
        return _.difference(results, ctrl.message.destinataires);
      });
    };

    ctrl.cancel = ctrl.dialog.cancel;

    ctrl.send = function (messageForm) {

      messageForm.destinataires.$setValidity('required', ctrl.message.destinataires.length > 0);

      if (messageForm.$invalid) {
        return ctrl.dialog.shake();
      }

      ctrl.dialog.hide().then(function () {
        Toast.show('Message envoyé');
      });

    };
  });
