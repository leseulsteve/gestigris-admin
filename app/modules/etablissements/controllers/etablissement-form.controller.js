'use strict';

angular.module('etablissements').controller('EtablissementFromCtrl',
  function ($scope, EtablissementType, Ville, Province,CommissionScolaire,  PlaceToEtablissementConverter) {
    var ctrl = this,
      isNew = _.isUndefined($scope.etablissement._id),
      createdEtablissementType,
      oldEtablissementType,
      createdCommissionScolaire,
      oldCommissionScolaire;

    EtablissementType.find().then(function (etablissementTypes) {
      ctrl.etablissementTypes = etablissementTypes;
    });

    CommissionScolaire.find().then(function (commissionsScolaires) {
      ctrl.commissionsScolaires = commissionsScolaires;
    });

    Ville.find().then(function (villes) {
      ctrl.villes = villes;
    });

    Province.find().then(function (provinces) {
      ctrl.provinces = provinces;
    });

    if (isNew) {
      $scope.$watch('place', function (place) {
        _.assign($scope.etablissement, place ? PlaceToEtablissementConverter.convert(place) : {});
      });
    }

    function saveEtablissement() {
      if ($scope.autoSave) {
        return $scope.etablissement.save();
      }
    }

    function createNewEtablissementType() {
      return needToCreateEtablissementType() ? EtablissementType.create({
        name: $scope.etablissement.typeDescription
      }).then(function (newEtablissementType) {
        createdEtablissementType = newEtablissementType;
        oldEtablissementType = $scope.etablissement.type;
        $scope.etablissement.type = newEtablissementType;
      }) : $q.when();
    }

    ctrl.toggleAddingType = function () {
      $scope.addingType = !$scope.addingType;
      if (!$scope.addingType && createdEtablissementType) {
        createdEtablissementType.remove().then(function () {
          createdEtablissementType = undefined;
        });
        $scope.etablissement.type = oldEtablissementType;
        saveEtablissement();
      }
      $scope.etablissement.typeDescription = undefined;
    };

    function needToCreateEtablissementType() {
      return $scope.addingType && (_.isUndefined(createdEtablissementType) || $scope.etablissement.typeDescription.toLowerCase() !== createdEtablissementType.name.toLowerCase());
    }

    function createNewCommissionScolaire() {
      return needToCreateCommissionScolaire() ? CommissionScolaire.create({
        name: $scope.etablissement.commissionDescription
      }).then(function (newCommissionScolaire) {
        createdCommissionScolaire = newCommissionScolaire;
        oldCommissionScolaire = $scope.etablissement.commissionScolaire;
        $scope.etablissement.commissionScolaire = newCommissionScolaire;
      }) : $q.when();
    }

    ctrl.toggleAddingCommission = function () {
      $scope.addingCommission = !$scope.addingCommission;
      if (!$scope.addingCommission && createdCommissionScolaire) {
        createdCommissionScolaire.remove().then(function () {
          createdCommissionScolaire = undefined;
        });
        $scope.etablissement.commissionScolaire = oldCommissionScolaire;
        saveEtablissement();
      }
      $scope.etablissement.commissionDescription = undefined;
    };

    function needToCreateCommissionScolaire() {
      return $scope.addingCommission && (_.isUndefined(createdCommissionScolaire) || $scope.etablissement.commissionDescription.toLowerCase() !== createdCommissionScolaire.name.toLowerCase());
    }

    ctrl.saveEtablissement = function (form) {
      if (form.$valid && !isNew) {
        return $q.all([
          createNewEtablissementType(),
          createNewCommissionScolaire()
        ]).then(saveEtablissement);
      }
    };
  });
