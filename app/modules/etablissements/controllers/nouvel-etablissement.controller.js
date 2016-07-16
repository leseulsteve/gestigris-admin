'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function ($scope, Etablissement, EtablissementType) {

    var ctrl = this;

    EtablissementType.find().then(function (etablissementTypes) {
      ctrl.etablissementTypes = etablissementTypes;
    });

    $scope.$watch('etablissement', function (value) {
      console.log(value);
    }, true);

    ctrl.create = function (form, params) {

      form.etablissementType.$setTouched();

      if (form.$valid) {
        console.log(params);
        ctrl.dialog.hide();
      }

      Etablissement = Etablissement;
      /*Etablissement.create(params).then(function() {
        $scope.close();
      });*/
    };

  });
