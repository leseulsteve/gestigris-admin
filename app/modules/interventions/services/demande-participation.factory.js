'use strict';

angular.module('interventions').factory('DemandeParticipation',
  function (Schema) {

    var DemandeParticipation = new Schema('demande-participation');

    DemandeParticipation.getByInterventionId = function (interventionId) {
      return DemandeParticipation.find({
        intervention: interventionId
      });
    };

    DemandeParticipation.prototype.acceptAndConfirm = function () {
      return _.assign(this, {
        accepted: true,
        confirmed: true
      }).save();
    };

    DemandeParticipation.prototype.unAccept = function () {
      return _.assign(this, {
        accepted: false,
        confirmed: true
      }).save();
    };

    DemandeParticipation.prototype.isAccepted = function () {
      return this.accepted;
    };

    DemandeParticipation.prototype.isConfirmed = function () {
      return this.confirmed;
    };

    return DemandeParticipation;

  });
