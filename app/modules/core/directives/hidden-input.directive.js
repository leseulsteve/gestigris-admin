'use strict';

angular.module('core').directive('hiddenInput',
  function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'modules/core/views/hidden-input.html',
      link: function (scope, element, attrs) {
        scope.inputName = attrs.name || attrs.ariaLabel;
      }
    };
  });
