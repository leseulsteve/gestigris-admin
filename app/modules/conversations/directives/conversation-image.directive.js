'use strict';

angular.module('conversations').directive('conversationImage',
  function () {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.image.html'
    };
  });
