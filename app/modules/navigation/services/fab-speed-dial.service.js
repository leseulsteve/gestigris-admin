'use strict';

angular.module('navigation').provider('FabSpeedDialService',
  function () {

    var items = [];

    return {

      addItem: function (item) {
        items.push(item);
      },

      $get: function () {

        return {

          getItems: function () {
            return items;
          }
        };

      }
    };

  });
