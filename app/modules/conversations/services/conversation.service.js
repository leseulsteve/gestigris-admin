'use strict';

angular.module('conversations').provider('ConversationService',
  function () {

    var attachements = [];

    return {

      registerAttachement: function (attachement) {
        attachements.push(attachement);
      },

      $get: function ($rootScope, Conversation) {
        return {

          init: function () {
            return Conversation.getFromTeam().then(function (conversations) {
              $rootScope.conversations = {
                equipe: conversations
              };

              $rootScope.$on('UserAuth:signout:success', function () {
                $rootScope.conversations = undefined;
              });
            });
          },

          getAttachements: function () {
            return attachements;
          }
        };
      }
    };
  });
