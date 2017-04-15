'use strict';

angular.module('conversations').controller('ConversationsSectionFiltersController',
  function ($scope) {

    $scope.$watch('query', function (query) {
      _.forEach(['archived'], function (queryField) {
        _.set($scope.query, queryField, _.get(query, queryField, null));
      });
    });

  });
