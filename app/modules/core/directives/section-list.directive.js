'use strict';

angular.module('core').directive('sectionList',
  function ($rootScope, ZenScroll, $timeout) {

    var lastStateScollPosition = 0;

    function isScrolledIntoView(scroller, item) {
      var elemTop = item.offsetTop - scroller.scrollTop,
        elemBottom = elemTop + item.offsetHeight;
      return (elemTop >= 0) && (elemBottom <= scroller.offsetHeight);
    }

    return {
      restrict: 'A',
      link: function (scope, element) {

        var scroller = element.parent()[0],
          zenScroller = ZenScroll.createScroller(scroller);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
          lastStateScollPosition = fromState.name === toState.name ? scroller.scrollTop : 0;
        });

        $rootScope.$$postDigest(function () {
          scroller.scrollTop = lastStateScollPosition;
        });

        $timeout(function () {
          var activeItem = element[0].getElementsByClassName('active')[0];
          if (!isScrolledIntoView(scroller, activeItem)) {
            zenScroller.center(activeItem);
          }
        }, 1500);
      }
    };
  });
