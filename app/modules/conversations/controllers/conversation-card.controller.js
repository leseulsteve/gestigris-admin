'use strict';

angular.module('conversations').controller('ConversationCardController',
  function (Toast) {

    var ctrl = this;

    ctrl.archive = function (conversation) {

      conversation.archive().then(function () {
        Toast.show('Conversation archivée!');
      });
    };

  });
