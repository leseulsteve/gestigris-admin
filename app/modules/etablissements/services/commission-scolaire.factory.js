'use strict';

angular.module('etablissements').factory('CommissionScolaire',
  function (Schema) {

    var CommissionScolaire = new Schema('commission-scolaire');

    CommissionScolaire.prototype.toString = function () {
      return this.name;
    };

    return CommissionScolaire;

  });
