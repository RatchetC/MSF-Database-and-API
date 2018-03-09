(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'eventsSrvc', 'eventActivityMappingsSrvc', 'selectedEvent', 'activities', 'mappings'];

  function control($state, $ionicPopup, eventsSrvc, eventActivityMappingsSrvc, selectedEvent, activities, mappings) {

    var vm = angular.extend(this, {
      title: 'Edit Event',
      btnSaveText: 'Save Changes To Event',
      event: selectedEvent,
      activities: activities,
      noActivities: false
    });

    function init() {
      if (vm.activities.length === 0) {
        vm.noActivities = true;
      }
    }

    init();

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

    vm.gotoActivityList = function gotoActivityList() {
      $state.go('activity-list', { eventID: $state.params.eventID });
    };

    vm.deleteActivityFromEvent = function deleteActivityFromEvent(activityID) {
      $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete this activity from your event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          for (var i = 0; i < vm.activities.length; i++) {
            if (vm.activities[i].id === activityID) {
              vm.activities.splice(i, 1);
            }
          }
          if (vm.activities.length === 0) {
            vm.noActivities = true;
          }
          for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].activity === activityID) {
              eventActivityMappingsSrvc.deleteEventActivityMapping(mappings[j].id);
            }
          }
        }
      });
    };

  }

})();