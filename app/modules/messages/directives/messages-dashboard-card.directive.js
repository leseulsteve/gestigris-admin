'use strict';

angular.module('messages').directive('messagesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/messages/views/messages.dashboard-card.html',
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
