'use strict';

angular.module('conversations').config(
  function (FabSpeedDialServiceProvider, MESSAGES) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'message',
      icon: MESSAGES.ICONS.MESSAGE,
      dialog: {
        templateUrl: 'modules/conversations/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

  });
