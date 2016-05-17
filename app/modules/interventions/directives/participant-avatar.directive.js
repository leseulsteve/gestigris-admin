'use strict';

angular.module('interventions').directive('participantAvatar',
  function () {

    var icons = {
      'confirmed': 'action:check_circle',
      'waiting': 'action:hourglass_full'
    };

    return {
      restrict: 'E',
      scope: true,
      compile: function (iElement, iAttrs) {
        iElement.append('<avatar class="md-whiteframe-3dp" user="benevole"></avatar>');
        if (iAttrs.hasOwnProperty('showStatus')) {
          iElement.append('<md-icon class="md-whiteframe-4dp" md-svg-icon="{{ iconName }}"></md-icon>');
        }

        return function (scope) {
          scope.iconName = scope.intervention.isConfirmed(scope.benevole) ? icons.confirmed : icons.waiting;
        };
      }
    };
  });
