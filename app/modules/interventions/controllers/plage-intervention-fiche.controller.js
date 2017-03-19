'use strict';

angular.module('interventions').controller('PlageFicheController',
  function ($rootScope, $scope, $q, $state, Moment, PlageIntervention, Intervention) {

    var ctrl = this;

    var unwatch = $scope.$watch('plage', function (plage) {
      if (plage) {
        plage.getInterventions().then(function (interventions) {
          ctrl.interventions = interventions;
        });
        unwatch();
      }
    });

    ctrl.updateConversation = function (plage) {
      (plage || ctrl.plage).getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });
    };

    function populatePlage(plage) {
      plage.createdAt = new Moment(plage.createdAt);
      ctrl.updateConversation(plage);

      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    populatePlage($scope.plage).then(function () {
      ctrl.plage = $scope.plage;
    });

    ctrl.addIntervention = function () {
      Intervention.create(_.assign({
        date: {
          start: new Date(),
          end: new Date()
        },
        plage: ctrl.plage._id
      }, _.omit(_.first(ctrl.interventions), ['createdAt', 'updatedAt', '_id', 'status']))).then(function (intervention) {
        ctrl.interventions.unshift(intervention);
        $rootScope.$broadcast('PLAGE:STATUS-CHANGE', _.assign(ctrl.plage, {
          status: 'OPEN'
        }));
      });
    };

    ctrl.removeIntervention = function ($index) {
      ctrl.interventions.splice($index, 1);
    };

    ctrl.updateStatus = function () {
      ctrl.plage.status = _.filter(ctrl.interventions, ['status', 'OPEN']).length ? 'OPEN' : 'CLOSE';
      $rootScope.$broadcast('PLAGE:STATUS-CHANGE', ctrl.plage);
    };

  });
