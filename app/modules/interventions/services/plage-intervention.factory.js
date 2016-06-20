'use strict';

angular.module('interventions').factory('PlageIntervention',
  function ($q, Moment, Intervention, Conversation, Etablissement) {

    var id = 0;
    var PlageIntervention = function (params) {
      _.assign(this, params);
      this._id = ++id;
      this.createdAt = new Moment();
      this.createdBy = 'Vincent Chouinard';
      this.contact = 'Stéphanie Paradis';
      var that = this;
      Etablissement.findById('55f2151edb35ddb304bcba84').then(function (etablissement) {
        that.etablissement = etablissement;
      });
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.getEtablissement = function () {
      var deffered = $q.defer();
      deffered.resolve(this.etablissement);
      return deffered.promise;
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

    var plages = _.map([{
      date: new Moment()
    }, {
      date: new Moment()
    }, {
      date: new Moment()
    }, {
      date: new Moment()
    }, {
      date: new Moment()
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
        return _.find(plages, '_id', intervention.plage);
      });
    };

    PlageIntervention.search = function (term) {
      var deffered = $q.defer();
      deffered.resolve(_.filter(plages, function (plage) {
        return _.includes(plage.toString().toLowerCase(), term.toLowerCase());
      }));
      return deffered.promise;
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    return PlageIntervention;

  });
