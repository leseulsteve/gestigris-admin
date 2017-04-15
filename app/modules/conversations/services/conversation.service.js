'use strict';

angular.module('conversations').provider('ConversationService',
  function () {

    var attachements = [],
      allGroups = [],
      fetchersFactories = [],
      groupProviders = [];

    return {

      registerAttachement: function (attachement) {
        attachements.push(attachement);
      },

      register: function (serviceName) {
        groupProviders.push(serviceName);
      },

      $get: function ($rootScope, $q, $injector, Conversation) {

        _.forEach(groupProviders, function (groupProviderName) {
          var groupProvider = $injector.get(groupProviderName);

          fetchersFactories.push(groupProvider);

          if (_.isFunction(groupProvider.getGroups)) {
            groupProvider.getGroups().then(function (groups) {
              allGroups = _.sortBy(allGroups.concat(_.map(groups, function (group) {
                return _.assign(group, {
                  fullname: '@' + group.title.toLowerCase(),
                  factory: groupProvider
                });
              })), 'fullname');
            });
          }
        });

        return {

          init: function () {
            return Conversation.getFromTeam().then(function (conversations) {
              $rootScope.conversations = {
                equipe: conversations
              };

              $rootScope.$on('UserAuth:signout:success', function () {
                $rootScope.conversations = undefined;
              });
            });
          },

          searchReceivers: function (search) {
            if (_.startsWith(search.searchTerm, '@')) {
              return $q.when(_.filter(allGroups, function (group) {
                return _.startsWith(group.fullname, search.searchTerm);
              }));
            }

            return $q.all(_.invokeMap(fetchersFactories, 'search', search))
              .then(function (results) {
                return _.map(_.uniqBy(_.flatten(results), '_id'), function (destinataire) {
                  return _.assign(destinataire, {
                    fullname: destinataire.toString()
                  });
                });
              });
          },

          getGroupMembers: function (group) {
            return group.factory.search(group.query);
          },

          getAttachements: function () {
            return attachements;
          }
        };
      }
    };
  });
