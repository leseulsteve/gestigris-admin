'use strict';

angular.module('core').directive('rightPanel',
  function ($rootScope, $controller, $mdSidenav, $templateCache) {
    return {
      restrict: 'E',
      templateUrl: 'modules/core/views/right-panel.html',
      link: function (scope) {
        $rootScope.$on('Right-Panel:show', function ($event, panel) {
          if (panel.template) {
            panel.templateUrl = 'right-panel-template.html';
            $templateCache.put(panel.templateUrl, panel.template);
          }

          scope.templateUrl = panel.templateUrl;

          scope[panel.itemName] = panel.item;
          scope.title = panel.item.toString();

          if (panel.controller) {
            scope[panel.controllerAs] = $controller(panel.controller, {
              $scope: scope
            });
          }

          $mdSidenav('right-panel').toggle();

        });

        scope.closeSideNav = function () {
          $mdSidenav('right-panel').toggle();
        };
      }
    };
  });
