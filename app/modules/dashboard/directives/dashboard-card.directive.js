'use strict';

angular.module('dashboard').directive('dashboardCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        expandId: '@'
      },
      templateUrl: 'modules/dashboard/views/dashboard.card.html',
      controller: 'DashboardCardController',
      controllerAs: 'dashboardCardCtrl',
      transclude: true
    };
  });
