'use strict';

angular.module('core').provider('RightPanel',
  function () {

    var panels = {};

    return {
      register: function (params) {
        panels[params.panelName] = params;
      },

      $get: function ($rootScope) {

        return {

          show: function (panelName, item) {
            $rootScope.$broadcast('Right-Panel:show', _.assign(panels[panelName], {
              item: item
            }));
          }
        };
      }
    };

  });
