'use strict';

angular.module('interventions').controller('InterventionCardController',
  function ($scope, $mdConstant, InterventionTag, Benevole, Moment, Dialog) {

    var ctrl = this;

    // Initialisation...

    ctrl.start = new Date($scope.intervention.date.start.seconds(0).milliseconds(0));
    ctrl.setStartDate = function () {
      $scope.intervention.date.start = new Moment(ctrl.start);
      $scope.showStart = false;
    };
    ctrl.end = new Date($scope.intervention.date.end.seconds(0).milliseconds(0));
    ctrl.setEndDate = function () {
      $scope.intervention.date.end = new Moment(ctrl.end);
      $scope.showEnd = false;
    };

    $scope.intervention.getBenevoles('participants').then(function (benevoles) {
      ctrl.participants = _.sortBy(benevoles, function (benevole) {
        return benevole.toString();
      });
    });

    $scope.intervention.getBenevoles('interested').then(function (benevoles) {
      ctrl.interested = _.sortBy(benevoles, function (benevole) {
        return benevole.toString();
      });
    });

    // Tags
    ctrl.chipSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, 186];

    ctrl.transformChip = function (chip) {
      return _.isObject(chip) ? chip : new InterventionTag({
        description: chip,
        isNew: true
      });
    };

    ctrl.searchTags = function (query) {
      return InterventionTag.find(query).then(function (results) {
        return _.differenceBy(results, $scope.intervention.tags, '_id');
      });
    };

    // Dragon drop

    ctrl.droppedInInterested = function (item) {
      console.log(item);
      return new Benevole(item);
    };

    ctrl.droppedInParticipants = function (item) {

      var benevole = new Benevole(item);

      if (_.isUndefined(_.find(ctrl.participants, ['_id', item._id]))) {

        $scope.intervention.addParticipant(benevole).catch(function () {
          _.pull(ctrl.participants, benevole);
          ctrl.interested.splice(_.sortedIndexBy(ctrl.interested, benevole, function (benevole) {
            return benevole.toString();
          }), 0, benevole);
        });
      }

      return benevole;
    };

    ctrl.droppedInGargabe = function (item) {
      $scope.intervention.removeBenevoleFromParticipants(item);
      return true;
    };

    ctrl.toogleGarbage = function (value) {
      $scope.showGarbage = value;
    };

    var addParticipantDialog = new Dialog({
      templateUrl: 'modules/interventions/views/add-participant.dialog.html',
      controller: 'AddParticipantController',
      controllerAs: 'addParticipantCtrl'
    });

    ctrl.addParticipant = function ($event) {
      addParticipantDialog.show($event).then(function (benevole) {
        ctrl.participants.splice(_.sortedIndexBy(ctrl.participants, benevole, function (benevole) {
          return benevole.toString();
        }), 0, benevole);
        $scope.intervention.addParticipant(benevole).catch(function () {
          _.pull(ctrl.participants, benevole);
        });
      });
    };

  });
