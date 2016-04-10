'use strict';

angular.module('benevoles').config(
  function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      title: 'Bénévoles',
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl',
      resolve: {
        benevoles: function (Benevole) {
          return Benevole.find();
        }
      },
      toolbar: {
        tools: [{
          icon: 'content:add',
          action: 'addBenevole'
        }]
      }
    });
  });
