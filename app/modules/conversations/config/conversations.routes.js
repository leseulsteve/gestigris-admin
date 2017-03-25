'use strict';

angular.module('conversations').config(
  function ($stateProvider) {

    $stateProvider.

    state('conversations', {
      url: '/conversations',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        conversations: function ($q, $timeout, Conversation, PARAMS, $stateParams) {
          $stateParams.filters = _.assign({
            archived: false,
            type: {
              $ne: 'intervention'
            }
          }, $stateParams.filters);
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Conversation.search($stateParams.filters)
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, $stateParams, conversations) {
        if ($location.path().split('/').length === 2) {
          $state.go('conversations.fiche', {
            conversationId: _.get(_.first(conversations), '_id'),
            filters: $stateParams.filters
          });
        }
      }
    }).

    state('conversations.fiche', {
      url: '/:conversationId',
      title: 'Conversations',
      params: {
        filters: null
      },
      templateUrl: 'modules/conversations/views/conversations.section.html',
      controller: 'ConversationsSectionController',
      controllerAs: 'conversationsSectionCtrl'
    });

  });
