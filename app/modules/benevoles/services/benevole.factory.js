'use strict';

angular.module('benevoles').factory('Benevole',
  function ($q, $timeout, Schema) {

    var Benevole = new Schema('benevole');

    Benevole.post('find', function (next) {
      this.dateNaissance = new Date(this.dateNaissance);
      next();
    });

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    Benevole.search = function (term) {
      return this.find().then(function (benevoles) {
        return _.filter(benevoles, function (benevole) {
          return _.includes(benevole.toString().toLowerCase(), term.toLowerCase());
        });
      });
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    return Benevole;

  });
