'use strict';

angular.module('conversations').constant('CONVERSATIONS', {
  ICONS: {
    CONVERSATION: 'communication:message'
  }
});

angular.module('conversations').run(
  function ($rootScope, CONVERSATIONS) {
    $rootScope.CONVERSATIONS = CONVERSATIONS;
  });
