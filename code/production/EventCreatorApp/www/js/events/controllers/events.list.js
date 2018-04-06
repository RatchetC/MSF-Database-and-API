(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'eventsSrvc'];

  function control($state, $ionicPopup, eventsSrvc) {

    var vm = angular.extend(this, {
      events: [],
      loading: true
    });

    // TODO: Fix navigation.
    // TODO: Comment code
    // TODO: Look into swapping out service calls for activityevents HTTP requests

    function init() {
      eventsSrvc.getAllEvents().then(
        function success(data) {
          vm.loading = false;
          vm.events = data;
        },
        function failure(error) {
          console.error(error);
        }
      );
    }

    init();

    vm.editEvent = function (eventID) {
      vm.loading = true;
      $state.go('event-edit', { eventID: eventID });
    };

    vm.deleteEvent = function (eventID) {
      $ionicPopup.confirm({
        title: 'Delete Event',
        template: 'Are you sure you want to delete this event?'
      }).then(function (response) {
        if (response) {
          eventsSrvc.deleteEvent(eventID);
        }
      });
    };

  }

})();