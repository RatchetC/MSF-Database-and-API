(function () {

  'use strict';

  var app = angular.module('EventCreatorApp', [
    'ionic',
    'restlet.sdk',
    'Events'
  ]);

  app.run(function ($ionicPlatform, $rootScope, activityevents) {
    
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
      console.log('$stateChangeStart fired');
      console.log('Moving from ' + fromState.url + ' to ' + toState.url);
    });

    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeSuccess fired');
      console.log('Moved to ' + toState.url + ' from ' + fromState.url);
    });

    activityevents.configureHTTP_BASICAuthentication('a4ccb4f9-f183-4505-b178-cca604d6c678', '4e39077a-383c-407c-a538-dd2c7cda3dfc');

  });

})();
