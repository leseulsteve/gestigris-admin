'use strict';

angular.module('core').service('Toast',
  function ($mdToast) {

    this.show = function (message) {
      return $mdToast.show($mdToast.simple().textContent(message));
    };

  });
