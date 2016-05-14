'use strict';

angular.module('events').provider('EventService',
  function () {

    var providers = [];

    return {

      register: function (provider) {
        providers.push(provider);
      },

      $get: function ($q, $injector, Dialog) {

        var factories = {};

        _.forEach(providers, function (provider) {
          factories[provider.type] = $injector.get(provider.factory);
        });

        var EventService = {};

        EventService.getByDate = function (date) {

          var promises = [];

          _.forEach(providers, function (provider) {
            promises.push(factories[provider.type].getByDate(date).then(function (results) {
              return _.map(results, function (result) {
                return {
                  provider: provider,
                  item: result,
                  date: result.getDate(),
                  type: provider.type,
                  description: result.toString(),
                  stateIcon: provider.stateIcon ? result.getStateIcon() : undefined
                };
              });
            }));
          });

          return $q.all(promises).then(function (results) {
            return _.flatten(results);
          });

        };

        EventService.select = function ($event, selectedItem) {
          if (selectedItem) {

            var dialogConfig = selectedItem.provider.dialog,
              locals = {};

            locals[dialogConfig.itemName] = selectedItem.item;

            var dialog = new Dialog(_.assign(dialogConfig, {
              locals: locals,
              bindToController: true
            }));

            dialog.show($event);
          }
        };

        return EventService;
      }
    };
  });
