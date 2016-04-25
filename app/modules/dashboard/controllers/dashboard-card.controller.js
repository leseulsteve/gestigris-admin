'use strict';

angular.module('dashboard').controller('DashboardCardController',
  function ($rootScope, $mdDialog) {

    var ctrl = this;

    ctrl.expand = function ($event, cardName) {

      var dialog = {
        targetEvent: $event,
        fullscreen: true
      };

      switch (cardName) {
      case 'benevoles':
        _.assign(dialog, {
          controller: 'BenevolesSectionController',
          controllerAs: 'benevolesSectionCtrl',
          templateUrl: 'modules/benevoles/views/benevoles.section.html',
          parent: angular.element(document.body)
        });
      }

      if (cardName) {
        $mdDialog.show(dialog);
      }

      $rootScope.$on('Dialog:close', function () {
        $mdDialog.hide();
      });

    };

  });
