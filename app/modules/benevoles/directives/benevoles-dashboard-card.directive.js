'use strict';

angular.module('benevoles').directive('benevolesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevoles.dashboard-card.html',
      controllerAs: 'benevolesDashboardCardCtrl',
      controller: function (Benevole, $state, Dialog, BENEVOLES) {

        var ctrl = this;

        ctrl.handleClick = function ($event) {
          if (ctrl.nbBenevoles) {
            return $state.go('benevoles');
          }
          var dialog = new Dialog(BENEVOLES.DIALOGS.ADD_BENEVOLE);
          dialog.show($event).then(function (benevole) {
            ctrl.nbBenevoles++;
            $state.go('benevoles.fiche', {
              benevoleId: benevole._id
            });
          });
        };

        Benevole.count().then(function (count) {
          ctrl.nbBenevoles = count;
        });
      }
    };
  });
