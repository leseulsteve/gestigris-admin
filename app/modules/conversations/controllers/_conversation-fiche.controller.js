'use strict';

angular.module('conversations').controller('ConversationFicheController',
  function (Conversation, $stateParams, $state) {

    var ctrl = this;

    ctrl.close = function () {
      $state.go('conversations');
    };

    Conversation.findById($stateParams.conversationId).then(function (conversation) {
      ctrl.conversation = conversation;
    });

  });
