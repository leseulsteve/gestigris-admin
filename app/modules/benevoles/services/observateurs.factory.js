'use strict';

angular.module('benevoles').factory('Observateur',
  function ($q, Benevole, BenevoleRole) {

    var Observateur = Object.create(Benevole);

    var init = BenevoleRole.findOne({
      code: 0
    }).then(function (observateurRole) {
      return {
        role: observateurRole._id
      };
    });

    Observateur.count = function () {
      return $q.when(init).then(function (observateurRoleFilter) {
        return Benevole.count(observateurRoleFilter);
      });
    };

    Observateur.find = function (query) {
      return $q.when(init).then(function (observateurRoleFilter) {
        return Benevole.find(_.assign({}, query, observateurRoleFilter));
      });
    };

    return Observateur;

  });
