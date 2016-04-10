'use strict';

angular.module('core').run(
  function ($window) {

    var t0 = Number($window.localStorage.unloadEventFlag);
    if (isNaN(t0)) {
      t0 = 0;
    }
    if (new Date().getTime() - t0 > 10 * 1000) {
      // 10 seconds
      $window.localStorage.setItem('lastVisit', new Date());
    }

    $window.addEventListener('beforeunload', function () {
      $window.localStorage.unloadEventFlag = new Date().getTime();
    });

  });
