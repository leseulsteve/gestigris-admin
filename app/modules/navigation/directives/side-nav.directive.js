'use strict';

angular.module('navigation').directive('sidenav',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/sidenav.html',
      controller: 'SidenavController',
      controllerAs: 'sidenavCtrl'
    };
  });
