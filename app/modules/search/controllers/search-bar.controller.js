'use strict';

angular.module('search').controller('SearchBarController',
  function ($rootScope, SearchService) {

    var ctrl = this;

    ctrl.search = SearchService.search;

    ctrl.selectSearchResult = SearchService.select;

  });
