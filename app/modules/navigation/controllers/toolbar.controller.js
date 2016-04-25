'use strict';

angular.module('interventions').controller('ToolbarController',
  function (SearchService) {

    var ctrl = this;

    ctrl.search = SearchService.search;

    ctrl.selectSearchResult = function () {

    };

    /* $rootScope.$on('$stateChangeSuccess', function (event, toState) {

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
     };*/

  });
