'use strict';

angular.module('conversations').controller('ConversationsSectionController',
  function ($scope, Conversation, $mdDialog) {

    var ctrl = this;

    Conversation.getGeneral().then(function (conversations) {
      ctrl.conversations = conversations;
    });

    ctrl.create = function ($event) {

      $scope.conversation = {
        type: 'general'
      };

      $mdDialog.show({
        templateUrl: 'modules/conversations/views/conversation.form.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        scope: $scope,
        preserveScope: true
      }).then(function () {

        Conversation.create($scope.conversation)
          .then(function (conversation) {
            ctrl.conversations.unshift(conversation);
          });
      });
    };

    ctrl.summitForm = function (form) {
      if (form.$valid) {
        $mdDialog.hide();
      }
    };

    ctrl.cancel = function () {
      $mdDialog.cancel();
    };

  });
