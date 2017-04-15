'use strict';

angular.module('interventions').controller('InterventionsSectionController',
  function ($rootScope, $scope, $q, $timeout, PlageIntervention, $stateParams, $state, PARAMS) {

    var ctrl = this;

    $scope.search = $stateParams.filters;

    ctrl.showPlage = function (plage) {
      if (_.isUndefined($scope.plage) || plage._id !== $scope.plage._id) {

        $scope.lodadingDone = false;
        $scope.plage = plage;

        $state.go('interventions.fiche', {
          plageId: plage._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          PlageIntervention.findById(plage._id)
        ]).then(function (results) {
          $scope.plage = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      PlageIntervention.search(search)
        .then(function (plages) {
          ctrl.plages = plages;
          if (plages.length) {
            var firstPlage = _.first(plages);
            if (firstPlage && (_.isUndefined($scope.plage) || $scope.plage._id !== firstPlage._id)) {
              ctrl.showPlage(firstPlage);
            }
          } else {
            $scope.lodadingDone = true;
            $scope.plage = undefined;
          }
        });
    };

    ctrl.updateFilters = _.debounce(ctrl.updateSearch, PARAMS.DEBOUNCE_TIME);

    var listeners = [];

    listeners.push($rootScope.$on('PLAGE:STATUS-CHANGE', function ($event, plage) {
      _.find(ctrl.plages, '_id', plage._id).status = plage.status;
    }));

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
        ctrl.showPlage(ctrl.plages[ctrl.currentIndex - 1]  ||  _.first(ctrl.plages));
      }

    }));

    $rootScope.$on('$stateChangeStart', function () {
      _.invokeMap(listeners, _.call);
    });

  });
