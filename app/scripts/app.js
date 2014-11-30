var app = angular.module('FoozKombat', [
  'ngRoute',
  'timer'
]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $httpProvider.defaults.transformRequest = function(data) {
      if (data === undefined) { return data; }
      return $.param(data);
  };
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

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

  $rootScope.players = { };

  //load the theme settings into scope
  $http.get('/app/themes/themes.json').
    success(function(data, status, headers, config) {
      $rootScope.themes = data;

      $http.get('/app/themes/' + $rootScope.themes[0] + '/settings.json').
        success(function(data, status, headers, config) {
          $rootScope.themedata = data;
        });
    });
});