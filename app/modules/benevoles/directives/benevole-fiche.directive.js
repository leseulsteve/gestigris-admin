'use strict';

angular.module('benevoles').directive('benevoleFiche',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevole.fiche.html',
      controller: 'BenevoleFicheController',
      controllerAs: 'benevoleFicheCtrl',
      scope: {
        benevole: '='
      }
    };
  });
