(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory','eventsSrvc'];

  function control($state, $ionicPopup, $ionicHistory, eventsSrvc) {

    var vm = angular.extend(this, {
      title: "Add Event",
      btnSaveText: 'Save Event',
      event: {},
      noActivities: true
    });

    vm.save = function save() {
      vm.loading = true;
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          vm.loading = false;
          $ionicPopup.alert({
            title: 'Success!',
            template: 'Your event has been saved!'
          });
          $state.go('event-list');
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    vm.gotoActivityList = function gotoActivityList() {
      vm.loading = true;
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          vm.loading = false;
          // the add event and edit event screens are one and the same as they share a template.
          // this means that when the user goes back after going to the activity list the fields are empty even though the event has been added 
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('activity-list', { eventID: postedEvent.id });
        },
        function failure(error) {
          console.error(error);
        }
      );
    };
    
  }

})();