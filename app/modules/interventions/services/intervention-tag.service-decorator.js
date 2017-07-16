'use strict';

angular.module('interventions').config(
  function ($provide) {

    $provide.decorator('InterventionTag', function ($delegate, SearchQueryBuilder) {

      var InterventionTag = $delegate;

      InterventionTag.searchByName = function (params) {
        return InterventionTag.find(SearchFieldQueryBuilder.build(params));
      };

      return InterventionTag;
    });

  });
