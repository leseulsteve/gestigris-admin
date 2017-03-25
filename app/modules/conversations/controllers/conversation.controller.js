'use strict';

angular.module('conversations').controller('ConversationController',
  function ($scope, Benevole, Message, $injector, UserAuth) {

    var ctrl = this;

    var unwatch = $scope.$watch('messages', function (messages) {
      if (messages)  {
        messages.push(new Message({
          author: UserAuth.getCurrentUser()._id,
          conversation: $scope.conversation._id
        }));
        Benevole.find({
          _id: {
            $in: _.map(messages, 'author')
          }
        }).then(function (benevoles) {
          ctrl.getAuthor = function (authorId) {
            return _.find(benevoles, ['_id', authorId]);
          };
          unwatch();
        });
      }
    });

    ctrl.addMessage = function (newMessage) {

      Message.create(newMessage).then(function (message) {
        _.assign(newMessage, message);
        $scope.messages.push(new Message({
          author: UserAuth.getCurrentUser()._id,
          conversation: $scope.conversation._id
        }));

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

    ctrl.handleAttachementSelection = function (message, attachement) {
      (attachement.serviceInstance || (attachement.serviceInstance = $injector.get(attachement.service)))
      .getItem().then(function (item) {
        message.attachements = message.attachements ||  [];
        message.attachements.push(item);
      });
    };

    ctrl.deleteMessage = function (message) {
      message.remove().then(function () {
        _.pull($scope.messages, message);
      });
    };

  });
