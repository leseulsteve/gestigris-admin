'use strict';

angular.module('users').factory('NotificationConfig',
  function (Schema) {

    var NotificationConfig = new Schema('notification');

    NotificationConfig.get = function () {
      return NotificationConfig.find().then(function (configs) {
        return configs[0];
      });
    };

    return NotificationConfig;

  });
