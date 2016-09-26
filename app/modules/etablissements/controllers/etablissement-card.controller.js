'use strict';

angular.module('etablissements').controller('EtablissementCardCtrl',
  function ($scope, Contact, MessageDialog) {

    var ctrl = this;

    Contact.findByEtablissement($scope.etablissement._id).then(function (contacts) {
      ctrl.contacts = contacts;
    });

    ctrl.addContact = function (etablissement) {
      Contact.create({
        firstname: 'Steve',
        lastname: 'Boisvert',
        courriel: 'leseulsteve@gmail.com',
        etablissement: [etablissement._id]
      }).then(function (contact) {
        console.log(contact);
        ctrl.contacts.push(contact);
      });
    };

    ctrl.detailsContact = function ($event, contact) {
      console.log('DETAILS', contact);
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
