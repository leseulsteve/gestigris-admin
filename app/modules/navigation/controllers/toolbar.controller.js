'use strict';

angular.module('interventions').controller('ToolbarController',
  function ($rootScope) {

    var ctrl = this;

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      ctrl.title = toState.title;
      if (toState.toolbar && toState.toolbar.tools) {
        ctrl.tools = toState.toolbar.tools;
        ctrl.handleAction = function ($event, action) {
          $rootScope.$broadcast('Toolbar:' + action, $event);
        };
      } else {
        ctrl.tools = undefined;
      }
    });

    ctrl.showSidenav = function () {
      $rootScope.$broadcast('sidenav:toggle');
    };

  });
