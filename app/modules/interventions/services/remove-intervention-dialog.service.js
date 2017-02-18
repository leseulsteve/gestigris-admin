'use strict';

angular.module('interventions').service('RemoveInterventionDialog',
  function (Dialog) {

    this.show = function ($event, params) {

      var removeInterventionDialog = new Dialog({
        templateUrl: 'modules/interventions/views/remove-intervention.dialog.html',
        controller: 'RemoveInterventionDialogCtrl',
        controllerAs: 'removeInterventionDialogCtrl',
        locals: {
          intervention: params.intervention
        }
      });

      console.log(params);
      return removeInterventionDialog.show($event).then(function (reason) {
        console.log(reason);
      });
    };

  });

angular.module('interventions').controller('RemoveInterventionDialogCtrl',
  function () {

    console.log(this);

    this.remove = function (form, reason) {

      if (form.$valid) {
        console.log(reason);

      }

      this.shake();

    };

  });
