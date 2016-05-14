'use strict';

angular.module('conversations').directive('conversationSideNavList',
  function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        title: '@',
        type: '@',
        chunkSize: '@'
      },
      templateUrl: 'modules/conversations/views/conversation-side-nav.list.html',
      link: function (scope, element) {

        element.addClass('nav-list');

        $rootScope.$watch('conversations.equipe', function (conversations) {
          if (conversations) {
            scope.conversations = _.sortBy(conversations, function (conversation) {
              var lastMessage = conversation.getLastMessage();
              if (lastMessage) {
                return new Date(lastMessage.created.date);
              }
            }).reverse();
          }
        });

        scope.showMore = function () {
          scope.chunkSize += scope.chunkSize;
        };

      }
    };
  });
