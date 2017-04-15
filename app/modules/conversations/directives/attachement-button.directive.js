'use strict';

angular.module('conversations').directive('attachementButton',
  function (ConversationService, $injector) {
    return {
      restrict: 'E',
      scope: {
        message: '=',
      },
      templateUrl: 'modules/conversations/views/attachement.button.html',
      controllerAs: 'attachementButtonCtrl',
      controller: function ($scope) {

        $scope.attachements = _.sortBy(ConversationService.getAttachements(), 'title');

        this.handleAttachementSelection = function (attachement) {
          (attachement.serviceInstance || (attachement.serviceInstance = $injector.get(attachement.service)))
          .getItem().then(function (item) {
            $scope.message.attachements = $scope.message.attachements ||  [];
            $scope.message.attachements.push(item);
          });

        };

      }
    };
  });
