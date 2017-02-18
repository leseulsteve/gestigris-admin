'use strict';

angular.module('interventions').controller('PlageFicheController',
  function ($scope, $q, $state, PlageIntervention, Intervention) {

    var ctrl = this;

    var unwatch = $scope.$watch('plage', function (plage) {
      if (plage) {
        plage.getInterventions().then(function (interventions) {
          ctrl.interventions = interventions;
        });
        unwatch();
      }
    });

    function populatePlage(plage) {
      plage.getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });

      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    populatePlage($scope.plage).then(function () {
      ctrl.plage = $scope.plage;
    });

    ctrl.addIntervention = function () {
      var existingIntervention = _.first(ctrl.interventions);
      Intervention.create(_.assign({
        date: {
          start: {
            type: new Date()
          },
          end: {
            type: new Date()
          }
        },
        plage: ctrl.plage._id
      }, _.omit(existingIntervention, ['createdAt', 'updatedAt', '_id']))).then(function (intervention) {
        ctrl.interventions.unshift(intervention);
      });
    };

    ctrl.removeIntervention = function ($index) {
      ctrl.interventions.splice($index, 1);
    };

  });
