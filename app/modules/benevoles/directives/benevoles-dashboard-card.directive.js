'use strict';

angular.module('benevoles').directive('benevolesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevoles.dashboard-card.html',
      controllerAs: 'benevolesDashboardCardCtrl',
      controller: function (Benevole, $state) {

        var ctrl = this;

        ctrl.handleClick = function () {
          $state.go('benevoles');
        };

        Benevole.count().then(function (count) {
          ctrl.nbBenevoles = count;
        });
      }
    };
  });
