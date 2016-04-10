'use strict';

angular.module('users').directive('login',
  function ($rootScope, $animate, Toast, $timeout, UserAuth, APP) {
    return {
      restrict: 'A',
      link: function (scope, element) {

        scope.APP = APP;

        $timeout(function () {
          scope.showLogin = true;
        }, 500);

        scope.resetPassword = function (loginForm, userName) {
          scope.isResetingPassword = true;
          $timeout(function () {
            loginForm.$setSubmitted();
            if (loginForm.$valid) {
              scope.passwordResetMessage = 'Réinitialisation du mot de passe en cours...';
              UserAuth.sendPasswordToken(userName);
            }
          }, 1000);
        };

        $rootScope.$on('UserAuth:sendPasswordToken:success', function () {
          $timeout(function () {
            scope.passwordResetMessage = 'Un courriel de réinitialisation a été envoyé';
            $timeout(function () {
              scope.loginForm.$setPristine();
              $timeout(function () {
                scope.credentials = {};
                scope.isResetingPassword = false;
              }, 1000);
            }, 1000);
          }, 1000);
        });

        $rootScope.$on('UserAuth:sendPasswordToken:fail', function () {
          $timeout(function () {
            scope.passwordResetMessage = 'Une erreure s\'est produite lors de la réinitialisation';
          }, 1000);
        });

        $rootScope.$on('UserAuth:signin:success', function () {
          $animate.addClass(element, 'ng-hide').then(function () {
            scope.loginCtrl.handleLogedIn();
          });
        });

        $rootScope.$on('UserAuth:signin:fail', function ($event, reason) {
          var message = 'Impossible de se connecter, communiquez avec le GRIS';
          switch (reason.code) {
          case 'BadCredentials':
            message = 'Mauvais mot de passe ou nom d\'utilisateur';
          }
          var errorToast = new Toast(message);
          errorToast.show();
        });
      }
    };
  });
