'use strict';

angular.module('benevoles').config(
  function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        benevoles: function ($q, $timeout, Benevole, PARAMS) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Benevole.find()
          ]).then(function (results) {
            return _.last(results);
          });
        }
      },
      controller: function ($state, $location, Dialog, BENEVOLES, benevoles) {
        if ($location.path().split('/').length === 2) {
          if (benevoles.length === 0) {
            var dialog = new Dialog(BENEVOLES.DIALOGS.ADD_BENEVOLE);
            dialog.show()
              .then(function (benevole) {
                benevoles.unshift(benevole);
                $state.go('benevoles.fiche', {
                  benevoleId: benevole._id
                });
              })
              .catch(function () {
                $state.go('home');
              });
          } else {
            $state.go('benevoles.fiche', {
              benevoleId: _.first(benevoles)._id
            });
          }
        }
      }
    }).

    state('benevoles.fiche', {
      url: '/:benevoleId',
      title: 'Bénévoles',
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl'
    });
  });
