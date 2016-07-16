'use strict';

angular.module('core').factory('PlaceAutocompleteFactory',
  function () {

    var maps = {
      cities: {
        'Quebec city': 'Ville de Québec'
      },
      provinces: {
        'Quebec': 'Québec'
      }
    };
    /*jshint camelcase: false */
    return {

      convertResult: function (nominatim, mapzenItem) {
        return {
          description: nominatim.address[nominatim.type] || mapzenItem.properties.label,
          placeType: nominatim.type,
          placeId: nominatim.place_id,
          osmId: nominatim.osm_id,
          osmType: nominatim.osm_type,
          coordinates: {
            lat: nominatim.lat,
            long: nominatim.lon
          },
          address: {
            houseNumber: nominatim.address.house_number,
            street: nominatim.address.road,
            neighbourhood: nominatim.address.neighbourhood,
            suburb: nominatim.address.suburb,
            city: maps.cities[nominatim.address.city] || nominatim.address.city,
            province: maps.provinces[nominatim.address.state] || nominatim.address.state,
            country: nominatim.address.country,
            postalCode: nominatim.address.postcode
          }
        };
      }
    };
  });
