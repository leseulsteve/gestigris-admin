'use strict';

angular.module('employes').config(
  function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Employe',
      type: 'employé',
      icon: 'action:account_circle'
    });

  });
