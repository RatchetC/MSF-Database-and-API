(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    var vm = angular.extend(this, { events: [] });

    function init() {
      eventsSrvc.getAllEvents().then(
        function success(data) {
          vm.events = eventsSrvc.events;
        },
        function failure(error) {
          console.error(error);
        }
      );
    }

    init();

    vm.editEvent = function (eventID) {
      $state.go('event-edit', { eventID: eventID });
    };

    vm.deleteEvent = function (eventID) {
      for (var i = 0; i < vm.events.length; i++) {
        if (vm.events[i].id === eventID) {
          vm.events.splice(i, 1);
        }
      }
      eventsSrvc.deleteEvent(eventID);
    }
  }

})();