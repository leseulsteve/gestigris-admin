'use strict';

angular.module('etablissements').controller('EtablissementSectionFiltersController',
  function ($scope, EtablissementType, CommissionScolaire, Ville) {

    EtablissementType.find().then(function (etablissementTypes) {
      this.etablissementTypes = etablissementTypes;
    }.bind(this));

    CommissionScolaire.find().then(function (commissionsScolaires) {
      this.commissionsScolaires = commissionsScolaires;
    }.bind(this));

    Ville.find().then(function (villes) {
      this.villes = villes;
    }.bind(this));

    $scope.$watch('query', function (query) {
      _.forEach(['type', 'commissionScolaire', 'address.city'], function (queryField) {
        _.set($scope.query, queryField, _.get(query, queryField, null));
      });
    });

  });
