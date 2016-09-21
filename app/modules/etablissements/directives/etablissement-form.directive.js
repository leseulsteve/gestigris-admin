'use strict';

angular.module('etablissements').directive('etablissementForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '='
      },
      templateUrl: 'modules/etablissements/views/etablissement.form.html',
      controllerAs: 'etablissementFormCtrl',
      controller: 'EtablissementFromCtrl'
    };
  });
