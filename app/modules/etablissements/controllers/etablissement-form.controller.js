'use strict';

angular.module('etablissements').controller('EtablissementFromCtrl',
  function ($scope, EtablissementType, Ville, Province, Arrondissement, PlaceToEtablissementConverter) {

    var ctrl = this,
      isNew = _.isUndefined($scope.etablissement._id),
      createdEtablissementType,
      oldEtablissementType;

    EtablissementType.find().then(function (etablissementTypes) {
      ctrl.etablissementTypes = etablissementTypes;
    });

    Ville.find().then(function (villes) {
      ctrl.villes = villes;
    });

    Province.find().then(function (provinces) {
      ctrl.provinces = provinces;
    });

    Arrondissement.find().then(function (arrondissements) {
      ctrl.arrondissements = arrondissements;
      if (isNew) {
        $scope.$watch('place', function (place) {
          _.assign($scope.etablissement, place ? PlaceToEtablissementConverter.convert(place, {
            arrondissements: arrondissements
          }) : {});
        });
      }
    });

    function saveEtablissement() {
      return $scope.etablissement.save().then(function () {
        console.log('etablissement sauvegardé!');
      });
    }

    function createNewEtablissementType() {
      return EtablissementType.create({
        name: $scope.etablissement.typeDescription
      }).then(function (newEtablissementType) {
        console.log('NEW ETABLISSEMENT TYPE', newEtablissementType);
        createdEtablissementType = newEtablissementType;
        oldEtablissementType = $scope.etablissement.type;
        $scope.etablissement.type = newEtablissementType;
      });
    }

    ctrl.toggleAddingType = function () {
      $scope.addingType = !$scope.addingType;
      if (!$scope.addingType && createdEtablissementType) {
        createdEtablissementType.remove().then(function () {
          createdEtablissementType = undefined;
          console.log('EtablissementType deleted');
        });
        $scope.etablissement.type = oldEtablissementType;
        saveEtablissement();
      }
      $scope.etablissement.typeDescription = undefined;
    };

    function needToCreateEtablissementType() {
      return $scope.addingType && (_.isUndefined(createdEtablissementType) || $scope.etablissement.typeDescription.toLowerCase() !== createdEtablissementType.name.toLowerCase());
    }

    ctrl.saveEtablissement = function (form) {
      if (form.$valid && !isNew) {
        return needToCreateEtablissementType() ? createNewEtablissementType().then(function () {
          return saveEtablissement();
        }) : saveEtablissement();
      }
    };
  });
