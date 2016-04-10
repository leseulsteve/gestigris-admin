'use strict';

angular.module('interventions').factory('Intervention',
  function ($q, Moment) {

    var Intervention = {};

    Intervention.findByPlageId = function () {
      var deffered = $q.defer();
      deffered.resolve([{
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
      }]);
      return deffered.promise;
    };

    return Intervention;

  });
