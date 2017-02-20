'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Schema, Moment, UserAuth, Conversation, Etablissement, Intervention) {

    var PlageIntervention = new Schema('plage-intervention');

    PlageIntervention.pre('create', function (next) {
      this.createdBy = UserAuth.getCurrentUser().getFullName();
      next();
    });

    PlageIntervention.post('find', function (next) {
      this.date = new Moment(this.date);
      this.etablissement = new Etablissement(this.etablissement);
      next();
    });

    PlageIntervention.formatFilters = function (filters) {
      var query = {};
      if (filters.date) {
        _.assign(query, {
          date: {
            $gte: filters.date.start,
            $lte: filters.date.end
          }
        });
      }
      if (filters.etablissementName) {
        return Etablissement.searchByName(filters.etablissementName).then(function (etablissements) {
          return _.assign(query, {
            etablissement: {
              $in: _.map(etablissements, '_id')
            }
          });
        });
      } else {
        return $q.when(query);
      }
    };

    PlageIntervention.prototype.getInterventions = function () {
      return Intervention.findByPlageId(this._id);
    };

    ////

    PlageIntervention.findByIntervention = function (intervention) {
      return PlageIntervention.find().then(function (plages) {
        return _.find(plages, '_id', intervention.plage);
      });
    };

    PlageIntervention.search = function () {
      return $q.when([]);
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.getDate = function () {
      return this.date;
    };

    PlageIntervention.prototype.isConfirmed = function (benevole) {
      benevole = benevole;
      return true;
    };

    PlageIntervention.prototype.getCalendarDay = function () {
      return this.getDate().calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd'
      });
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    return PlageIntervention;

  });
