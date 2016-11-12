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
      controller: function (Observateur, Dialog) {

        var ctrl = this;

        var dialog = new Dialog({
          controller: 'ObservateurProgressController',
          controllerAs: 'observateurProgressCtrl',
          templateUrl: 'modules/benevoles/views/observateurs-progress.dialog.html'
        });

        ctrl.handleClick = function ($event) {
          Observateur.find().then(function (observateurs) {
            return dialog.show($event, {
              locals: {
                observateurs: observateurs,
                dialog: dialog
              }
            });
          });
        };

        Observateur.count().then(function (count) {
          ctrl.nbObservateurs = count;
        });
      }
    };
  });
