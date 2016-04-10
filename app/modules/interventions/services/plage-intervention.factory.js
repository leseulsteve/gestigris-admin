'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Moment) {

    var PlageIntervention = {};

    PlageIntervention.find = function () {
      var deffered = $q.defer();
      deffered.resolve([{
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
      }, {
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }]);
      return deffered.promise;
    };

    return PlageIntervention;

  });
