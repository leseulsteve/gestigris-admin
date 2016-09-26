'use strict';

angular.module('core').factory('PlaceToEtablissementConverter',
  function (Etablissement) {

    return {

      convert: function (place, lists) {
        lists = lists;
        return new Etablissement({
          name: place.description,
          address: {
            street: (place.address.houseNumber ? place.address.houseNumber + ' ' : '') + place.address.street,
            postalCode: place.address.postalCode
          },
          coordinates: {
            lat: parseFloat(place.coordinates.lat),
            long: parseFloat(place.coordinates.long)
          },
          osmId: place.osmId,
          osmType: place.osmType,
          placeId: place.placeId,
          type: place.type
        });
      }
    };
  });
