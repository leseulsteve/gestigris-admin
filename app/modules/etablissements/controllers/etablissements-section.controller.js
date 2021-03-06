'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($rootScope, $scope, $q, $timeout, Etablissement, $stateParams, $state, PARAMS) {

    var ctrl = this;

    $scope.search = $stateParams.filters;

    ctrl.showEtablissement = function (etablissement) {
      if (_.isUndefined($scope.etablissement) || etablissement._id !== $scope.etablissement._id) {

        $scope.lodadingDone = false;
        $scope.etablissement = etablissement;

        $state.go('etablissements.fiche', {
          etablissementId: etablissement._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Etablissement.findById(etablissement._id)
        ]).then(function (results) {
          $scope.etablissement = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Etablissement.search(search)
        .then(function (etablissements) {
          ctrl.etablissements = etablissements;
          if (etablissements.length) {
            var firstEtablissement = _.first(etablissements);
            if (firstEtablissement && (_.isUndefined($scope.etablissement) ||  $scope.etablissement._id !== firstEtablissement._id)) {
              ctrl.showEtablissement(firstEtablissement);
            }
          } else {
            $scope.lodadingDone = true;
            $scope.etablissement = undefined;
          }
        });
    };

    ctrl.updateFilters = _.debounce(ctrl.updateSearch, PARAMS.DEBOUNCE_TIME);

    var listeners = [];

    listeners.push($rootScope.$on('Etablissement:new', function ($event, newEtablissement) {
      _.sortedPush(ctrl.etablissements, newEtablissement, function (etablissement) {
        return etablissement.toString();
      });
    }));

    listeners.push($rootScope.$on('Etablissement:remove', function ($event, removedEtablissement) {
      _.remove(ctrl.etablissements, function (etablissement) {
        return removedEtablissement._id === etablissement._id;
      });
      if (removedEtablissement._id === $scope.etablissement._id) {
        ctrl.showEtablissement(ctrl.etablissements[ctrl.currentIndex - 1]  ||  _.first(ctrl.etablissements));
      }

    }));

    $rootScope.$on('$stateChangeStart', function () {
      _.invokeMap(listeners, _.call);
    });

  });
