'use strict';

angular.module('events').directive('miniCalendar',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/events/views/mini-calendar.html',
      controller: 'MiniCalendarController',
      controllerAs: 'miniCalendarCtrl'
    };
  });
