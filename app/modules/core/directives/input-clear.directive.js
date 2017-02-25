'use strict';

angular.module('core').directive('inputClear',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      template: function (tElement) {

        tElement.parent().css('position', 'relative');

        tElement.after(
          '<md-button arial-label="clear" class="md-icon-button clear-button" ng-show="hasValue" ng-click="clearInput()" style="position: absolute; bottom: 0px; right: -14px;">' +
          '<md-icon md-svg-icon="content:clear"></md-icon>' +
          '</md-button>');
      },

      link(scope, element, attrs, ngModelController) {
        scope.$watch(function () {
          return ngModelController.$viewValue;
        }, function (value) {
          scope.hasValue = value;
        });
        scope.clearInput = function () {
          ngModelController.$setViewValue('');
          ngModelController.$render();
        };
      }

    };
  });
