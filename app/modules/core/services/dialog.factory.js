'use strict';

angular.module('core').factory('Dialog',
  function ($mdDialog, $document, $animate) {

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

    Dialog.prototype.show = function ($event, params) {
      var dialog = _.assign(this.config, {
        targetEvent: $event
      }, params);
      lastDialogs.push(dialog);
      return $mdDialog.show(dialog);
    };

    Dialog.prototype.shake = function () {
      var dialog = $document.find('md-dialog');
      $animate.addClass(dialog, 'shake-it').then(function () {
        $animate.removeClass(dialog, 'shake-it');
      });
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

    Dialog.prototype.cancel = function () {
      $mdDialog.cancel();
    };

    return Dialog;
  });
