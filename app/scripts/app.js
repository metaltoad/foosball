var app = angular.module('FoozKombat', [
  'ngRoute',
  'timer'

]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/intro.html',
      controller: 'IntroCtrl'
    })
    .when('/vs', {
      templateUrl: 'views/vs.html',
      controller: 'VSCtrl'
    })
    .when('/game', {
      templateUrl: 'views/game.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    }
  );
}]);

app.run(function($http, $rootScope) {
  //load the theme settings into scope
  $http.get('/app/themes/themes.json').
    success(function(data, status, headers, config) {
      //set the theme used
      var currentTheme = "mortalkombat";

      $rootScope.themes = data;

      $http.get('/app/themes/' + currentTheme + '/settings.json').
        success(function(data, status, headers, config) {
          $rootScope.themedata = data;
        });
    });
});