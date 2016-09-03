'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function ($scope, $mdToast, $document, $animate, Etablissement) {

    var ctrl = this;

    ctrl.create = function (form, params) {

      form.etablissementType.$setTouched();
      form.arrondissement.$setTouched();
      form.ville.$setTouched();
      form.province.$setTouched();

      if (form.$valid) {
        ctrl.dialog.hide();
        $mdToast.show(
          $mdToast.simple()
          .textContent('L\'établissement ' + params.name + ' a été créé!')
        );
      } else {
        var dialog = $document.find('md-dialog');
        $animate.addClass(dialog, 'shake-it').then(function () {
          $animate.removeClass(dialog, 'shake-it');
        });
      }

      params = params;

      Etablissement = Etablissement;
      /*Etablissement.create(params).then(function() {
        $scope.close();
      });*/
    };

    /* ctrl.changePhoto = function (event) {
      var fileInput = angular.element($element.find('input')),
        reader = new FileReader();

      fileInput[0].click();

      fileInput.bind('change', function (event) {
        reader.readAsDataURL(event.currentTarget.files[0]);
      });

      if ($attrs.mode === 'dashboard') {
        // reset la sélection, si jamais on choisi un fichier avec le même nom
        fileInput[0].onclick = function () {
          this.value = null;
        };

        var isShowing = false; // Correction bug: la fenêtre apparait deux fois

        var photoModal = new AppModal({
          templateUrl: 'modules/core/views/photo.dialog.html'
        });

        $scope.change = function () {
          photoModal.close();
          $scope.recette.setImage($scope.myCroppedImage);
        };

        $scope.myImage = '';
        $scope.myCroppedImage = '';

        reader.onload = function ($event) {
          $scope.$apply(function () {
            $scope.myImage = $event.target.result;
          });
          if (!isShowing) {
            isShowing = true;
            photoModal.show(event, $scope);
          }
        };

      } else {

        reader.onload = function ($event) {
          $scope.recette.setImage($event.target.result).then(function () {
            $scope.recette.save();
          });
        };
      }

    };*/

  });
