'use strict';

angular.module('core').directive('mdTabAction',
  function () {
    return {
      restrict: 'E',
      scope: {
        tooltip: '@',
        icon: '@'
      },
      template: '<md-button class="md-fab md-mini md-primary" aria-label="{{ tooltip }}"' +
        'style="position:absolute;top:-28px;right:16px;">' +
        '<md-icon md-svg-icon="{{ icon }}"></md-icon>' +
        '<md-tooltip>{{ tooltip }}</md-tooltip>' +
        '</md-button>'
    };
  });
