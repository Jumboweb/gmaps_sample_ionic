angular.module('app', ['ionic', 'ngCordova', 'LocalForageModule'])
.config(function($stateProvider, $urlRouterProvider, $provide, $httpProvider) {
  'use strict';
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.tabs', {
    url: '/tabs',
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'views/tabs.html',
        controller: 'TabsCtrl'
      }
    }
  })
  .state('app.tabs.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.tabs.map', {
    url: '/map',
    views: {
      'map-tab': {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      }
    }
  });


  $urlRouterProvider.otherwise('/app/tabs/home');

  // improve angular logger
  $provide.decorator('$log', ['$delegate', 'customLogger', function($delegate, customLogger){
    return customLogger($delegate);
  }]);


})

.constant('Config', Config)

.run(function($rootScope, $state, $log, Config){
  'use strict';
});
