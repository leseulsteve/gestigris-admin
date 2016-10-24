'use strict';

angular.module('messages').constant('MESSAGES', {
  ICONS: {
    MESSAGE: 'communication:message'
  }
});

angular.module('messages').run(
  function ($rootScope, MESSAGES) {
    $rootScope.MESSAGES = MESSAGES;
  });
