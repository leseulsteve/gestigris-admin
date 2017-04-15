'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Schema, Moment, UserAuth, Conversation, Etablissement, Intervention, Contact, SearchQueryBuilder) {

    var PlageIntervention = new Schema('plage-intervention');

    PlageIntervention.pre('create', function (next) {
      this.createdBy = UserAuth.getCurrentUser().toString();
      next();
    });

    PlageIntervention.post('find', function (next) {
      this.date = new Moment(this.date);
      this.etablissement = new Etablissement(this.etablissement);
      this.contact = new Contact(this.contact);
      next();
    });

    PlageIntervention.search = function (params) {
      return PlageIntervention.find(SearchQueryBuilder.build(params));
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.isBooked = function () {
      return this.status === 'CLOSE';
    };

    PlageIntervention.prototype.isUrgent = function () {
      return new Moment().endOf('day').add(2, 'weeks').isAfter(this.date) && this.status === 'OPEN';
    };

    PlageIntervention.prototype.getInterventions = function () {
      return Intervention.findByPlageId(this._id);
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    ////

    /*  PlageIntervention.findByIntervention = function (intervention) {
        return PlageIntervention.find().then(function (plages) {
          return _.find(plages, '_id', intervention.plage);
        });
      };



      PlageIntervention.prototype.getDate = function () {
        return this.date;
      };

      PlageIntervention.prototype.isConfirmed = function (benevole) {
        benevole = benevole;
        return true;
      };

      };*/

    return PlageIntervention;

  });
