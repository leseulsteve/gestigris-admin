'use strict';

angular.module('dashboard').directive('dashboardFullscreenHeaderCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/dashboard/views/dashboard-fullscreen-header.card.html',
      controller: function ($rootScope) {
        this.close = function () {
          $rootScope.$broadcast('Dialog:close');
        };
      },
      controllerAs: 'dashboardFullscreenHeaderCtrl'
    };
  });
