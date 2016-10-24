'use strict';

angular.module('etablissements').directive('etablissementForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '=',
        disabledForm: '=ngDisabled',
        autoSave: '='
      },
      templateUrl: 'modules/etablissements/views/etablissement.form.html',
      controllerAs: 'etablissementFormCtrl',
      controller: 'EtablissementFromCtrl'
    };
  });
