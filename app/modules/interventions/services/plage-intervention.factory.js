'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Moment, Intervention) {

    var id = 0;
    var PlageIntervention = function (params) {
      _.assign(this, params);
      this._id = ++id;
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.getEtablissement = function () {
      return this.etablissement;
    };

    PlageIntervention.prototype.getDate = function () {
      return this.date;
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

    var plages = _.map([{
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },

    }, {
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      }
    }, {
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      }
    }, {
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      }
    }, {
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      }
    }], function (data) {
      return new PlageIntervention(data);
    });

    PlageIntervention.find = function () {
      var deffered = $q.defer();
      deffered.resolve(plages);
      return deffered.promise;
    };

    PlageIntervention.findByIntervention = function (intervention) {
      return PlageIntervention.find().then(function (plages) {
        var plage = _.find(plages, '_id', intervention.plage);
        return Intervention.findByPlageId(plage._id).then(function (interventions) {
          plage.interventions = interventions;
          return plage;
        });
      });
    };

    PlageIntervention.search = function (term) {
      var deffered = $q.defer();
      deffered.resolve(_.filter(plages, function (plage) {
        return _.includes(plage.toString().toLowerCase(), term.toLowerCase());
      }));
      return deffered.promise;
    };

    return PlageIntervention;

  });
