'use strict';

angular.module('conversations').directive('attachement',
  function ($compile) {
    return {
      restrict: 'E',
      scope: {
        attachement: '=',
      },
      link: function (scope, element) {
        element.css('padding-left', '56px').css('padding-right', '56px');
        element.append($compile('<' + scope.attachement.type + '></' + scope.attachement.type + '>')(scope));
      }
    };
  });
