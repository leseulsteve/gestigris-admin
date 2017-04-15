'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  function ($rootScope, $scope, $q, $timeout, Benevole, $stateParams, $state, PARAMS) {

    var ctrl = this;

    $scope.search = $stateParams.filters;

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
      Benevole.search(search)
        .then(function (benevoles) {
          ctrl.benevoles = benevoles;
          if (ctrl.benevoles.length) {
            var firstBenevole = _.first(benevoles);
            if (firstBenevole && (_.isUndefined($scope.benevole) || $scope.benevole._id !== firstBenevole._id)) {
              ctrl.showBenevole(firstBenevole);
            }
          } else {
            $scope.lodadingDone = true;
            $scope.benevole = undefined;
          }

        });
    };

    ctrl.updateFilters = _.debounce(ctrl.updateSearch, PARAMS.DEBOUNCE_TIME);

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

    $rootScope.$on('$stateChangeStart', function () {
      _.invokeMap(listeners, _.call);
    });

  });
