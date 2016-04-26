'use strict';

angular.module('benevoles').config(
  function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'bénévole',
      icon: 'action:account_circle'
    });

  });
