'use strict';

angular.module('conversations').config(
  function ($stateProvider) {

    $stateProvider.

    state('conversations', {
      url: '/conversations',
      title: 'Conversations',
      params: {
        filters: null
      },
      templateUrl: 'modules/conversations/views/conversations.section.html',
      controller: 'ConversationsSectionController',
      controllerAs: 'conversationsSectionCtrl'
    }).

    state('conversations.fiche', {
      url: '/:conversationId'
    });

  });
