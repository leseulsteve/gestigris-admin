'use strict';

angular.module('conversations').controller('NouveauMessageController',
  function ($scope, $q, Benevole, Conversation, ConversationService, $mdToast, UserAuth) {

    var ctrl = this;

    var currentUser = UserAuth.getCurrentUser();

    var toast = $mdToast.simple()
      .action('annuler')
      .textContent('Le message a été envoyé!');

    ctrl.message = {
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (searchTerm) {
      return ConversationService.searchReceivers({
        _id: {
          $nin: _.map(ctrl.message.destinataires, '_id').concat(currentUser._id)
        },
        searchTerm: searchTerm
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

            $q.all(_.map(ctrl.message.destinataires, function (destinataire) {
              if (_.startsWith(destinataire.fullname, '@')) {
                return ConversationService.getGroupMembers(destinataire)
                  .then(function (members) {
                    _.pull(ctrl.message.destinataires, destinataire);
                    ctrl.message.destinataires = ctrl.message.destinataires.concat(members);
                  });
              }
            })).then(function () {
              console.log(_.uniq(_.map(ctrl.message.destinataires.concat(currentUser), '_id')));
              Conversation.create({
                title: ctrl.message.subject,
                participants: _.uniq(_.map(ctrl.message.destinataires.concat(currentUser), '_id')),
                type: 'private',
                message: ctrl.message.body,
                attachements: ctrl.message.attachements
              });
            });

          }
        });
      });
    };
  });
