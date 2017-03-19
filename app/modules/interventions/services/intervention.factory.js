'use strict';

angular.module('interventions').factory('Intervention',
  function ($rootScope, $q, Schema, Moment, DemandeParticipation, Benevole, InterventionTag, $mdToast) {

    var Intervention = new Schema('intervention');

    Intervention.post('find', function (next) {

      this.date = {
        start: new Moment(this.date.start),
        end: new Moment(this.date.end)
      };

      DemandeParticipation.getByInterventionId(this._id).then(function (demandes) {

        this.demandesParticipations = demandes;

        $q.all([

          Benevole.find({
            _id: {
              $in: _.map(_.filter(this.demandesParticipations, function (demande) {
                return !demande.isAccepted();
              }), 'benevole')
            }
          }).then(function (benevoles) {
            this.interested = benevoles;
          }.bind(this)),

          Benevole.find({
            _id: {
              $in: _.map(_.filter(this.demandesParticipations, function (demande) {
                return demande.isAccepted();
              }), 'benevole')
            }
          }).then(function (benevoles) {
            this.participants = benevoles;
          }.bind(this))

        ]).then(next);
      }.bind(this));
    });

    Intervention.findByPlageId = function (plageId) {
      return Intervention.find({
        plage: plageId
      });
    };

    Intervention.prototype.getBenevoles = function (type) {
      return $q.when(type === 'interested' ? this.interested : this.participants);
    };

    Intervention.prototype.addParticipant = function (benevole, message) {

      var intervention = this,
        demandeParticipation = intervention.getDemandeParticipation(benevole);

      function add() {

        // Était déjà intéressé.
        if (demandeParticipation) {
          return demandeParticipation.acceptAndConfirm().then(function () {
            return benevole;
          });
        }

        // N'était pas intéressé.
        return DemandeParticipation.create({
          benevole: benevole._id,
          intervention: intervention._id,
          accepted: true,
          message: message
        }).then(function (demandeParticipation) {
          intervention.demandesParticipations.push(demandeParticipation);
          return benevole;
        });
      }

      if (!intervention.isBooked() && demandeParticipation) {
        return add();
      }

      var toast = $mdToast.simple()
        .textContent('Envois de la confirmation à ' + benevole.toString() + '...')
        .action('annuler')
        .highlightAction(true);

      return $mdToast.show(toast).then(function (response) {

        if (response === 'ok') {
          return $q.reject();
        }

        return add();

      });

    };

    Intervention.prototype.removeBenevoleFromParticipants = function (benevole, forGood) {

      var intervention = this;

      function remove() {
        var demandeParticipation = intervention.getDemandeParticipation(benevole);
        return forGood ? demandeParticipation.remove().then(function () {
          _.pull(intervention.demandesParticipations, demandeParticipation);
        }) : demandeParticipation.unAccept();
      }

      if (!intervention.isBooked()) {
        return remove();
      }

      var toast = $mdToast.simple()
        .textContent('Envois de l\'annulation de la partipation à ' + benevole.toString() + '...')
        .action('annuler')
        .highlightAction(true);

      return $mdToast.show(toast).then(function (response) {

        if (response === 'ok') {
          return $q.reject();
        }

        return remove();

      });
    };

    Intervention.prototype.getDemandeParticipation = function (benevole) {
      return _.find(this.demandesParticipations, ['benevole', benevole._id]);
    };

    Intervention.prototype.isConfirmed = function (benevole) {
      var demande = this.getDemandeParticipation(benevole);
      return demande ? demande.isConfirmed() : false;
    };

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.isBooked = function () {
      return this.status === 'CLOSE';
    };

    Intervention.prototype.book = function () {

      if (!this.isBooked()) {

        var intervention = this,
          toast = $mdToast.simple()
          .textContent('Envois des notifications aux bénévoles...')
          .action('annuler')
          .highlightAction(true);

        return $mdToast.show(toast).then(function (response) {
          if (response) {
            return $q.reject();
          }
          return _.assign(intervention, {
              status: 'CLOSE'
            })
            .save()
            .catch(function (error) {
              console.error(error);
              intervention.status = 'OPEN';
              $mdToast.show($mdToast.simple().textContent('Impossible de fermer la démystification'));
              return $q.reject('Impossible de fermer la démystification');
            });
        });
      }

      return $q.reject('L\'intervention était déjà fermée');

    };

    ////

    /*  Intervention.getUrgents = function () {
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

      Intervention.prototype.toString = function () {
        return this.etablissement ? this.etablissement.toString() : undefined;
      };

      Intervention.prototype.getEtablissement = function () {
        return this.etablissement;
      };


      Intervention.prototype.getStateIcon = function () {
        return 'navigation:check';
      };*/

    return Intervention;

  });
