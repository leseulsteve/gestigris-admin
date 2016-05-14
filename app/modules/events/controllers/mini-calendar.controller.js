'use strict';

angular.module('events').controller('MiniCalendarController',
  function (EventService) {

    var ctrl = this;

    EventService.getByDate(Date.now()).then(function (events) {
      ctrl.events = events;
    });

    ctrl.selectEvent = EventService.select;

  });
