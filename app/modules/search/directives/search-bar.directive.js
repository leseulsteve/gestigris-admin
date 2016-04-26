'use strict';

angular.module('search').directive('searchBar',
  function ($timeout, $window) {
    return {
      restrict: 'A',
      controller: 'SearchBarController',
      controllerAs: 'searchBarCtrl',
      link: function (scope, element) {

        angular.element($window).bind('keydown', function ($event) {

          var keyCode = ($window.event) ? $event.which : $event.keyCode;

          if (($event.ctrlKey === true ||  $event.metaKey) && keyCode === 70) {
            $event.preventDefault();

            scope.$apply(function () {
              scope.searchToggled = !scope.searchToggled;
            });

            return false;
          }
        });

        var input;

        $timeout(function () {

          input = element.find('input');

          input.bind('keydown keypress', function (event) {
            if (event.which === 27) { // 27 = esc key
              scope.$apply(function () {
                scope.searchToggled = false;
              });

              event.preventDefault();
            }
          });

          input.bind('blur', function () {
            scope.$apply(function () {
              scope.searchToggled = false;
              scope.searchText = undefined;
            });
          });

          scope.$watch('searchToggled', function (searchToggled) {
            if (!searchToggled) {
              scope.searchText = undefined;
            } else {
              if (input) {
                input.focus();
              }
            }
          });
        });
      }
    };
  });
