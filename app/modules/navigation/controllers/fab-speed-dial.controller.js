'use strict';

angular.module('navigation').controller('FabSeedDialController',
  function (FabSpeedDialService, Dialog) {

    var ctrl = this;

    ctrl.items = FabSpeedDialService.getItems();

    ctrl.handleClick = function ($event, item) {

      var dialog = new Dialog(item.dialog);

      dialog.show($event);
    };
  });
