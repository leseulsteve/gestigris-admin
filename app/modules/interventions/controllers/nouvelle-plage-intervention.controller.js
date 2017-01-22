'use strict';

angular.module('interventions').controller('NouvellePlageInterventionController',
  function (Benevole, Message, $mdToast) {

    var ctrl = this;

    var toast = $mdToast.simple()
      .action('annuler')
      .textContent('Le message a été envoyé!');

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
        $mdToast.show(toast).then(function (response) {
          if (_.isUndefined(response)) {
            Message.create(ctrl.message);
          }
        });
      });
    };
  });
