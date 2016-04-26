'use strict';

angular.module('etablissements').config(
  function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Etablissement',
      type: 'établissement',
      icon: 'social:school'
    });

  });
