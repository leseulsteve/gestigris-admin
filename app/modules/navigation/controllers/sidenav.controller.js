'use strict';

angular.module('interventions').controller('SidenavController',
  function ($rootScope, $mdSidenav) {

    var ctrl = this;

    $rootScope.$on('sidenav:toggle', function () {
      $mdSidenav('sidenav').toggle();
    });

    ctrl.closeSidenav = function () {
      if ($mdSidenav('sidenav').isOpen()) {
        $mdSidenav('sidenav').toggle();
      }
    };

  });
