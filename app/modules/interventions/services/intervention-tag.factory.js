'use strict';

angular.module('interventions').factory('InterventionTag',
  function ($q) {

    var id = 1;
    var InterventionTag = function (params)  {
      _.assign(this, params);
      this._id = params._id || id++;
    };

    var tags = _.map([{
      description: 'secondaire 3'
    }, {
      description: 'anglophones'
    }], function (params) {
      return new InterventionTag(params);
    });

    InterventionTag.prototype.save = function () {
      var deffered = $q.defer();
      tags.push(this);
      this.isNew = false;
      deffered.resolve(this);
      return deffered.promise;
    };

    InterventionTag.find = function () {
      var deffered = $q.defer();
      deffered.resolve(tags);
      return deffered.promise;
    };

    return InterventionTag;

  });
