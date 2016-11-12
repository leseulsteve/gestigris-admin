'use strict';

angular.module('benevoles').controller('BenevoleFromCtrl',
  function(BenevoleRole) {

    var ctrl = this;

    BenevoleRole.find().then(function(benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles;
    });

    ctrl.isNew = function() {
      return !_.isUndefined(ctrl.benevole._id);
    };

    BenevoleRole.find().then(function(benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles;
    });

    ctrl.saveBenevole = function(form) {
      if ($scope.autoSave && form.$valid) {
        return $scope.benevole.save();
      }
    };
  });