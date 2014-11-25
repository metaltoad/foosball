'use strict';

app.controller('IntroCtrl', function($scope, $rootScope, $location, $http) {

  var maxUserIdLength = 10;
  var usersLoggedIn = 0;
  var guestLogin1key = "n";
  var guestLogin2key = "m";
  var cycleThemekey = "v";
  var resetKey = "u";
  $rootScope.currentTheme = 0;

  $scope.activeLoginID = false;
  $scope.activeLoginCode = "";

  document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
    });

  //get a list of valid ids
  //todo ping the service
  var users = { '4129187106':
                  {'name': 'Tom',
                   'avatar': 'views/images/players/10.jpg',
                   'player': 'views/images/player1.jpg'},
                '1':
                  {'name': 'Matt',
                   'avatar': 'views/images/players/19.jpg',
                   'player': 'views/images/player2.jpg'},
                '2':
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
      $rootScope.players[$scope.activeLoginID] = users[$scope.activeLoginCode];
      $scope.activeLoginID = false;
      $scope.activeLoginCode = "";
    }
    else if(key == resetKey) {
      $scope.activeLoginID = false;
      $scope.activeLoginCode = "";
      $rootScope.players = [];
    }
    else if(key == cycleThemekey) {
      $rootScope.currentTheme++;

      if($rootScope.currentTheme >= $rootScope.themes.length) {
        $rootScope.currentTheme = 0;
      }

      $http.get('/app/themes/' + $rootScope.themes[$rootScope.currentTheme] + '/settings.json').
        success(function(data, status, headers, config) {
          $rootScope.themedata = data;
        });

      //reset the login
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }
    else if(key == guestLogin1key) {
      $rootScope.players[1] = {"name": "Guest"};

      //reset the login
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }
    else if(key == guestLogin2key) {
      $rootScope.players[2] = {"name": "Guest"};

      //reset the login
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }
    else if($scope.activeLoginCode.length >= maxUserIdLength) {
      //invalid id, reset
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }

    if($rootScope.players[1] && $rootScope.players[2]) {
      for(var id in $rootScope.players) {
        if($rootScope.players[id].name == "Guest") {
          $rootScope.players[id] = $rootScope.themedata.defaultplayer;
        }
        else {
          //check all the settings if any are missing set them default
          //any other settings should be provided, like name, vs avatar

          //these are likely not provided so go with defaults

          if(!$rootScope.players[id]['stances']) {
            $rootScope.players[id]['stances'] = {};
          }

          if(!$rootScope.players[id]['taunts']) {
            $rootScope.players[id]['taunts'] = {};
          }

          //set the default stances
          //get a random default player to use
          var p = Math.floor((Math.random() * $rootScope.themedata.defaultplayer.provideddefaults) + 1)

          for(key in $rootScope.themedata.defaultplayer['stances']) {
            if(!$rootScope.players[id]['stances'][key]) {
              $rootScope.players[id]['stances'][key] = jQuery.extend({}, $rootScope.themedata.defaultplayer['stances'][key]);

              //prefix the image with the path and the random character
              $rootScope.players[id]['stances'][key].image = "/app/themes/" + $rootScope.themes[$rootScope.currentTheme] + "/images/players/" + p + "/" + $rootScope.themedata.defaultplayer['stances'][key].image;

            }
          }

          //set the default taunts
          for(key in $rootScope.themedata.defaultplayer['taunts']) {
            if(!$rootScope.players[id]['taunts'][key]) {
              $rootScope.players[id]['taunts'][key] = $rootScope.themedata.defaultplayer['taunts'][key];
            }
          }
        }
      }

      //move to the vs screen
      $location.url("/vs");
    }
  }
}
});
