'use strict';

angular.module('interventions').factory('Benevole',
  function ($q, $timeout) {

    var Benevole = function (params) {
      _.assign(this, params);
    };

    Benevole.prototype.remove = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve();
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.sendMessage = function (message) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(message);
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    var benevoles = _.map([{
      _id: 1,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 2,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 3,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 4,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 5,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 6,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 7,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 8,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 9,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 10,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 11,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 12,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 13,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }], function (benevole) {
      return new Benevole(benevole);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(benevoles);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(benevoles, '_id', id));
        }, 1000);
        return deffered.promise;
      }
    };

  });
