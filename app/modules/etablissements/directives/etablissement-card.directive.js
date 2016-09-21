'use strict';

angular.module('etablissements').directive('etablissementCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '=',
      },
      templateUrl: 'modules/etablissements/views/etablissement.card.html',
      compile: function (iElement) {
        iElement.attr('flex', '').attr('layout', 'column');
      }
    };
  });
