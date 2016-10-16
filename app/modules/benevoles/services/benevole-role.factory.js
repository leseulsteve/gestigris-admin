'use strict';

angular.module('interventions').factory('BenevoleRole',
  function ($q, $timeout, Schema) {

    var BenevoleRole = new Schema('benevole-role');

    BenevoleRole.prototype.toString = function () {
      return this.description;
    };

    return BenevoleRole;

  });
