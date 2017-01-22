'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($rootScope, $scope, $q, $timeout, etablissements, Etablissement, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.etablissements = etablissements;

    function showEtablissement(etablissement) {
      if (_.isUndefined($scope.etablissement) || etablissement._id !== $scope.etablissement._id) {

        $scope.etablissement = undefined;

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Etablissement.findById(etablissement._id)
        ]).then(function (results) {
          $scope.etablissement = _.last(results);
          ctrl.currentIndex = _.indexOf(ctrl.etablissements, _.find(ctrl.etablissements, {
            _id: $scope.etablissement._id
          }));
          $scope.$watch('etablissement', function (etablissement) {
            ctrl.etablissements.splice(ctrl.currentIndex, 1, etablissement);
          }, true);
        });
      }
    }

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
        return $state.go('etablissements.fiche', {
          etablissementId: (ctrl.etablissements[ctrl.currentIndex - 1]  ||  _.first(ctrl.etablissements))._id
        });
      }

    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    var selectedEtablissement = _.find(ctrl.etablissements, ['_id', $stateParams.etablissementId]);
    if (selectedEtablissement) {
      return showEtablissement(selectedEtablissement);
    }
    $state.go('etablissements.fiche', {
      etablissementId: _.first(ctrl.etablissements)._id
    }, {
      notify: false
    });
    showEtablissement(_.first(ctrl.etablissements));

  });
