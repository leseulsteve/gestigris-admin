'use strict';

angular.module('core').factory('PlaceToEtablissementConverter',
  function (Etablissement) {

    return {

      convert: function (place, lists) {
        lists = lists;
        return new Etablissement({
          name: place.description,
          address: place.address ? {
            street: (place.address.houseNumber ? place.address.houseNumber + ' ' : '') + place.address.street,
            postalCode: place.address.postalCode
          } : {
            street: '',
            postalCode: ''
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
