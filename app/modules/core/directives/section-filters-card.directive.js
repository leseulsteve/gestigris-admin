'use strict';

angular.module('core').directive('sectionFiltersCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        sectionName: '@',
        onChange: '&'
      },
      templateUrl: 'modules/core/views/section-filters.card.html',
      controllerAs: 'sectionFiltersCardCtrl',
      controller: function ($scope, SectionFilters, Toast) {

        SectionFilters.getFilters($scope.sectionName).then(function (filters) {
          $scope.filters = filters;
        });

        this.selectFilter = function (filter) {
          $scope.selectedFilter = filter;
          $scope.query = angular.copy(filter.query);
          SectionFilters.setSelectedFilter($scope.sectionName, filter);
        };

        SectionFilters.getSelectedFilter($scope.sectionName).then(function (selectedFilter) {
          this.selectFilter(selectedFilter);
        }.bind(this));

        $scope.$watch('query', function (value, oldValue) {
          if (value !== oldValue) {
            $scope.onChange({
              query: value
            });
          }
        }, true);

        this.saveFilter = function (filterForm) {
          if (filterForm.$valid) {
            var that = this;
            $scope.changingTitle = false;
            _.assign($scope.selectedFilter, {
              query: $scope.query
            }).save().then(function () {
              that.selectFilter($scope.selectedFilter);
              $scope.filters.splice(_.findIndex($scope.filters, ['_id', $scope.selectedFilter._id]), 1, $scope.selectedFilter);
              $scope.showFilters = false;
              filterForm.$setPristine();
              Toast.show('Sauvegardé!');
            });
          }
        };

        this.deleteFilter = function () {
          $scope.selectedFilter.remove().then(function () {
            $scope.showFilters = false;
            _.remove($scope.filters, {
              _id: $scope.selectedFilter._id
            });
            this.selectFilter(_.first($scope.filters));
            Toast.show('Supprimé!');
          }.bind(this));
        };

        this.createFilter = function () {
          var filter = SectionFilters.getNewFilter($scope.sectionName);
          $scope.changingTitle = true;
          $scope.showFilters = true;
          $scope.filters.unshift(filter);
          this.selectFilter(filter);
        };

      }
    };
  });
