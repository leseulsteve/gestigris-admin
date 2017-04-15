'use strict';

angular.module('etablissements').config(
  function ($provide) {

    $provide.decorator('Etablissement', function ($delegate, $rootScope, SearchQueryBuilder) {

      var Etablissement = $delegate;

      Etablissement.search = function (params) {
        return Etablissement.find(SearchQueryBuilder.build(params));
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
