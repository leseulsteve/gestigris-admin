'use strict';

angular.module('conversations').controller('ConversationsSectionController',
  function ($scope, $q, $rootScope, conversations, $state, $stateParams, $timeout, Conversation, PARAMS) {

    var ctrl = this;

    ctrl.conversations = conversations;

    Conversation.findOne({
      type: {
        $ne: 'intervention'
      },
      archived: true
    }).then(function (conversation) {
      ctrl.noArchives = _.isNull(conversation);
    });

    $scope.search = $stateParams.filters ||  {
      archived: false,
      type: {
        $ne: 'intervention'
      }
    };

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
        if (ctrl.conversations.length) {
          var firstConversation = _.first(conversations);
          if (firstConversation && (_.isUndefined($scope.conversation) || $scope.conversation._id !== firstConversation._id)) {
            ctrl.showConversation(firstConversation);
          }
        } else {
          $scope.conversation = undefined;
        }
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Conversation:new:currentUser', function ($event, newConversation) {
      ctrl.conversations.unshift(newConversation);
      ctrl.showConversation(newConversation);
    }));

    listeners.push($rootScope.$on('Conversation:archived', function ($event, conversation) {

      var convoIndex = _.findIndex(ctrl.conversations, function (currentConvo) {
        return conversation._id === currentConvo._id;
      });
      if ($scope.conversation._id === conversation._id) {
        var conversationToShow = ctrl.conversations[convoIndex - 1] || ctrl.conversations[convoIndex + 1];
        if (conversationToShow) {
          ctrl.showConversation(conversationToShow);
        } else {
          $scope.conversation = undefined;
        }
      }
      _.pullAt(ctrl.conversations, convoIndex);
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    if (ctrl.conversations.length) {
      ctrl.showConversation(_.find(ctrl.conversations, ['_id', $stateParams.conversationId]) ||  _.first(ctrl.conversations));
    } else {
      $scope.lodadingDone = true;
    }

  });
