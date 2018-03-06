(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$state', 'eventsSrvc', 'selectedEvent'];

  function control($state, eventsSrvc, selectedEvent) {

    var vm = angular.extend(this, { event: {} });

    vm.event = selectedEvent;

    vm.save = function save() {
      eventsSrvc.putEvent(vm.event).then(
        function success(data) {
          eventsSrvc.updateEvent(data);
          $state.go('event-list');
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    

  }

})();