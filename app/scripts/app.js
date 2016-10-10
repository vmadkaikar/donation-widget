'use strict'; 

angular
  .module('crowdFundingApp', [
    'ngRoute',
    'ngCookies',
    'ngDialog'  
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
