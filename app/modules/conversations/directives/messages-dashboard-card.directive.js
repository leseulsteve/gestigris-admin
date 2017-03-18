'use strict';

angular.module('conversations').directive('messagesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/conversations/views/messages.dashboard-card.html',
      controllerAs: 'messagesDashboardCardCtrl',
      controller: function (Conversation, $state) {

        var ctrl = this;

        ctrl.handleClick = function () {
          $state.go('conversations');
        };

        Conversation.getNbNewMessages().then(function (nb) {
          ctrl.nbNouveauxMessages = nb;
        });

      }
    };
  });
