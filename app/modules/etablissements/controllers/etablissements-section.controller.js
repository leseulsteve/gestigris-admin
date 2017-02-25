'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($rootScope, $scope, $q, $timeout, etablissements, Etablissement, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.etablissements = etablissements;

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
      Etablissement.search(search).then(function (etablissements) {
        ctrl.etablissements = etablissements;
        var firstEtablissement = _.first(etablissements);
        if (firstEtablissement && $scope.etablissement._id !== firstEtablissement._id) {
          ctrl.showEtablissement(firstEtablissement);
        }
      });
    };

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

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    ctrl.showEtablissement(_.find(ctrl.etablissements, ['_id', $stateParams.etablissementId]) ||  _.first(ctrl.etablissements));

  });
