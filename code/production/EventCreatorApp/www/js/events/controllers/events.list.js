(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'eventsSrvc'];

  function control($state, $ionicPopup, eventsSrvc) {

    var vm = angular.extend(this, { events: [] });

    function init() {
      eventsSrvc.getAllEvents().then(
        function success(data) {
          vm.events = data;
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
      $ionicPopup.confirm({
        title: 'Delete Event',
        template: 'Are you sure you want to delete this event?'
      }).then(function (res) {
        if (res) {
          eventsSrvc.deleteEvent(eventID);
        }
      });
    };

  }

})();