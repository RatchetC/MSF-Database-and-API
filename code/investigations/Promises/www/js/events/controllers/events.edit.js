(function () {

  'use strict';

  var app = angular.module('eventsjs');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$rootScope', 'selectedEvent'];

  function control($rootScope, selectedEvent) {

    var vm = angular.extend(this, {
      event: {}
    });

    vm.event = selectedEvent;

  }

})();
