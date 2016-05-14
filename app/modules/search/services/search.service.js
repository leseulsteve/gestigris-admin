'use strict';

angular.module('search').provider('SearchService',
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

        var SearchService = {};

        SearchService.search = function (term) {

          var promises = [];

          _.forEach(providers, function (provider) {
            promises.push(factories[provider.type].search(term).then(function (results) {
              return _.map(results, function (result) {
                return {
                  provider: provider,
                  item: result,
                  type: provider.type,
                  icon: provider.icon,
                  _description: result.toString()
                };
              });
            }));
          });

          return $q.all(promises).then(function (results) {
            return _.flatten(results);
          });

        };

        SearchService.select = function ($event, selectedItem) {
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

        return SearchService;
      }
    };
  });
