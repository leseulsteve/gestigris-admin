'use strict';

angular.module('etablissements').factory('Etablissement',
  function ($q, $timeout) {

    var Etablissement = function (params) {
      _.assign(this, params);
      this.fullname = this.toString();
      this.image = 'https://www.govloop.com/wp-content/uploads/avatars/2/3819dcd8c7718dd630a1aaefe12dc925-bpthumb.jpg';
    };

    Etablissement.prototype.toString = function () {
      return this.description;
    };

    var etablissements = _.map([{
      _id: 1,
      description: 'École secondaire de Neufchâtel'
    }], function (etablissement) {
      return new Etablissement(etablissement);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(etablissements);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(etablissements, '_id', id));
        }, 1000);
        return deffered.promise;
      },
      search: function (term) {
        console.log(term);
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.filter(etablissements, function (etablissement) {
            return _.includes(etablissement.toString().toLowerCase(), term.toLowerCase());
          }));
        }, 1000);
        return deffered.promise;
      }
    };

  });
