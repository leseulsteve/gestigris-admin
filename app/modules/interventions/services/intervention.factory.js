'use strict';

angular.module('interventions').factory('Intervention',
  function ($q, Moment, Benevole) {

    var Intervention = function (params) {
      _.assign(this, params);
    };

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.getBenevoles = function (type) {
      return Benevole.find().then(function (benevoles) {
        switch (type) {
        case 'confirmed':
          return _.take(benevoles, 3);
        case 'interested':
          return _.takeRight(benevoles, 3);
        }
      });
    };

    var interventions = _.map([{
      plage: 1,
      date: {
        start: new Moment(),
        end: new Moment()
      },
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },
      tags: [{
        name: 'secondaire 3'
      }],
      participants: [{}, {}, {}],
      isBooked: function () {
        return true;
      }
    }, {
      plage: 1,
      date: {
        start: new Moment(),
        end: new Moment()
      },
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },
      tags: [{
        name: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }, {
      plage: 1,
      date: {
        start: new Moment(),
        end: new Moment()
      },
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },
      tags: [{
        name: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }, {
      plage: 2,
      date: {
        start: new Moment(),
        end: new Moment()
      },
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },
      tags: [{
        name: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }], function (params) {
      return new Intervention(params);
    });

    Intervention.prototype.toString = function () {
      return this.etablissement.toString();
    };

    Intervention.prototype.getDate = function () {
      return this.date;
    };

    Intervention.prototype.getStateIcon = function () {
      return 'navigation:check';
    };

    Intervention.findByPlageId = function () {
      var deffered = $q.defer();
      deffered.resolve(interventions);
      return deffered.promise;
    };

    Intervention.getByDate = function (date) {
      console.log(date);
      return Intervention.findByPlageId();
    };

    return Intervention;

  });
