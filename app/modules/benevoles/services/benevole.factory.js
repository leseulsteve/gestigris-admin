'use strict';

angular.module('benevoles').factory('Benevole',
  function ($rootScope, Schema, Avatar, SearchFieldQueryBuilder) {

    var Benevole = new Schema('benevole');

    Benevole.post('find', function (next) {
      this.dateNaissance = new Date(this.dateNaissance);
      if (_.isUndefined(this.avatar)) {
        return Avatar.getDefaultAvatar(this).then(function (avatar) {
          this.avatar = avatar;
          next();
        }.bind(this));
      }
      next();
    });

    Benevole.post('create', function (next) {
      $rootScope.$broadcast('Benevole:new', this);
      next();
    });

    Benevole.post('remove', function (next) {
      $rootScope.$broadcast('Benevole:remove', this);
      next();
    });

    Benevole.search = function (params) {
      var query = {};
      if (_.isString(params)) {
        query = SearchFieldQueryBuilder.build(params);
      } else  {
        _.assign(query, params.benevoleName ? SearchFieldQueryBuilder.build(params.benevoleName) : undefined, _.omit(params, 'benevoleName'));
      }
      return Benevole.find(query);
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    return Benevole;

  });
