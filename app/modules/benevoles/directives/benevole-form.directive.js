'use strict';

angular.module('benevoles').directive('benevoleForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        benevole: '=',
        autoSave: '='
      },
      templateUrl: 'modules/benevoles/views/benevole.form.html',
      controllerAs: 'benevoleFormCtrl',
      controller: 'BenevoleFromCtrl'
    };
  });
