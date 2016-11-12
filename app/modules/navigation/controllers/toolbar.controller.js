'use strict';

angular.module('interventions').controller('ToolbarController',
  function (ToolbarMenuService) {

    this.menuItems = ToolbarMenuService.getItems();

  });
