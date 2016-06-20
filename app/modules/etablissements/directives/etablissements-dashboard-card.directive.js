'use strict';

angular.module('etablissements').directive('etablissementsDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/etablissements/views/etablissements.dashboard-card.html',
      controllerAs: 'etablissementsDashboardCardCtrl',
      controller: function (Etablissement, $state) {

        var ctrl = this;

        ctrl.handleClick = function () {
          $state.go('etablissements');
        };

        //Etablissement.count().then(function (etablissements) {
        ctrl.nbEtablissements = 8; //etablissements.length;
        //});
      }
    };
  });
