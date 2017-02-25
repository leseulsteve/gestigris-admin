'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  function ($rootScope, $scope, $q, $timeout, benevoles, Benevole, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.benevoles = benevoles;

    $scope.search = _.assign({
      actif: true
    }, $stateParams.filters);

    ctrl.showBenevole = function (benevole) {
      if (_.isUndefined($scope.benevole) || benevole._id !== $scope.benevole._id) {

        $scope.lodadingDone = false;
        $scope.benevole = benevole;

        $state.go('benevoles.fiche', {
          benevoleId: benevole._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Benevole.findById(benevole._id)
        ]).then(function (results) {
          $scope.benevole = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Benevole.search(search).then(function (benevoles) {
        ctrl.benevoles = benevoles;
        var firstBenevole = _.first(benevoles);
        if (firstBenevole && $scope.benevole._id !== firstBenevole._id) {
          ctrl.showBenevole(firstBenevole);
        }
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Benevole:new', function ($event, benevole) {
      _.sortedPush(ctrl.benevoles, benevole, function (benevole) {
        return benevole.toString();
      });
    }));

    listeners.push($rootScope.$on('Benevole:remove', function ($event, removedBenevole) {
      _.remove(ctrl.benevoles, function (benevole) {
        return removedBenevole._id === benevole._id;
      });
      if (removedBenevole._id === $scope.benevole._id) {
        ctrl.showBenevole(ctrl.benevoles[ctrl.currentIndex - 1]  ||  _.first(ctrl.benevoles));
      }
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    ctrl.showBenevole(_.find(ctrl.benevoles, ['_id', $stateParams.benevoleId]) || _.first(ctrl.benevoles));

  });
