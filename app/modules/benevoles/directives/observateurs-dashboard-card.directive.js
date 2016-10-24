'use strict';

angular.module('benevoles').directive('observateursDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/observateurs.dashboard-card.html',
      controllerAs: 'observateursDashboardCardCtrl',
      link: function (scope, element) {
        scope.$watch('observateursDashboardCardCtrl.nbObservateurs', function (nbObservateurs) {
          if (nbObservateurs === 0) {
            element.remove();
          }
        });
      },
      controller: function (Observateur, $state) {

        var ctrl = this;

        Observateur.getObservateurRoleFilter().then(function (filter) {
          console.log(filter);
          ctrl.handleClick = function () {
            $state.go('benevoles', {
              filters: JSON.stringify(filter)
            });
          };
        });

        Observateur.count().then(function (count) {
          ctrl.nbObservateurs = count;
        });
      }
    };
  });
