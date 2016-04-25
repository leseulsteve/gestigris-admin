'use strict';

angular.module('navigation').directive('fabSpeedDial',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/fab-speed-dial.html',
      controller: 'FabSeedDialController',
      controllerAs: 'fabSeedDialCtrl'
    };
  });
