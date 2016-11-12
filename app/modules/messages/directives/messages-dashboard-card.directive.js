'use strict';

angular.module('messages').directive('messagesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/messages/views/messages.dashboard-card.html',
      controllerAs: 'messagesDashboardCardCtrl',
      controller: function ( /*, $state*/ ) {

        var ctrl = this;

        ctrl.handleClick = function () {
          // $state.go('conversations');
        };

        //Etablissement.count().then(function (etablissements) {
        ctrl.nbNouveauxMessages = 8; //etablissements.length;
        //});
      }
    };
  });
