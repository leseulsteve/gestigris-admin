'use strict';

angular.module('navigation').directive('toolbar',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/toolbar.html',
      controller: 'ToolbarController',
      controllerAs: 'toolbarCtrl'
    };
  });
