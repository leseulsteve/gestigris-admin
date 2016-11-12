'use strict';

angular.module('etablissements').constant('ETABLISSEMENTS', {
  ICONS: {
    ETABLISSEMENT: 'social:school'
  },
  MAPZEN_KEY: 'search-v5XrVqS'
  DIALOGS: {
    ADD_ETABLISSEMENT: {
      templateUrl: 'modules/etablissements/views/nouvel-etablissement.dialog.html',
      controller: 'NouvelEtablissementController',
      controllerAs: 'nouvelEtablissementCtrl'
    }
  }
});

angular.module('etablissements').run(
  function ($rootScope, ETABLISSEMENTS) {
    $rootScope.ETABLISSEMENTS = ETABLISSEMENTS;
  });
