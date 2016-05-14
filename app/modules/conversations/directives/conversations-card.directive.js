'use strict';

angular.module('conversations').directive('conversationCard',
  function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.card.html',
      link: function (scope, element) {

        $timeout(function () {
          var imageElement = element.find('img');
          if (imageElement.length === 0) {
            scope.showCard = true;
          } else {
            imageElement.bind('load', function () {
              scope.showCard = true;
              scope.$apply();
            });
          }
        });
      }
    };
  });
