'use strict';

angular.module('interventions').controller('InterventionCardController',
  function ($scope, $element, $mdConstant, InterventionTag, Benevole, Moment, Dialog, RemoveInterventionDialog) {

    var ctrl = this,
      plageInterventionFicheCtrl = $element.controller('plageInterventionFiche');

    // Heures début et fin..

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

    // Set participants et intéressés

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

    InterventionTag.find({
      _id: {
        $in: $scope.intervention.tags
      }
    }).then(function (tags) {
      ctrl.tags = tags;
    });

    ctrl.removeChip = function (chip) {
      _.pull($scope.intervention.tags, chip._id);
    };

    ctrl.transformChip = function (chip) {

      function assignTag(tag) {
        $scope.intervention.tags.push(tag._id);
      }

      if (_.isString(chip)) {
        var tag = new InterventionTag({
          name: chip
        });
        tag.save().then(assignTag);
        return tag;
      }

      assignTag(chip);
      return chip;
    };

    ctrl.searchTags = function (params) {
      return InterventionTag.searchByName(params).then(function (results) {
        return _.differenceBy(results, ctrl.tags, '_id');
      });
    };

    // Dragon drop

    ctrl.droppedInInterested = function (item) {
      var benevole = new Benevole(item);
      $scope.intervention.addInterested(benevole);
      return benevole;
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

    ctrl.droppedInGarbage = function (item) {
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

    ctrl.removeIntervention = function ($event, $index, intervention) {
      RemoveInterventionDialog.show($event, {
        intervention: intervention
      }).then(function () {
        plageInterventionFicheCtrl.removeIntervention($index);
      });
    };

  });
