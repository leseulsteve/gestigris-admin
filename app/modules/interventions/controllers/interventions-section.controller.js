'use strict';

angular.module('interventions').controller('InterventionsSectionController',
  function (PlageIntervention) {

    var ctrl = this;

    PlageIntervention.find().then(function (plages) {
      ctrl.plages = plages;
    });

    ctrl.addPlage = function () {

    };

    //	var carousel = $('.carousel'),
    var seats = $('.carousel-seat');

    function getNext(el) {
      console.log(el.next().length);
      return el.next().length > 0 ? el.next() : seats.first();
    }

    ctrl.next = function () {

      var el = $('.is-ref').removeClass('is-ref');

      var newSeat = getNext(el);

      newSeat.addClass('is-ref');

      for (var i = 2; i < seats.length; i++) {
        newSeat = getNext(newSeat);
        newSeat.css('order', i);
        console.log(newSeat.css());

      }

    };

  });
