var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/home/homeTmpl.html',
        controller: 'homeCtrl',
        resolve: {
          jazzData: function($stateParams, teamService){
            return teamService.getTeamData('utahjazz');
          },
          lakersData: function($stateParams, teamService){
            return teamService.getTeamData('losangeleslakers');
          },
          heatData: function($stateParams, teamService){
            return teamService.getTeamData('miamiheat');
          }
        }
      })
      .state('teams', {
        url: '/teams/:team',
        templateUrl: 'js/teams/teamTmpl.html',
        controller: 'teamCtrl',
        resolve: {
          teamData: function($stateParams, teamService){
            return teamService.getTeamData($stateParams.team);
          }
        }
      });
  $urlRouterProvider
    .otherwise('/');
});
