'use strict';

angular.module('core').directive('telephoneInput',
  function () {
    return {
      restrict: 'E',
      scope: {
        telephones: '=ngModel',
        ngChange: '&',
        ngDisabled: '&'
      },
      templateUrl: 'modules/core/views/telephones-input.html',
      compile: function (iElement) {
        iElement.css('display', 'block');
      },
      controllerAs: 'telephoneInputCtrl',
      controller: function ($scope) {
        this.removePhone = function ($index) {
          $scope.telephones.splice($index, 1);
          $scope.ngChange();
        };
      }
    };
  });
