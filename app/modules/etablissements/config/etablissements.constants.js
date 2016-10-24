'use strict';

angular.module('etablissements').constant('ETABLISSEMENTS', {
  ICONS: {
    ETABLISSEMENT: 'social:school'
  },
  MAPZEN_KEY: 'search-v5XrVqS'
});

angular.module('etablissements').run(
  function ($rootScope, ETABLISSEMENTS) {
    $rootScope.ETABLISSEMENTS = ETABLISSEMENTS;
  });
