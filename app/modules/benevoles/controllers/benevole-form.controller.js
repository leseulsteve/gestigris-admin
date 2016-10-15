'use strict';

angular.module('benevoles').controller('BenevoleFromCtrl',
  function(BenevoleRole) {

    var ctrl = this;

    BenevoleRole.find().then(function(benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles
    });

    ctrl.isNew = function() {
      return !_.isUndefined(ctrl.benevole._id);
    }

    ctrl.saveProfile = function(userProfileForm) {

      if (userProfileForm.$valid) {

      }
    };
  });