'use strict';

angular.module('conversations').directive('conversation',
  function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        conversation: '='
      },
      templateUrl: 'modules/conversations/views/conversation.html',
      controller: 'ConversationController',
      controllerAs: 'conversationCtrl',
      link: function (scope, element) {

        var messagesContainer = element.find('md-content');

        scope.scrollDown = function () {
          $timeout(function () {
            messagesContainer[0].scrollTop = messagesContainer[0].scrollHeight;
          });
        };

        scope.currentUser = $rootScope.currentUser;

        var unwatch = scope.$watch('conversation', function (conversation) {
          if (conversation) {
            scope.messages = scope.conversation.getMessages();
            unwatch();
          }
        });

        scope.deleteMessage = function (message) {
          message.remove().then(function () {
            _.pull(scope.conversation.messages, message);
          });
        };
      }
    };
  });
