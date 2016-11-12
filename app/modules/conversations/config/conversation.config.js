'use strict';

angular.module('conversations').config(
  function (ToolbarMenuServiceProvider, CONVERSATIONS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Messagerie',
      icon: CONVERSATIONS.ICONS.CONVERSATIONS,
      route: 'conversations'
    });

  });
