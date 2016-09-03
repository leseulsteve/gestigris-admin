'use strict';

angular.module('users')
  .config(function (UserAuthProvider) {

    UserAuthProvider.config({
      userSchema: 'User',
      loginStateName: 'login'
    });
  })
  .run(function ($rootScope, $mdToast, $state) {
    $rootScope.$on('UserAuth:signin:success', function ($event, user) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Bonjour ' + user.toString())
      );
      $state.go('home');
    });
  });
