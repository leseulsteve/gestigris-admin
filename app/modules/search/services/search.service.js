'use strict';

angular.module('search').provider('SearchService',
  function () {

    var providers = [];

    return {

      register: function (provider) {
        providers.push(provider);
      },

      $get: function ($q, $injector) {

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
                  type: provider.type,
                  icon: provider.icon,
                  _description: result.toString()
                };
              });
            }));
          });

          /*var deffered = $q.defer();

          deffered.resolve([{
            description: 'École secondaire Neufchâtel',
            type: 'École',
            icon: 'social:school'
          }, {
            description: 'Vincent Chouinard',
            type: 'Employé',
            icon: 'action:account_circle'
          }, {
            description: '3 Mai 2015 - École secondaire Neufchâtel',
            type: 'Plage d\'interventions',
            icon: 'action:event'
          }, {
            description: '4 Mai 2015 - École secondaire Neufchâtel',
            type: 'Plage d\'interventions',
            icon: 'action:event'
          }]);*/

          return $q.all(promises).then(function (results) {
            console.log(results);
            return _.flatten(results);
          });

        };

        return SearchService;
      }

    };
  });
