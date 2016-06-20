'use strict';

angular.module('users').directive('clickForDetailsAvatar',
  function (RightPanel) {

    return {
      restrict: 'A',
      link: function (scope, element) {

        element.css('cursor', 'pointer');

        element.bind('click', function () {
          RightPanel.show('benevole', scope.benevole);
        });
      }
    };
  });
