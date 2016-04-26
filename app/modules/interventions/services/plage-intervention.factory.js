'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Moment) {

    var PlageIntervention = function (params) {
      _.assign(this, params);
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.toString() + ' - ' + this.etablissement.toString();
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

    PlageIntervention.search = function (term) {
      var deffered = $q.defer();
      deffered.resolve(_.filter(plages, function (plage) {
        return _.contains(plage.etablissement.toString().toLowerCase(), term.toLowerCase()) || _.contains(plage.date.toString().toLowerCase(), term.toLowerCase());
      }));
      return deffered.promise;
    };

    return PlageIntervention;

  });
