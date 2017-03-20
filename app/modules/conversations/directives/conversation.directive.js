'use strict';

angular.module('conversations').directive('conversation',
  function ($rootScope, $timeout, ConversationService) {
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
            scope.conversation.getMessages().then(function (messages) {
              scope.messages = messages;
            });
            unwatch();
          }
        });

        scope.attachements = _.sortBy(ConversationService.getAttachements(), 'title');

      }
    };
  });
