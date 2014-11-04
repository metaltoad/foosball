'use strict';

app.controller('IntroCtrl', function($scope, $rootScope, $location) {

  var maxUserIdLength = 6;
  var usersLoggedIn = 0;

  $scope.activeLoginID = false;
  $scope.activeLoginCode = "";

  //get a list of valid ids
  //todo ping the service
  var users = {'493784':
                  {'name': 'Tom',
                   'avatar': 'views/images/players/10.jpg',
                   'player': 'views/images/player1.jpg'},
               '435820':
                  {'name': 'Matt',
                   'avatar': 'views/images/players/19.jpg',
                   'player': 'views/images/player2.jpg'},
               '589992':
                  {'name': 'Chris',
                   'avatar': 'views/images/players/13.jpg'},
               };

$rootScope.handleLogin = function($e) {
  var key = String.fromCharCode($e.which);
  if(!$scope.activeLoginID) {
    $scope.activeLoginID = key;
  }
  else {
    //record the id input
    $scope.activeLoginCode += key;

    if($scope.activeLoginCode in users) {
      usersLoggedIn++;
      $rootScope.players[1] = users[$scope.activeLoginID];

      $scope.activeLoginID = false;
      $scope.activeLoginCode = "";
    }
    else if(key == 'n') {
      usersLoggedIn++;
    }
    else if($scope.activeLoginCode.length > maxUserIdLength) {
      //invalid id, reset
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }

    if(usersLoggedIn == 2) {
      //move to the vs screen
      $location.url("/vs");
    }
  }
}

});