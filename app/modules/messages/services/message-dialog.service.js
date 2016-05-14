'use strict';

angular.module('messages').service('MessageDialog',
  function (Dialog) {

    return {

      show: function ($event, params) {

        var dialog = new Dialog({
          controller: 'NouveauMessageController',
          controllerAs: 'nouveauMessageCtrl',
          templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
          locals: {
            receivers: params.receivers
          },
          keepLastDialog: params.keepLastDialog
        });

        return dialog.show($event);
      }
    };
  });
