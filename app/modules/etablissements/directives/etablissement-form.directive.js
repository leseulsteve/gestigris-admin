'use strict';

angular.module('etablissements').directive('etablissementForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '='
      },
      templateUrl: 'modules/etablissements/views/etablissement.form.html',
      controllerAs: 'etablissementFormCtrl',
      controller: function ($scope, EtablissementType, Ville, Province, Pays, Arrondissement, PlaceToEtablissementConverter) {

        var ctrl = this;

        EtablissementType.find().then(function (etablissementTypes) {
          ctrl.etablissementTypes = etablissementTypes;
        });

        Ville.find().then(function (villes) {
          ctrl.villes = villes;
        });

        Province.find().then(function (provinces) {
          ctrl.provinces = provinces;
        });

        Pays.find().then(function (pays) {
          ctrl.pays = pays;
        });

        Arrondissement.find().then(function (arrondissements) {
          ctrl.arrondissements = arrondissements;
          $scope.$watch('place', function (place) {
            angular.extend($scope, {
              etablissement: place ? PlaceToEtablissementConverter.convert(place, {
                arrondissements: arrondissements
              }) : $scope.etablissement
            });
          });
        });

        ctrl.toggleAddingType = function () {
          $scope.addingType = !$scope.addingType;
          $scope.etablissement[$scope.addingType ? 'type' : 'typeDescription'] = undefined;
        };

      }
    };
  });
