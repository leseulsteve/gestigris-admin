'use strict';

angular.module('interventions').controller('InterventionCardController',
  function ($scope, $mdConstant, InterventionTag, Benevole) {

    var ctrl = this;

    $scope.intervention.getBenevoles('confirmed').then(function (benevoles) {
      ctrl.confirmed = benevoles;
    });

    $scope.intervention.getBenevoles('interested').then(function (benevoles) {
      ctrl.interested = benevoles;
    });

    ctrl.chipSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, 186];

    ctrl.transformChip = function (chip) {
      return _.isObject(chip) ? chip : new InterventionTag({
        description: chip,
        isNew: true
      });
    };

    ctrl.searchTags = function (query) {
      return InterventionTag.find(query).then(function (results) {
        return _.differenceBy(results, $scope.intervention.tags, '_id');
      });
    };

    ctrl.dropped = function (item) {
      return new Benevole(item);
    };

    $scope.$on('destroyed', function () {
      console.log('SAVE PLAGE');
    });

  });
