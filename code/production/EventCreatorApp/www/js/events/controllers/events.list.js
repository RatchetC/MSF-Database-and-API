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
  }

})();