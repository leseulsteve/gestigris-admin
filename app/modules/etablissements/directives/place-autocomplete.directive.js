'use strict';

angular.module('etablissements').directive('placeAutocomplete',
  function ($http, PlaceAutocompleteFactory, ETABLISSEMENTS) {
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

          scope.querySearch = function (searchText) {
            var url = 'https://search.mapzen.com/v1/search?text=' + searchText + '&api_key=' + ETABLISSEMENTS.MAPZEN_KEY;
            return $http.get(url).then(function (response) {
              return response.data.features;
            });
          };

          scope.selectedItemChange = function (mapzenItem) {
            if (mapzenItem) {
              $http.get('http://nominatim.openstreetmap.org/lookup?format=json&osm_ids=W' + mapzenItem.properties.id.replace('way:', '')).then(function (response) {

                if (response.status === 200 && response.data.length >  0) {
                  ngModelCtrl.$setViewValue(PlaceAutocompleteFactory.convertResult(_.first(response.data), mapzenItem));
                } else  {
                  ngModelCtrl.$setViewValue({
                    description: mapzenItem.properties.name,
                    coordinates: {
                      lat: _.last(mapzenItem.geometry.coordinates),
                      long: _.first(mapzenItem.geometry.coordinates)
                    }
                  });
                }
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
