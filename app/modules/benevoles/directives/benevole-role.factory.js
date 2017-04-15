'use strict';

angular.module('benevoles').factory('BenevoleRole',

  function ($q, $timeout, Schema) {

    var BenevoleRole = new Schema('benevole-role');

    BenevoleRole.prototype.toString = function () {
      return this.description;
    };

    return BenevoleRole;

  });
