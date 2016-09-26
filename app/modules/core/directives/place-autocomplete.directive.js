'use strict';

angular.module('core').directive('placeAutocomplete',
  function ($http, PlaceAutocompleteFactory) {
    return {
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'modules/core/views/place.autocomplete.html',
      compile: function (iElement, iAttrs) {

        if (iAttrs.mdFloatingLabel) {
          iElement.find('md-autocomplete').attr('md-floating-label', iAttrs.mdFloatingLabel);
        }

        return function link(scope, element, attrs, ngModelCtrl) {

          var mapzenKey = 'search-v5XrVqS';

          scope.querySearch = function (searchText) {
            var url = 'https://search.mapzen.com/v1/search?text=' + searchText + '&api_key=' + mapzenKey;
            return $http.get(url).then(function (response) {
              console.log(response.data.features);
              return response.data.features;
            });
          };

          scope.selectedItemChange = function (mapzenItem) {
            if (mapzenItem) {
              $http.get('http://nominatim.openstreetmap.org/lookup?format=json&osm_ids=W' + mapzenItem.properties.id.replace('way:', '')).then(function (response) {
                console.log(response.data);
                ngModelCtrl.$setViewValue(response.status === 200 && response.data.length === 1 ? PlaceAutocompleteFactory.convertResult(_.first(response.data), mapzenItem) : undefined);
                ngModelCtrl.$render();
              });
            } else {
              ngModelCtrl.$setViewValue(undefined);
            }
          };
        };
      }
    };
  });
