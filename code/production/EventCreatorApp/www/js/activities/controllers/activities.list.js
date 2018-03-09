(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$timeout', 'activitiesSrvc', 'eventActivityMappingsSrvc'];

  function control($state, $ionicPopup, $timeout, activitiesSrvc, eventActivityMappingsSrvc) {

    var vm = angular.extend(this, { activities: [] });

    function init() {
      activitiesSrvc.getAllActivities().then(
        function success(data) {
          vm.activities = data;
        },
        function failure(error) {
          console.error(error);
          // TODO: show popup and move back to previous screen / home screen
        }
      );
    }

    init();

    // vm.gotoEditActivityScreen = function gotoEditActivityScreen(activityID) {
    //   $state.go('activity-edit', { activityID: activityID } );
    // };

    // vm.deleteActivity = function deleteActivity(activityID) {
    //   $ionicPopup.confirm({
    //     title: 'Delete Activity',
    //     template: 'Are you sure you want to delete this activity?'
    //   }).then(function (res) {
    //     if (res === true) {
    //       activitiesSrvc.deleteActivity(activityID);
    //     }
    //   });
    // };

    vm.addActivityToEvent = function addActivityToEvent(activity) {
      var mapping = {
        id: new Date().getTime().toString(),
        event: $state.params.eventID,
        activity: activity.id
      };

      $ionicPopup.confirm({
        title: 'Add Activity To Event',
        template: 'Are you sure you want to add ' + activity.name + ' to your event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          eventActivityMappingsSrvc.postEventActivityMapping(mapping).then(
            function success(postedMapping) {
              // eventActivityMappingsSrvc.addEventActivityMapping(postedMapping);
              $timeout(function () {
                $state.go('event-edit', { eventID: $state.params.eventID });
              }, 1000);
            },
            function failure(error) {
              console.log(error);
            }
          );
        }
      });

    };

  }

})();