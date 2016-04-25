'use strict';

angular.module('navigation').controller('FabSeedDialController',
  function (FabSpeedDialService, $mdDialog) {

    var ctrl = this;

    ctrl.items = FabSpeedDialService.getItems();

    ctrl.handleClick = function ($event, item) {

      $mdDialog.show(_.assign(item.dialog, {
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true
      }));
    };
  });
