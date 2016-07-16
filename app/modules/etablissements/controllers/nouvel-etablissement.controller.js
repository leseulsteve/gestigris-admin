'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  function ($scope, Etablissement, EtablissementType, PlaceToEtablissementConverter) {

    var ctrl = this;

    EtablissementType.find().then(function (etablissementTypes) {
      ctrl.etablissementTypes = etablissementTypes;

    });

    $scope.$watch('place', function (place) {
      $scope.etablissement = place ? PlaceToEtablissementConverter.convert(place) : undefined;
    });

    ctrl.create = function (form, params) {

      form.etablissementType.$setTouched();

      if (form.$valid) {
        ctrl.dialog.hide();
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
