(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityAddCtrl', control);

  control.$inject = ['$ionicHistory', '$ionicPopup', 'activitiesSrvc'];

  function control($ionicHistory, $ionicPopup, activitiesSrvc) {

    var vm = angular.extend(this, {
      activity: {
        id: new Date().getTime().toString(),
        name: '',
        description: '',
        units: '',
        minLegalValue: '',
        maxLegalValue: ''
      },
      loading: false
    });

    vm.save = function save() {
      vm.loading = true;
      activitiesSrvc.postActivity(vm.activity).then(
        function success(postedActivity) {
          activitiesSrvc.addActivity(postedActivity);
          vm.loading = false;
          $ionicHistory.goBack();
        },
        function failure(error) {
          console.error(error);
          $ionicPopup.alert({
            title: 'Error!',
            template: 'Failed to save your activity to the database. Please check your internet connection and try again.'
          });
        }
      );
    };

  }

})();