'use strict';

angular.module('conversations').constant('MESSAGES', {
  ICONS: {
    MESSAGE: 'communication:message'
  }
});

angular.module('conversations').run(
  function ($rootScope, MESSAGES) {
    $rootScope.MESSAGES = MESSAGES;
  });
