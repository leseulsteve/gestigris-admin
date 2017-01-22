'use strict';

angular.module('interventions').controller('PlagesInterventionsSectionController',
  function ($rootScope, $scope, $q, $timeout, plages, PlageIntervention, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.plages = plages;

    console.log(plages);

    function showPlage(plage) {
      if (_.isUndefined($scope.plage) || plage._id !== $scope.plage._id) {

        $scope.plage = undefined;

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          PlageIntervention.findById(plage._id)
        ]).then(function (results) {
          $scope.plage = _.last(results);
          ctrl.currentIndex = _.indexOf(ctrl.plages, _.find(ctrl.plages, {
            _id: $scope.plage._id
          }));
          $scope.$watch('plage', function (plage) {
            ctrl.plages.splice(ctrl.currentIndex, 1, plage);
          }, true);
        });
      }
    }

    var listeners = [];

    listeners.push($rootScope.$on('PlageIntervention:new', function ($event, nouvellePlage) {
      _.sortedPush(ctrl.plages, nouvellePlage, function (plage) {
        return plage.toString();
      });
    }));

    listeners.push($rootScope.$on('PlageIntervention:remove', function ($event, removedPlage) {
      _.remove(ctrl.plages, function (plage) {
        return plage._id === removedPlage._id;
      });
      if (removedPlage._id === $scope.plage._id) {
        return $state.go('plageId.fiche', {
          plageId: (ctrl.plages[ctrl.currentIndex - 1]  ||  _.first(ctrl.plages))._id
        });
      }

    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    var selectedPlage = _.find(ctrl.plages, ['_id', $stateParams.plageId]);

    if (_.isUndefined(selectedPlage)) {
      $state.go('interventions.fiche', {
        plageId: _.first(ctrl.plages)._id
      }, {
        notify: false
      });
    }

    showPlage(selectedPlage || _.first(ctrl.plages));

  });
