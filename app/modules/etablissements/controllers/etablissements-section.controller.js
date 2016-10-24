'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($rootScope, $scope, $q, $timeout, etablissements, Etablissement, $stateParams, PARAMS) {

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
        });
      }
    }

    var listener = $rootScope.$on('Etablissement:new', function ($event, newEtablissement) {
      _.sortedPush(ctrl.etablissements, newEtablissement, function (etablissement) {
        return etablissement.toString();
      });
    });

    $scope.$on('destroy', function () {
      listener();
    });

    showEtablissement(_.find(ctrl.etablissements, ['_id', $stateParams.etablissementId]));

  });
