'use strict';

angular.module('core').directive('onLongTouch',
  function ($timeout, $parse) {
    return {
      restrict: 'EA',
      scope: {},
      link: function (scope, element, attributes) {
        element.bind('mousedown touchstart', function (evt) {
          // Locally scoped variable that will keep track of the long press
          scope.longPress = true;
          var functionHandler = $parse(attributes.onLongPress);
          // We'll set a timeout for 600 ms for a long press
          $timeout(function () {
            if (scope.longPress) {
              // If the touchend event hasn't fired,
              // apply the function given in on the element's on-long-press attribute
              scope.$apply(function () {
                functionHandler(scope, {
                  $event: evt
                });
              });
            }
          }, 600);
        });

        element.bind('mouseup touchend', function (evt) {
          // Prevent the onLongPress event from firing
          scope.longPress = false;
          var functionHandler = $parse(attributes.onLongPress);
          // If there is an on-touch-end function attached to this element, apply it
          if (attributes.onTouchEnd) {
            scope.$apply(function () {
              functionHandler(scope, {
                $event: evt
              });
            });
          }
        });
      }
    };
  });
