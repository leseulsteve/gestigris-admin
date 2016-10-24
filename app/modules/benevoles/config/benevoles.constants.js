'use strict';

angular.module('benevoles').constant('BENEVOLES', {
  ICONS: {
    BENEVOLE: 'action:account_circle',
    OBSERVATEUR: 'image:remove_red_eye'
  }
});

angular.module('benevoles').run(
  function ($rootScope, BENEVOLES) {
    $rootScope.BENEVOLES = BENEVOLES;
  });
