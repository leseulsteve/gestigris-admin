'use strict';

angular.module('core').directive('onLongTouch',
  function ($timeout) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var longPress = false,
          method = attrs.onLongTouch;

        element.bind('mousedown touchstart', function () {
          longPress = true;
          $timeout(function () {
            if (longPress) {
              scope.$apply(method);
            }
          }, 600);
        });

        element.bind('mouseup touchend', function () {
          longPress = false;
        });
      }
    };
  });
