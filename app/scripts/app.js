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

app.run(function(themeManager, playersManager) {

  //get the current theme list
  themeManager.loadThemes();

  //get the current player list
  playersManager.getUserList();
});