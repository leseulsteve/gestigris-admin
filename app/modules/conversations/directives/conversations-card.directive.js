'use strict';

angular.module('conversations').directive('conversationCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.card.html',
      link: function (scope) {

        scope.$watch('conversation', function (conversation) {
          if (conversation) {
            conversation.getParticipants().then(function (participants) {
              scope.conversationParticipants = participants;
            });
          }
        });

      }
    };
  });
