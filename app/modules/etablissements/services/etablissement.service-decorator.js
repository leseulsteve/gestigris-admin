'use strict';

angular.module('etablissements').config(
  function ($provide) {

    $provide.decorator('Etablissement', function ($delegate, $rootScope) {

      var Etablissement = $delegate;

      Etablissement.search = function (term) {
        return this.find().then(function (etablissements) {
          return _.filter(etablissements, function (etablissement) {
            return _.includes(etablissement.toString().toLowerCase(), term.toLowerCase());
          });
        });
      };

      Etablissement.post('create', function (next) {
        $rootScope.$broadcast('Etablissement:new', this);
        next();
      });

      Etablissement.post('remove', function (next) {
        $rootScope.$broadcast('Etablissement:remove', this);
        next();
      });

      return Etablissement;
    });

  });
