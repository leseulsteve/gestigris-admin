'use strict';

angular.module('dashboard').controller('DashboardCardController',
  function ($rootScope, Dialog) {

    var ctrl = this;

    ctrl.expand = function ($event, cardName) {

      var dialogConfig = {
          targetEvent: $event,
          fullscreen: true
        },
        dialog;

      switch (cardName) {
      case 'benevoles':

        dialog = new Dialog(_.assign({
          controller: 'BenevolesSectionController',
          controllerAs: 'benevolesSectionCtrl',
          templateUrl: 'modules/benevoles/views/benevoles.section.html'
        }, dialogConfig));
      }

      if (cardName) {
        dialog.show($event);
      }

      $rootScope.$on('Dialog:close', function () {
        dialog.hide();
      });

    };

  });
