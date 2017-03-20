'use strict';

angular.module('benevoles').directive('benevoleCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevole.card.html',
      controller: 'BenevoleCardController',
      controllerAs: 'benevoleCardCtrl',
      scope: {
        benevole: '='
      }
    };
  });
