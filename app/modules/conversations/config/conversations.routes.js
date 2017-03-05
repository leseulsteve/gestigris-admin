'use strict';

angular.module('conversations').config(
  function ($stateProvider) {

    $stateProvider.

    state('conversations', {
      url: '/conversations',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        conversations: function ($q, $timeout, Conversation, PARAMS) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Conversation.find({
              type: {
                $ne: 'intervention'
              }
            })
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, conversations) {
        if ($location.path().split('/').length === 2) {
          $state.go('conversations.fiche', {
            conversationId: _.first(conversations)._id
          });
        }
      }
    }).

    state('conversations.fiche', {
      url: '/:conversationId',
      title: 'Conversations',
      templateUrl: 'modules/conversations/views/conversations.section.html',
      controller: 'ConversationsSectionController',
      controllerAs: 'conversationsSectionCtrl'
    });

  });
