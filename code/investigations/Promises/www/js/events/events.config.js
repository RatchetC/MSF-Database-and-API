(function () {

  'use strict';

  /**
   * Note the absence of a second parameter
   * This is because we defined the module called 'eventsjs' in the events.module.js file.
   * Here we are simply re-opening the module to add parts to it. In this case it is the state machine that contains everything to do with the states for events in the app
   */
  var app = angular.module('eventsjs');

  // configures the 'eventsjs application'
  app.config(function ($stateProvider, $urlRouterProvider) {

    // use $stateProvider to setup states for the app
    $stateProvider.state('event-list', {
      // stops a view from being reused in the state it was in, i.e it will be refreshed and its controller will be reloaded
      cache: false,
      // the url that the app will go to when moving to this state
      // developer can also move directly to a state by entering the url into the address bar of their browser.
      // Note : there is no address bar in the webview on android, so the user will not be able to do this (not that the user needs to be able to do that anyway).
      url: '/event-list',
      // the url of the file that holds the view to be displayed when in this state
      // templates/event.list.html is simply the event.list.html file in the templates folder in the www folder 
      templateUrl: 'templates/event.list.html',
      // specifying the controller to use in this view.
      // this allows for the use of one view and two controllers (e.g. adding and editing can be done in the same view but handled by 2 different controllers)
      // 'as vm' explanation https://johnpapa.net/angularjss-controller-as-and-the-vm-variable/
      controller: 'EventsListCtrl as vm',
    });

    $stateProvider.state('event-edit', {
      cache: false,
      url: '/event-edit/:eventID',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventEditCtrl as vm',
      // resolve passes selectedEvent to EventEditCtrl once selectedEvent has a value
      // it is assigned a value when the function returns
      // in this case the function returns an event object which is gotten through the event service method 'retrieveEvent' which takes an event ID as a parameter
      // the app will not move to the event-edit state until selected is given a value
      resolve: {
        selectedEvent: function (eventsSrvc, $stateParams) {
          return eventsSrvc.retrieveEvent($stateParams.eventID);
        }
      }
    });

    // redirects requests to urls that aren't part of a state to the 'event-list' state.
    $urlRouterProvider.otherwise('event-list');

  });
  
})();
