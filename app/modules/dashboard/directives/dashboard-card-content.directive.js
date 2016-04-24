'use strict';

angular.module('dashboard').directive('dashboardCardContent',
  function () {
    return {
      restrict: 'E',
      compile: function (iElement) {
        iElement.attr('layout', 'column');
        iElement.attr('flex', '');
      }
    };
  });
