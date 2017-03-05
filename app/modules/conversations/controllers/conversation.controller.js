'use strict';

angular.module('conversations').controller('ConversationController',
  function ($scope, Benevole, Message) {

    var ctrl = this;

    var unwatch = $scope.$watch('messages', function (messages) {
      if (messages)  {
        Benevole.find({
          _id: {
            $in: _.map(messages, 'author')
          }
        }).then(function (benevoles) {
          ctrl.getAuthor = function (authorId) {
            return _.find(benevoles, '_id', authorId);
          };
          unwatch();
        });
      }
    });

    ctrl.addMessage = function (newMessage) {

      Message.create(_.assign({
        conversation: $scope.conversation._id,
      }, newMessage)).then(function (message) {
        $scope.newMessage = {};
        $scope.messages.push(message);

        /*  var isParticipating = false,
          participants = $scope.conversation.getParticipants();

        _.forEach(participants, function (participant) {
          isParticipating = participant.equals(message.author);
        });

        if (!isParticipating) {
          participants.push(message.author);
        }
*/
      });
    };

    ctrl.deleteMessage = function (message) {
      message.remove().then(function () {
        _.pull($scope.messages, message);
      });
    };

  });
