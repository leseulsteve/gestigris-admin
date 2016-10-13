'use strict';

angular.module('messages').service('MessageDialog',
  function (Dialog) {

    var dialog = new Dialog({
      controller: 'NouveauMessageController',
      controllerAs: 'nouveauMessageCtrl',
      templateUrl: 'modules/messages/views/nouveau-message.dialog.html'
    });

    this.show = function ($event, params) {
      return dialog.show($event, {
        locals: {
          receivers: params.receivers,
          dialog: dialog
        }
      });
    };
  });
