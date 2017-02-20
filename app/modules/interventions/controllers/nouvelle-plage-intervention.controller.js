'use strict';

angular.module('interventions').controller('NouvellePlageInterventionController',
  function ($state, Etablissement, Contact, PlageIntervention) {

    var ctrl = this;

    Etablissement.find().then(function (etablissements) {
      ctrl.etablissements = etablissements;
    });

    ctrl.setContacts = function (etablissement) {
      Contact.findByEtablissement(etablissement._id).then(function (contacts) {
        ctrl.contacts = contacts;
      });
    };

    ctrl.cancel = ctrl.dialog.cancel;

    ctrl.create = function (plageForm, plage) {

      if (plageForm.$invalid) {
        return ctrl.dialog.shake();
      }

      ctrl.dialog.hide().then(function () {
        PlageIntervention.create(plage).then(function (newPlage) {
          $state.go('interventions.fiche', {
            plageId: newPlage._id
          });
        });
      });
    };
  });
