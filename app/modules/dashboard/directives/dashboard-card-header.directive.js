'use strict';

angular.module('dashboard').directive('dashboardCardHeader',
  function () {
    return {
      restrict: 'E',
      compile: function (iElement) {
        iElement.attr('layout', 'row');
        iElement.attr('layout-align', 'start center');
        iElement.find('h3').addClass('md-title');
      }
    };
  });
