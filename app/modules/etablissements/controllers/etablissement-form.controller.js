'use strict';

angular.module('etablissements').controller('EtablissementFromCtrl',
  function ($scope, EtablissementType, Ville, Province, Pays, Arrondissement, PlaceToEtablissementConverter) {

    var ctrl = this;

    var isNew = _.isUndefined($scope.etablissement);
    console.log($scope.etablissement);
    var newEtablissementTypes = [];

    function saveEtablissement() {
      return $scope.etablissement.save();
    }

    function createNewEtablissementType() {
      return EtablissementType.create({
        description: $scope.etablissement.typeDescription
      }).then(function (newEtablissementType) {
        console.log('NEW ETABLISSEMENT TYPE', newEtablissementType);
        newEtablissementTypes.push(newEtablissementType);
        $scope.etablissement.type = newEtablissementType._id;
      });
    }

    ctrl.saveEtablissement = function (form) {
      if (form.$valid && !isNew) {
        return $scope.addingType && _.isUndefined(_.find(newEtablissementTypes, 'description', $scope.etablissement.typeDescription)) ? createNewEtablissementType().then(function () {
          return saveEtablissement();
        }) : saveEtablissement();
      }
    };

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
      if (!$scope.addingType) {
        _.forEach(newEtablissementTypes, function (newEtablissementType) {
          if (newEtablissementType._id !== $scope.etablissement.type) {
            console.log('SUPRESSION', newEtablissementType);
            newEtablissementType.remove();
          }
        });
      }
    };

  });
