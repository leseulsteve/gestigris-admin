'use strict';

angular.module('contacts').factory('Contact',
  function (Schema) {

    var Contact = new Schema('contact');

    Contact.findByEtablissement = function (etablissementId) {
      return Contact.find({
        etablissements: etablissementId
      });
    };

    Contact.post('find', function (next) {
      this.fullname = this.toString();
      next();
    });

    Contact.prototype.toString = function () {
      return this.firstname + ' ' + this.lastname;
    };

    return Contact;

  });
