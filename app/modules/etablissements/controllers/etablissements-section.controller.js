'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  function ($scope, etablissements) {

    var ctrl = this;

    ctrl.etablissements = etablissements;

    ctrl.showEtablissement = function (etablissement) {
      $scope.etablissement = etablissement;
    };

    ctrl.showEtablissement(_.first(ctrl.etablissements));

  });
