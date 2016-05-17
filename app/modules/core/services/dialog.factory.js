'use strict';

angular.module('core').factory('Dialog',
  function ($mdDialog) {

    var lastDialogs = [];

    var Dialog = function (params) {
      this.config = _.assign({
        parent: angular.element(document.body),
        bindToController: true
      }, params);
      this.config.locals = _.assign({
        dialog: this
      }, this.config.locals);

      if (!params.keepLastDialog) {
        lastDialogs.pop();
      }
    };

    Dialog.prototype.show = function ($event) {
      var dialog = _.assign(this.config, {
        targetEvent: $event
      });
      lastDialogs.push(dialog);
      return $mdDialog.show(dialog);
    };

    Dialog.prototype.hide = function (item) {
      return $mdDialog.hide(item).then(function () {
        lastDialogs.pop();
        var lastDialog = _.last(lastDialogs);
        if (lastDialog) {
          $mdDialog.show(lastDialog);
        }
      });
    };

    return Dialog;
  });
