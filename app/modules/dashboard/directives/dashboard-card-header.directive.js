'use strict';

angular.module('dashboard').directive('dashboardCardHeader',
  function () {
    return {
      restrict: 'E',
      compile: function (iElement) {
        iElement.find('h3').addClass('md-title');
      }
    };
  });
