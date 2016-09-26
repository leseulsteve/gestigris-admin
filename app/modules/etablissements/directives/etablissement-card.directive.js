'use strict';

angular.module('etablissements').directive('etablissementCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '=',
      },
      templateUrl: 'modules/etablissements/views/etablissement.card.html',
      controller: 'EtablissementCardCtrl',
      controllerAs: 'etablissementCardCtrl',
      compile: function (iElement) {
        iElement.attr('flex', '').attr('layout', 'column');
      }
    };
  });
