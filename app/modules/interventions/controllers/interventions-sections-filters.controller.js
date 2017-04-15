'use strict';

angular.module('interventions').controller('InterventionsSectionFiltersController',
  function ($scope) {

    $scope.$watch('query', function (query) {
      _.forEach(['date'], function (queryField) {
        _.set($scope.query, queryField, _.get(query, queryField, null));
      });
    });

  });
