'use strict';

angular.module('users').directive('avatar',
  function ($mdDialog) {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'modules/users/views/avatar.html',
      compile: function (iElement, iAttrs) {
        if (!_.isUndefined(iAttrs.clickToUpdate)) {
          iElement.append('<input style="display:none;" type="file"/>');
          iElement.append('<div class="md-caption text-center">Cliquez pour changer</div>');
          iElement.css('cursor', 'pointer');
        }

        return function link(scope, element) {

          scope.$watch('user', function (user) {
            if (user) {
              scope.hasImage = !_.isUndefined(user.avatar);
            }
          }, true);

          var fileInput = element.find('input');

          element.bind('click', function () {
            fileInput[0].click();
          });

          fileInput.bind('change', function ($event) {

            var reader = new FileReader();

            scope.myImage = '';
            scope.myCroppedImage = '';

            reader.onload = function ($event) {
              scope.$apply(function () {
                scope.myImage = $event.target.result;
              });

              $mdDialog.show({
                templateUrl: 'modules/users/views/avatar.dialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                scope: scope,
                preserveScope: true
              });

              scope.change = function () {
                scope.user.avatar = scope.myCroppedImage;
                scope.user.save().then(function (savedUser) {
                  $mdDialog.hide();
                  _.assign(scope.user, savedUser);
                });
              };

              scope.cancel = function () {
                $mdDialog.hide();
              };
            };

            reader.readAsDataURL($event.currentTarget.files[0]);

          });
        };
      }
    };
  });
