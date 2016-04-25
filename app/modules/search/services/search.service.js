'use strict';

angular.module('search').service('SearchService',
  function ($q) {

    var SearchService = {};

    SearchService.search = function (term) {
      console.log(term);

      var deffered = $q.defer();

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
      }]);

      return deffered.promise;

    };

    return SearchService;
  });
