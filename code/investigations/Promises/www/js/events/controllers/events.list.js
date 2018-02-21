(function () {

  'use strict';

  var app = angular.module('eventsjs');

  app.controller('EventsListCtrl', control);

  control.$inject = ['$state', '$rootScope', 'eventsSrvc'];

  function control($state, $rootScope, eventsSrvc) {

    var vm = angular.extend(this, { events: [] });

    function init() {
      eventsSrvc.retrieveAllEvents().then(
        function(data) {
          console.log(data);
          vm.events = data;
        },
        function (error) {
          console.error(error);
        }
      );
    }

    init();

    vm.editEvent = function (eventID) {
      $rootScope.loading = true;
      $state.go('event-edit', { eventID: eventID });
    };

  }

})();
