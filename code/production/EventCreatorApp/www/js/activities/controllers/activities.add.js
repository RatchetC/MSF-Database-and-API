(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityAddCtrl', control);

  control.$inject = ['$ionicHistory', 'activitiesSrvc'];

  function control($ionicHistory, activitiesSrvc) {

    var vm = angular.extend(this, {
      activity: {
        id: new Date().getTime().toString(),
        name: '',
        description: '',
        units: '',
        minLegalValue: '',
        maxLegalValue: ''
      }
    });

    vm.save = function save() {
      activitiesSrvc.postActivity(vm.activity).then(
        function success(postedActivity) {
          activitiesSrvc.addActivity(postedActivity);
          $ionicHistory.goBack();
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

  }

})();