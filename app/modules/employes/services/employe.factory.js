'use strict';

angular.module('employes').factory('Employe',
  function ($q, $timeout) {

    var Employe = function (params) {
      _.assign(this, params);
      this.fullname = this.toString();
      this.image = 'https://www.govloop.com/wp-content/uploads/avatars/2/3819dcd8c7718dd630a1aaefe12dc925-bpthumb.jpg';
    };

    Employe.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    var employes = _.map([{
      _id: 1,
      prenom: 'Vincent',
      nomFamille: 'Chouinard',
      role: 'Super employé'
    }], function (employe) {
      return new Employe(employe);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(employes);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(employes, '_id', id));
        }, 1000);
        return deffered.promise;
      },
      search: function (term) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.filter(employes, function (employe) {
            return _.includes(employe.toString().toLowerCase(), term.toLowerCase());
          }));
        }, 1000);
        return deffered.promise;
      }
    };

  });
