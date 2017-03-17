'use strict';

angular.module('conversations').service('MessageDialog',
  function (Dialog) {

    var dialog = new Dialog({
      controller: 'NouveauMessageController',
      controllerAs: 'nouveauMessageCtrl',
      templateUrl: 'modules/conversations/views/nouveau-message.dialog.html'
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
