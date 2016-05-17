'use strict';

angular.module('interventions').factory('Intervention',
  function ($q, Moment, Benevole, InterventionTag, $mdToast) {

    var id = 1;
    var Intervention = function (params) {
      _.assign(this, params);
      this._id = id++;
      this.tags = _.map(this.tags, function (tag) {
        return new InterventionTag(tag);
      });
      this.date.start = this.date.start.seconds(0).millisecond(0);
      this.date.end = this.date.end.add(45, 'minute').seconds(0).millisecond(0);
      this.local = '12121';
      this.responsable = 'Ginette Larue';
      this.meetingPlace = 'Secrétaria principal';
    };

    /*  Intervention.post('find', function(next) {
        this.tags = _.maps(this.tags, function(tag) {
          return new InterventionTag(tag);
        });
        next();
      });*/

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.getBenevoles = function (type) {
      var that = this;
      return Benevole.find().then(function (benevoles) {
        switch (type) {
        case 'participants':
          that.participants = _.take(benevoles, Math.floor(Math.random() * 3) + 0);
          return angular.copy(that.participants);
        case 'interested':
          return _.take(benevoles, Math.floor(Math.random() * 10) + 2);
        }
      });
    };

    Intervention.prototype.addParticipant = function (benevole) {
      var deffered = $q.defer();

      var toast = $mdToast.simple()
        .textContent('Demande de confirmation envoyé à ' + benevole.toString() + '!')
        .action('annuler')
        .highlightAction(true);

      $mdToast.show(toast).then(function (response) {
        return response === 'ok' ? deffered.reject() : deffered.resolve(benevole);
      });

      return deffered.promise;
    };

    Intervention.prototype.isConfirmed = function (benevole) {

      return !_.isUndefined(_.find(this.participants, function (participant) {
        return benevole._id === participant._id;
      }));
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
        _id: 1,
        description: 'secondaire 3'
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
        _id: 1,
        description: 'secondaire 3'
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
        _id: 1,
        description: 'secondaire 3'
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
        _id: 1,
        description: 'secondaire 3'
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
      date = date;
      return Intervention.findByPlageId();
    };

    return Intervention;

  });
