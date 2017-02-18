'use strict';

angular.module('interventions').factory('Intervention',
  function ($q, Schema, Moment, DemandeParticipation, Benevole, InterventionTag, $mdToast) {

    var Intervention = new Schema('intervention');

    Intervention.post('find', function (next) {
      this.date = {
        start: new Moment(this.date.start),
        end: new Moment(this.date.end)
      };

      DemandeParticipation.getByInterventionId(this._id).then(function (demandes) {
        this.demandesParticipations = demandes;
        next();
      }.bind(this));
    });

    Intervention.findByPlageId = function (plageId) {
      return Intervention.find({
        plage: plageId
      });
    };

    Intervention.prototype.getBenevoles = function (type) {
      return Benevole.find({
        _id: {
          $in: _.map(_.filter(this.demandesParticipations, function (demande) {
            return type === 'participants' ? demande.isAccepted() : !demande.isAccepted();
          }), 'benevole')
        }
      });
    };

    Intervention.prototype.addInterested = function (benevole) {
      var demandeParticipation = _.find(this.demandesParticipations, ['benevole', benevole._id]);

      if (demandeParticipation) {
        return _.assign(demandeParticipation, {
          accepted: false
        }).save().then(function () {
          return benevole;
        });
      }

      return DemandeParticipation.create({
        benevole: benevole._id,
        intervention: this._id,
      }).then(function () {
        return benevole;
      });
    };

    Intervention.prototype.addParticipant = function (benevole) {

      var that = this;

      var toast = $mdToast.simple()
        .textContent('Demande de confirmation envoyé à ' + benevole.toString() + '!')
        .action('annuler')
        .highlightAction(true);

      return $mdToast.show(toast).then(function (response) {

        if (_.isUndefined(response)) {
          var demandeParticipation = _.find(that.demandesParticipations, ['benevole', benevole._id]);

          // Était déjà intéressé.
          if (demandeParticipation) {
            return _.assign(demandeParticipation, {
              accepted: true
            }).save().then(function () {
              return benevole;
            });
          }

          // N'était pas intéressé.
          return DemandeParticipation.create({
            benevole: benevole._id,
            intervention: that._id,
            accepted: true
          }).then(function () {
            return benevole;
          });
        }

        // Changer d'idée.
        if (response === 'ok') {
          return $q.reject();
        }
      });
    };

    Intervention.prototype.removeBenevoleFromParticipants = function (benevole) {
      benevole = benevole;
      return $q.when();
      //return _.find(this.demandesParticipations, ['benevole', benevole._id]).remove();
    };

    ///

    Intervention.prototype.isBooked = function () {
      return true;
    };

    ////

    Intervention.getUrgents = function () {
      return Intervention.find({
        'date.start': {
          $gte: new Moment().subtract(1, 'week')
        }
      });
    };

    Intervention.getByDate = function (date) {
      return Intervention.find({
        date: {
          start: date.startOf('day'),
          end: date.endOf('day')
        }
      });
    };

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.isConfirmed = function (benevole) {

      return !_.isUndefined(_.find(this.participants, function (participant) {
        return benevole._id === participant._id;
      }));
    };

    Intervention.prototype.toString = function () {
      return this.etablissement ? this.etablissement.toString() : undefined;
    };

    Intervention.prototype.getEtablissement = function () {
      return this.etablissement;
    };

    Intervention.prototype.getDate = function () {
      return this.date;
    };

    Intervention.prototype.getStateIcon = function () {
      return 'navigation:check';
    };

    return Intervention;

  });
