'use strict';

angular.module('users').controller('BottinController',
  function () {

    var ctrl = this;

    ctrl.showDetails = function () {
      ctrl.currentBottin = {
        username: 'Steve'
      };
    };

  });
