'use strict';

angular.module('conversations').controller('ConversationController',
  function ($scope, Message) {

    var ctrl = this;

    ctrl.addMessage = function (newMessage) {

      Message.create(_.assign({
        conversation: $scope.conversation._id,
      }, newMessage)).then(function (message) {
        $scope.newMessage = {};
        $scope.conversation.messages.push(message);

        var isParticipating = false,
          participants = $scope.conversation.getParticipants();

        _.forEach(participants, function (participant) {
          isParticipating = participant.equals(message.author);
        });

        if (!isParticipating) {
          participants.push(message.author);
        }

      });
    };

  });
