'use strict';

angular.module('etablissements').config(
  function ($provide) {

    $provide.decorator('Etablissement', function ($delegate, $rootScope, SearchFieldQueryBuilder) {

      var Etablissement = $delegate;

      Etablissement.search = function (params) {
        var query = {};
        if (_.isString(params)) {
          query = SearchFieldQueryBuilder.build(params);
        } else  {
          _.assign(query, params.etablissementName ? SearchFieldQueryBuilder.build(params.etablissementName) : undefined, _.omit(params, 'etablissementName'));
        }
        return Etablissement.find(query);
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
