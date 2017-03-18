'use strict';

angular.module('conversations').controller('ConversationsSectionController',
  function ($scope, $q, $rootScope, conversations, $state, $stateParams, $timeout, Conversation, PARAMS) {

    var ctrl = this;

    ctrl.conversations = conversations;

    $scope.search = $stateParams.filters;

    ctrl.showConversation = function (conversation) {
      if (_.isUndefined($scope.conversation) || conversation._id !== $scope.conversation._id) {

        $scope.lodadingDone = false;
        $scope.conversation = conversation;

        $state.go('conversations.fiche', {
          conversationId: conversation._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Conversation.findById(conversation._id)
        ]).then(function (results) {
          $scope.conversation = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Conversation.search(search).then(function (conversations) {
        ctrl.conversations = conversations;
        var firstConversation = _.first(conversations);
        if (firstConversation && $scope.conversation._id !== firstConversation._id) {
          ctrl.showConversation(firstConversation);
        }
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Conversation:new:currentUser', function ($event, newConversation) {
      ctrl.conversations.unshift(newConversation);
      ctrl.showConversation(newConversation);
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    ctrl.showConversation(_.find(ctrl.conversations, ['_id', $stateParams.conversationId]) ||  _.first(ctrl.conversations));

  });
