'use strict';

angular.module('interventions').config(
  function ($provide) {

    $provide.decorator('PlageIntervention', function ($delegate, Moment, UserAuth, Contact, SearchQueryBuilder) {

      var PlageIntervention = $delegate;

      PlageIntervention.pre('create', function (next) {
        this.createdBy = UserAuth.getCurrentUser().toString();
        next();
      });

      PlageIntervention.post('find', function (next) {
        this.contact = new Contact(this.contact);
        next();
      });

      PlageIntervention.search = function (params) {
        return PlageIntervention.find(SearchQueryBuilder.build(params));
      };

      PlageIntervention.prototype.toString = function () {
        return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
      };

      PlageIntervention.prototype.isBooked = function () {
        return this.status === 'CLOSE';
      };

      PlageIntervention.prototype.isUrgent = function () {
        return new Moment().endOf('day').add(2, 'weeks').isAfter(this.date) && this.status === 'OPEN';
      };

      ////

      /*  PlageIntervention.findByIntervention = function (intervention) {
          return PlageIntervention.find().then(function (plages) {
            return _.find(plages, '_id', intervention.plage);
          });
        };



        PlageIntervention.prototype.getDate = function () {
          return this.date;
        };

        PlageIntervention.prototype.isConfirmed = function (benevole) {
          benevole = benevole;
          return true;
        };

        };*/

      return PlageIntervention;

    });

  });
