'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  function ($rootScope, Benevole, $mdDialog) {

    var ctrl = this;

    Benevole.find().then(function (benevoles) {

      ctrl.showProfile = function (benevole) {
        ctrl.currentProfile = undefined;
        Benevole.findById(benevole._id).then(function (benevole) {
          ctrl.currentProfile = benevole;
        });
      };

      ctrl.benevoles = benevoles;
      ctrl.showProfile(_.first(benevoles));

      $rootScope.$on('Toolbar:addBenevole', function ($event, targetEvent) {
        $mdDialog.show({
          templateUrl: 'modules/benevoles/views/benevole.form-dialogue.html',
          parent: angular.element(document.body),
          targetEvent: targetEvent
        });
      });

    });

  });
