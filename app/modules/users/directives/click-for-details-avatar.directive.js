'use strict';

angular.module('users').directive('clickForDetailsAvatar',
  function (RightPanel) {

    return {
      require: 'avatar',
      restrict: 'A',
      link: function (scope, element, attrs, avatarCtrl) {

        element.css('cursor', 'pointer');

        element.bind('click', function () {
          RightPanel.show('benevole', avatarCtrl.getUser());
        });
      }
    };
  });
