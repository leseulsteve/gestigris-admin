'use strict';

angular.module('users')

.config(function (UserAuthProvider) {

  UserAuthProvider.config({
    userSchema: 'User',
    loginStateName: 'login'
  });
})

.run(function ($rootScope, $mdToast, $state, $log) {
  $rootScope.$on('UserAuth:signin:success', function ($event, user) {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Bonjour ' + user.toString() + '!')
    );
    $state.go('home');
  });

  $rootScope.$on('UserAuth:signin:fail', function ($event, response) {

    var toast;
    switch (response.code) {
    case 'BadCredentials':
      toast = $mdToast.simple()
        .textContent('Utilisateur inexistant ou mauvais mot de passe');
    }
    if (toast) {
      $mdToast.show(toast);
    } else {
      $log.error('UserAuth:signin:fail', response);
    }
  });
});
