'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  function ($rootScope, $scope, $q, $timeout, benevoles, Benevole, $stateParams, PARAMS) {

    var ctrl = this;

    ctrl.benevoles = benevoles;

    function showBenevole(benevole) {
      if (_.isUndefined($scope.benevole) || benevole._id !== $scope.benevole._id) {

        $scope.benevole = undefined;

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Benevole.findById(benevole._id)
        ]).then(function (results) {
          $scope.benevole = _.last(results);
        });
      }
    }

    var listener = $rootScope.$on('Etablissement:new', function ($event, benevole) {
      var index = _.sortedIndex(ctrl.benevoles, function (benevole) {
        return benevole.toString();
      });
      ctrl.benevoles.splice(index, 0, benevole);
      showBenevole(ctrl.benevoles[index]);
    });

    $scope.$on('destroy', function () {
      listener();
    });

    showBenevole(_.find(ctrl.benevoles, ['_id', $stateParams.benevoleId]));

  });
