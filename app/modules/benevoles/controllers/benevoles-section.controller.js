'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  function ($rootScope, $scope, $q, $timeout, benevoles, Benevole, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.benevoles = benevoles;

    ctrl.showBenevole = function (benevole) {
      if (_.isUndefined($scope.benevole) || benevole._id !== $scope.benevole._id) {

        $scope.benevole = undefined;

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Benevole.findById(benevole._id)
        ]).then(function (results) {
          $scope.benevole = _.last(results);
          ctrl.currentIndex = _.indexOf(ctrl.benevoles, _.find(ctrl.benevoles, {
            _id: $scope.benevole._id
          }));
          $scope.$watch('benevole', function (benevole) {
            ctrl.benevoles.splice(ctrl.currentIndex, 1, benevole);
          }, true);
        });
      }
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
        return $state.go('benevoles.fiche', {
          benevoleId: (ctrl.benevoles[ctrl.currentIndex - 1]  ||  _.first(ctrl.benevoles))._id
        });
      }
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    var selectedBenevole = _.find(ctrl.benevoles, ['_id', $stateParams.benevoleId]);
    if (selectedBenevole) {
      ctrl.showBenevole(selectedBenevole);
    } else {
      $state.go('benevoles.fiche', {
        benevoleId: _.first(ctrl.benevoles)._id
      }, {
        notify: false
      });
      ctrl.showBenevole(_.first(ctrl.benevoles));
    }

  });
