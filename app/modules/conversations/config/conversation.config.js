'use strict';

angular.module('conversations').config(
  function (ToolbarMenuServiceProvider, SectionFiltersProvider, CONVERSATIONS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Conversations',
      icon: CONVERSATIONS.ICONS.CONVERSATION,
      route: 'conversations'
    });

    SectionFiltersProvider.register('conversations', {
      filters: [{
        title: 'Non-archivées',
        query: {
          archived: false
        },
        type: {
          $ne: 'intervention'
        }
      }],
      templateUrl: 'modules/conversations/views/conversations.section-filters.html'
    });

  });
