'use strict';

angular.module('navigation').provider('FabSpeedDialService',
  function () {

    var items = [];

    return {

      addItem: function (item) {
        items.push(item);
      },

      $get: function () {

        var FabSpeedDialService = {};

        FabSpeedDialService.getItems = function () {
          return items;
        };

        return FabSpeedDialService;

      }
    };

  });
