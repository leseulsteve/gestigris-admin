'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($rootScope, $scope, $q, $timeout, etablissements, Etablissement) {

    var ctrl = this;

    ctrl.etablissements = etablissements;

    var listener = $rootScope.$on('Etablissement:new', function ($event, etablissement) {
      var index = _.sortedIndex(ctrl.etablissements, function (etablissement) {
        return etablissement.toString();
      });
      ctrl.etablissements.splice(index, 0, etablissement);
      ctrl.showEtablissement(ctrl.etablissements[index]);
    });

    $scope.$on('destroy', function () {
      listener();
    });

    ctrl.showEtablissement = function (etablissement) {
      if (_.isUndefined($scope.etablissement) || etablissement._id !== $scope.etablissement._id) {
        $scope.etablissement = undefined;
        $q.all([$timeout(angular.noop, 700), Etablissement.findById(etablissement._id)]).then(function (results) {
          $scope.etablissement = _.last(results);
        });
      }
    };

    ctrl.showEtablissement(_.first(ctrl.etablissements));

  });
