'use strict';

angular.module('contacts').service('ContactDialog',
  function ($q, Dialog, Contact, Poste, Toast) {

    var dialog = new Dialog({
      templateUrl: 'modules/contacts/views/contact.dialog.html',
      controllerAs: 'contactDialogCtrl',
      controller: function () {

        var ctrl = this;

        Poste.find().then(function (postes) {
          ctrl.postes = postes;
        });

        ctrl.cancel = dialog.cancel;

        ctrl.remove = dialog.hide;

        ctrl.addingPoste = false;
        ctrl.switchPosteSelection = function (contact) {
          ctrl.addingPoste = !ctrl.addingPoste;
          if (ctrl.addingPoste) {
            contact.poste = undefined;
          } else {
            contact.posteDescription = undefined;
          }
        };

        ctrl.submit = function (contactDialogForm, contact) {
          if (contactDialogForm.$invalid) {
            return dialog.shake();
          }
          dialog.hide(contact);
        };
      }
    });

    function checkForNewPoste(contact) {

      if (contact.posteDescription) {
        return Poste.create({
          description: contact.posteDescription
        }).then(function (poste) {
          contact.poste = poste;
        });
      }

      return $q.when();
    }

    this.new = function ($event, params) {
      return dialog.show($event, {
        locals: {
          contact: {}
        }
      }).then(function (contact) {

        return checkForNewPoste(contact).then(function () {
          return Contact.create(_.assign(contact, {
            etablissements: [params.etablissement._id]
          })).then(function (contact) {
            Toast.show(contact.toString() + ' a été créé.');
            params.contacts.push(contact);
            return contact;
          });
        });
      });
    };

    this.edit = function ($event, params) {
      var clonedContact = _.clone(params.contact);
      return dialog.show($event, {
        locals: {
          contact: clonedContact
        }
      }).then(function (contact) {

        if (_.isUndefined(contact)) {
          return params.contact.remove().then(function () {
            Toast.show(params.contact.toString() + ' a été supprimé.');
            _.pull(params.contacts, params.contact);
          });
        }

        return checkForNewPoste(contact).then(function () {
          return _.assign(params.contact, contact).save().then(function (contact) {
            Toast.show(contact.toString() + ' a été sauvegardé.');
            return contact;
          });
        });

      });
    };
  });
