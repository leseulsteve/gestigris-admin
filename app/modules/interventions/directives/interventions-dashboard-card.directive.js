'use strict';

angular.module('interventions').directive('interventionsDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/interventions.dashboard-card.html',
      controllerAs: 'interventionsDashboardCardCtrl',
      controller: function (PlageIntervention, Moment, $state, Dialog, INTERVENTIONS) {

        var ctrl = this,
          now = new Moment().startOf('day');

        ctrl.handleClick = function ($event) {
          if (ctrl.nbInterventions) {
            return $state.go('interventions', {
              filters: {
                date: {
                  start: now.toDate()
                }
              }
            });
          }
          var dialog = new Dialog(INTERVENTIONS.DIALOGS.ADD_PLAGE);
          dialog.show($event).then(function () {
            ctrl.nbInterventions++;
          });
        };

        PlageIntervention.count({
          date: {
            $gte: now
          }
        }).then(function (nb) {
          ctrl.nbInterventions = nb;
        });
      }
    };
  });
