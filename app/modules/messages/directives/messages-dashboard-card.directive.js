'use strict';

angular.module('messages').directive('messagesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/messages/views/messages.dashboard-card.html',
      controllerAs: 'messagesDashboardCardCtrl',
      controller: function (Message, $state) {

        var ctrl = this;

        ctrl.handleClick = function () {
          $state.go('messages');
        };

        //Etablissement.count().then(function (etablissements) {
        ctrl.nbNouveauxMessages = 8; //etablissements.length;
        //});
      }
    };
  });
