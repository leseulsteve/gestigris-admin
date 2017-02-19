'use strict';

angular.module('interventions').factory('InterventionTag',
  function (Schema, SearchFieldQueryBuilder) {

    var InterventionTag = new Schema('intervention-tag');

    InterventionTag.searchByName = function (params) {
      return InterventionTag.find(SearchFieldQueryBuilder.build(params));
    };

    InterventionTag.prototype.toString = function () {
      return this.name;
    };

    return InterventionTag;

  });
