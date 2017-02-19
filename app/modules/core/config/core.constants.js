'use strict';

angular.module('core').constant('PARAMS', {
  MIN_LOADING_TIME: 700,
  DEBOUNCE_TIME: 700
});

angular.module('core').run(
  function ($rootScope, PARAMS) {
    $rootScope.PARAMS = PARAMS;
  });
