'use strict';

angular.module('etablissements').directive('etablissementsDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/etablissements/views/etablissements.dashboard-card.html',
      controllerAs: 'etablissementsDashboardCardCtrl',
      controller: function (Etablissement, $state, Dialog, ETABLISSEMENTS) {

        var ctrl = this;

        ctrl.handleClick = function ($event) {
          if (ctrl.nbEtablissements) {
            return $state.go('etablissements');
          }
          var dialog = new Dialog(ETABLISSEMENTS.DIALOGS.ADD_ETABLISSEMENT);
          dialog.show($event).then(function (etablissement) {
            ctrl.nbEtablissements++;
            $state.go('etablissements.fiche', {
              etablissementId: etablissement._id
            });
          });
        };

        Etablissement.count().then(function (nb) {
          ctrl.nbEtablissements = nb;
        });
      }
    };
  });
