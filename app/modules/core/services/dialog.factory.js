'use strict';

angular.module('core').factory('Dialog',
  function ($mdDialog, $document, $animate) {

    var Dialog = function (params) {
      this.config = _.assign({
        parent: angular.element(document.body),
        bindToController: true,
        locals: _.assign({
          dialog: this
        }, params.locals)
      }, params);
    };

    Dialog.prototype.show = function ($event, params) {
      return $mdDialog.show(_.assign(this.config, {
        targetEvent: $event
      }, params));
    };

    Dialog.prototype.shake = function () {
      var dialog = $document.find('md-dialog');
      $animate.addClass(dialog, 'shake-it').then(function () {
        $animate.removeClass(dialog, 'shake-it');
      });
    };

    Dialog.prototype.hide = function (item) {
      return $mdDialog.hide(item);
    };

    Dialog.prototype.cancel = function () {
      $mdDialog.cancel();
    };

    return Dialog;
  });
