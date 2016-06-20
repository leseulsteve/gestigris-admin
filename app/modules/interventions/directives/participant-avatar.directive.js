'use strict';

angular.module('interventions').directive('participantAvatar',
  function ($compile) {

    var icons = {
      'confirmed': 'action:check_circle',
      'waiting': 'action:hourglass_full'
    };

    return {
      restrict: 'E',
      scope: {
        benevole: '=',
        plage: '=',
        intervention: '='
      },
      compile: function (iElement, iAttrs) {

        iElement.append('<avatar user="benevole"></avatar>');

        if (iAttrs.hasOwnProperty('showStatus')) {
          iElement.append('<md-icon class="md-whiteframe-3dp" md-svg-icon="{{ iconName }}"></md-icon>');
        }

        return function (scope, element) {
          if (iAttrs.hasOwnProperty('showStatus')) {
            if (scope.intervention) {
              scope.iconName = scope.intervention.isConfirmed(scope.benevole) ? icons.confirmed : icons.waiting;

            } else if (scope.plage) {
              scope.iconName = scope.plage.isConfirmed(scope.benevole) ? icons.confirmed : icons.waiting;
            }
            $compile(element.find('md-icon'))(scope);
          }
        };
      }
    };
  });
