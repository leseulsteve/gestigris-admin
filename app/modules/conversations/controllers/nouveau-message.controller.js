'use strict';

angular.module('conversations').controller('NouveauMessageController',
  function (Benevole, Conversation, $mdToast, UserAuth) {

    var ctrl = this;

    var currentUser = UserAuth.getCurrentUser();

    var toast = $mdToast.simple()
      .action('annuler')
      .textContent('Le message a été envoyé!');

    ctrl.message = {
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (searchTerm) {
      return Benevole.search({
        _id: {
          $nin: _.map(ctrl.message.destinataires, '_id').concat(currentUser._id)
        },
        benevoleName: searchTerm
      }).then(function (results) {
        return _.map(results, function (destinataire) {
          return _.assign(destinataire, {
            fullname: destinataire.toString()
          });
        });
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
            Conversation.create({
              title: ctrl.message.subject,
              participants: _.map(ctrl.message.destinataires, '_id').concat(currentUser._id),
              type: 'private',
              message: ctrl.message.body
            });
          }
        });
      });
    };
  });
