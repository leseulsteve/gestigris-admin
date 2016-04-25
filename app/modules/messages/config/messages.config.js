'use strict';

angular.module('messages').config(
  function (FabSpeedDialServiceProvider, MESSAGES) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'message',
      icon: MESSAGES.ICONS.MESSAGE,
      dialog: {
        templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

  });
