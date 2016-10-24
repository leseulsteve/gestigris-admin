'use strict';

angular.module('search').provider('SearchService',
  function () {

    var providers = [];

    return {

      register: function (provider) {
        providers.push(provider);
      },

      $get: function ($q, $injector, $state) {

        var factories = {};

        _.forEach(providers, function (provider) {
          factories[provider.type] = $injector.get(provider.factory);
        });

        return {

          search: function (term) {
            return $q.all(_.map(providers, function (provider) {
              return factories[provider.type].search(term).then(function (results) {
                return _.map(results, function (result) {
                  return {
                    provider: provider,
                    item: result,
                    type: provider.type,
                    icon: provider.icon,
                    _description: result.toString()
                  };
                });
              });
            })).then(function (results) {
              return _.flatten(results);
            });
          },

          select: function ($event, selectedItem) {
            if (selectedItem) {
              var stateParams = {};
              stateParams[selectedItem.provider.resultState.param] = selectedItem.item._id;
              $state.go(selectedItem.provider.resultState.name, stateParams);
            }
          }

        };
      }
    };
  });
