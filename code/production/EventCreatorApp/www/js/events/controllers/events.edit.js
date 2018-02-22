(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventEditCtrl', control);

  control.$inject = ['selectedEvent'];

  function control(selectedEvent) {

    var vm = angular.extend(this, { event: {} });

    vm.event = selectedEvent;

  }

})();