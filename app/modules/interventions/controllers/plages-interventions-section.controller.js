'use strict';

angular.module('interventions').controller('PlagesInterventionsSectionController',
  function ($rootScope, $scope, $q, $timeout, plages, PlageIntervention, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.plages = plages;
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
      PlageIntervention.formatFilters(search).then(function (query) {
        PlageIntervention.find(query).then(function (plages) {
          ctrl.plages = plages;
          var firstPlage = _.first(plages);
          if (firstPlage && $scope.plage._id !== firstPlage._id) {
            ctrl.showPlage(firstPlage);
          }
        });
      });
    };

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
        ctrl.showPlage(ctrl.plages[ctrl.currentIndex - 1]  ||  _.first(ctrl.plages));
      }

    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    ctrl.showPlage(_.find(ctrl.plages, ['_id', $stateParams.plageId]) || _.first(ctrl.plages));

  });
