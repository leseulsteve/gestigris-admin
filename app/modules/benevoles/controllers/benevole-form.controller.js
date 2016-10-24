'use strict';

angular.module('benevoles').controller('BenevoleFromCtrl',
  function ($scope, BenevoleRole) {

    var ctrl = this;

    ctrl.isNew = _.isUndefined($scope.benevole._id);

    BenevoleRole.find().then(function (benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles;
    });

    ctrl.saveBenevole = function (form) {
      if ($scope.autoSave && form.$valid) {
        return $scope.benevole.save();
      }
    };

  });
