'use strict';

angular.module('events').controller('MiniCalendarController',
  function ($rootScope, $scope, $q, EventService, Moment, FlickityService) {

    var ctrl = this;

    ctrl.calendarOptions = {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    };

    ctrl.selectEvent = EventService.select;

    var eventSet = {};

    function loadEvents(date) {
      var timestamp = '' + date.date() + date.month() + date.year();

      var events = eventSet[timestamp];

      if (events) {
        var deffered = $q.defer();
        deffered.resolve(events);
        return deffered.promise;
      } else {
        return EventService.getByDate(date).then(function (events) {
          eventSet[timestamp] = events;
          return events;
        });
      }
    }

    function loadList(index, events) {

      ctrl['list' + (index + 1)] = ctrl['list' + (index + 1)] ||  {};
      ctrl['list' + (index + 1)] = {
        events: events,
        loading: false
      };

    }

    ctrl.list1 =   {
      loading: true
    };
    ctrl.list2 =   {
      loading: true
    };
    ctrl.list3 =   {
      loading: true
    };

    ctrl.date = new Moment();

    function loadLeft(selectedIndex) {
      var listNb = selectedIndex === 0 ? 2 : selectedIndex === 1 ? 0 : 1;
      ctrl['list' + (listNb + 1)].loading = true;
      loadEvents(new Moment(ctrl.date).subtract(1, 'days')).then(function (events) {
        loadList(listNb, events);
      });
      loadEvents(new Moment(ctrl.date).subtract(2, 'days'));
    }

    function loadRight(selectedIndex) {
      var listNb = selectedIndex === 0 ? 1 : selectedIndex === 1 ? 2 : 0;
      ctrl['list' + (listNb + 1)].loading = true;
      loadEvents(new Moment(ctrl.date).add(1, 'days')).then(function (events) {
        loadList(listNb, events);
      });
      loadEvents(new Moment(ctrl.date).add(2, 'days'));
    }

    var currentIndex = 1;

    loadLeft(currentIndex);

    loadEvents(new Moment(ctrl.date)).then(function (events) {
      loadList(1, events);
    });

    loadRight(currentIndex);

    $rootScope.$on('Flickity:calendarList:cellSelect', function (event, data) {

      var wentLeft = false;
      wentLeft = wentLeft || data.instance.selectedIndex === 0 && currentIndex === 1;
      wentLeft = wentLeft || data.instance.selectedIndex === 2 && currentIndex === 0;
      wentLeft = wentLeft || data.instance.selectedIndex === 1 && currentIndex === 2;

      if (wentLeft) {
        ctrl.date.subtract(1, 'days');
        loadLeft(data.instance.selectedIndex);
      } else {
        ctrl.date.add(1, 'days');
        loadRight(data.instance.selectedIndex);
      }
      currentIndex = data.instance.selectedIndex;
    });

    ctrl.previousDay = function () {
      FlickityService.previous('calendarList');
    };

    ctrl.nextDay = function () {
      FlickityService.next('calendarList');
    };

    ctrl.flickityOptions = {
      initialIndex: currentIndex,
      prevNextButtons: false,
      wrapAround: true,
      draggable: false
    };

  });
