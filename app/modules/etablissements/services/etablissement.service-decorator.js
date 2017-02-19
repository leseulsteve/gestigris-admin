'use strict';

angular.module('etablissements').config(
  function ($provide) {

    $provide.decorator('Etablissement', function ($delegate, $rootScope, SearchFieldQueryBuilder) {

      var Etablissement = $delegate;

      Etablissement.search = function (term) {
        return Etablissement.searchByName(term);
      };

      Etablissement.searchByName = function (params) {
        return Etablissement.find(SearchFieldQueryBuilder.build(params));
      };

      Etablissement.post('create', function (next) {
        $rootScope.$broadcast('Etablissement:new', this);
        next();
      });

      Etablissement.post('remove', function (next) {
        $rootScope.$broadcast('Etablissement:remove', this);
        next();
      });

      return Etablissement;
    });

  });
