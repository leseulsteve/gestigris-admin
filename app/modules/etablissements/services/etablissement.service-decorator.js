'use strict';

angular.module('etablissements').config(
  function ($provide) {

    $provide.decorator('Etablissement', function ($delegate) {
      $delegate.search = function (term) {
        return this.find().then(function (etablissements) {
          return _.filter(etablissements, function (etablissement) {
            return _.includes(etablissement.toString().toLowerCase(), term.toLowerCase());
          });
        });
      };
      return $delegate;
    });

  });
