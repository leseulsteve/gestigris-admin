'use strict';

angular.module('benevoles').controller('BenevolesSectionFiltersController',
  function ($scope, BenevoleRole) {

    BenevoleRole.find().then(function (roles) {
      this.roles = roles;
    }.bind(this));

    $scope.$watch('query', function (query) {
      _.forEach(['role', 'sexe', 'orientation'], function (queryField) {
        $scope.query[queryField] = query[queryField] || null;
      });
    });

  });
