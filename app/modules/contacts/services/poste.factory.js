'use strict';

angular.module('contacts').factory('Poste',
  function (Schema) {

    var Poste = new Schema('poste');

    Poste.prototype.toString = function () {
      return this.description;
    };

    return Poste;

  });
