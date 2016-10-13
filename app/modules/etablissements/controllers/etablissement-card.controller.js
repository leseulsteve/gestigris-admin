'use strict';

angular.module('etablissements').controller('EtablissementCardCtrl',
  function ($scope, Contact, MessageDialog, ContactDialog) {

    var ctrl = this;

    Contact.findByEtablissement($scope.etablissement._id).then(function (contacts) {
      ctrl.contacts = contacts;
    });

    ctrl.addContact = function ($event, etablissement) {
      ContactDialog.new($event, {
        etablissement: etablissement,
        contacts: ctrl.contacts
      });
    };

    ctrl.detailsContact = function ($event, contact) {
      ContactDialog.edit($event, {
        contact: contact,
        contacts: ctrl.contacts
      });
    };

    ctrl.sendMessageToContact = function ($event, contact) {
      MessageDialog.show($event, {
        receivers: [contact]
      });
    };

    ctrl.saveEtablissement = function (form) {
      if (form.$valid) {
        $scope.etablissement.save().then(function () {
          console.log('etablissement sauvegardé!');
        });
      }
    };
  });
