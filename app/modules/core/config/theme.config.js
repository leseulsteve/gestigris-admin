'use strict';

angular.module('core')
  .config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('redGris')
      .accentPalette('orangeGris')
      .warnPalette('vertGris');
  });
