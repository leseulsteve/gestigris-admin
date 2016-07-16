'use strict';

angular.module('core').directive('placeAutocomplete',
  function($http) {
    return {
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'modules/core/views/place.autocomplete.html',
      link: function(scope, element, attrs, ngModelCtrl) {


        scope.querySearch = function(searchText) {
          var req = {
            method: 'GET',
            url: 'http://photon.komoot.de/api/?q=' + searchText + '&lat=' + 46.823596 + '&lon=' + -71.227705,
            headers: {
              'Content-Type': 'text/html'
            }
          }

          // return $http.get('https://search.mapzen.com/v1/search?text=' + searchText + '&focus.point.lat=' + 46.823596 + '&focus.point.lon=' + -71.227705 + '&api_key=search-v5XrVqS').then(function(response) {
          //photon.komoot.de/api/?q=berlin&lat=52.3879&lon=13.0582
          return $http(req).then(function(response) {
            return response.data.features;
          });
        };

        scope.selectedItemChange = function(item) {
          ngModelCtrl.$setViewValue({
            coordinates: {
              lat: item.geometry.coordinates[0],
              long: item.geometry.coordinates[1]
            },
            address: {
              street: item.properties,
              arrondissement: '',
              city: item.properties.locality,
              city: item.properties.region,
              postalCode: '',
            },
          });
          console.log(item);
        };

      }
    };
  });