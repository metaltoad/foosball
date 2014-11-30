'use strict';

app.controller('IntroCtrl', function($scope, $rootScope, $location, $http) {

  var maxUserIdLength = 14;
  var usersLoggedIn = 0;
  var guestLogin1key = "[";
  var guestLogin2key = "'";
  var cycleThemekey = "-";
  var resetKey = "u";
  $rootScope.currentTheme = 0;

  $scope.activeLoginID = false;
  $scope.activeLoginCode = "";

  $rootScope.getSession = function() {
    //load up the current session data
    $http.get('/app/session.php?key=jlkjdsv7809304hjhjaef3$98fddfg').
      success(function(data, status, headers, config) {

        if(data.player1 == null) {
          $scope.nosession = true;
        }
        else {
          $rootScope.viewonly = true;
          $rootScope.players = [];
//          $rootScope.players[1] = {};
//          $rootScope.players[2] = {};
//
//          $rootScope.players[1].id = data.player1;
//          $rootScope.players[2].id = data.player2;
//
//          $rootScope.players[1].name = users[data.player1].name;
//          $rootScope.players[2].name = users[data.player2].name;

          $rootScope.currentTheme = data.currentTheme;
          $rootScope.themedata = data.themedata;
          $rootScope.players[1] = data.player1data;
          $rootScope.players[2] = data.player2data;

          $rootScope.background = data.themedata.currentBackground;

          if($rootScope.themedata.scoretype == "healthbar") {
            $rootScope.players[1].health = 5 - data.yellowscore;
            $rootScope.players[2].health = 5 - data.blackscore;
          }
          else {
            $rootScope.players[1].health = data.blackscore;
            $rootScope.players[2].health = data.yellowscore;
          }

//          $http.get('/app/themes/' + $rootScope.themes[$rootScope.currentTheme] + '/settings.json').
//            success(function(data, status, headers, config) {
//              $rootScope.themedata = data;
//            });

          //set the url to the game
          $location.url("/game");
        }
      });
  }

//get a list of valid ids
  //todo ping the service
  //here is the temp list till the service is ready

  $rootScope.users = {
  '1' :
                  {'name': 'Joaquin',
                   'avatar': 'views/images/players/1.jpg'
                  },
  '2' :
                  {'name': 'Tony',
                   'avatar': 'views/images/players/2.jpg'
                  },
  '040fa2d2d83881' :
                  {'name': 'Joaquin',
                   'avatar': 'views/images/players/1.jpg'
                  },
  '0453a2d2d83881' :
                  {'name': 'Tony R',
                   'avatar': 'views/images/players/2.jpg'
                  },
  '0431a2d2d83881':
                  {'name': 'Tim W',
                   'avatar': 'views/images/players/3.jpg'
                  },
  '0474a2d2d83881':
                  {'name': 'Adam E',
                   'avatar': 'views/images/players/4.jpg'
                  },
  '0452a2d2d83881':
                  {'name': 'Dan L',
                   'avatar': 'views/images/players/5.jpg'
                  },
  '0480a3d2d83881':
                  {'name': 'Chris T',
                   'avatar': 'views/images/players/6.jpg'
                  },
  '0475a2d2d83881':
                  {'name': 'Dylan T',
                   'avatar': 'views/images/players/7.jpg'
                  },
  '045da3d2d83881':
                  {'name': 'Randi K',
                   'avatar': 'views/images/players/8.jpg'
                  },
  '047fa3d2d83881':
                  {'name': 'Jonathan J',
                   'avatar': 'views/images/players/9.jpg'
                  },
  '043da3d2d83881':
                  {'name': 'Tom M',
                   'avatar': 'views/images/players/10.jpg'
                  },
  '045ca3d2d83881':
                  {'name': '',
                   'avatar': 'views/images/players/11.jpg'
                  },
  '041da3d2d83881':
                  {'name': 'Aubrey F',
                   'avatar': 'views/images/players/12.jpg'
                  },
  '043ca3d2d83881':
                  {'name': 'Chris S',
                   'avatar': 'views/images/players/13.jpg'
                  },
  '04fda3d2d83880':
                  {'name': 'Aaron A',
                   'avatar': 'views/images/players/14.jpg'
                  },
  '041ca3d2d83881':
                  {'name': 'Slavko P',
                   'avatar': 'views/images/players/15.jpg'
                  },
  '04dba3d2d83880':
                  {'name': 'Nick P',
                   'avatar': 'views/images/players/16.jpg'
                  },
  '04fca3d2d83880':
                  {'name': 'Corrina',
                   'avatar': 'views/images/players/17.jpg'
                  },
  '04bba3d2d83880':
                  {'name': 'Tyler W',
                   'avatar': 'views/images/players/18.jpg'
                  },
  '04daa3d2d83880':
                  {'name': 'Matt P',
                   'avatar': 'views/images/players/19.jpg'
                  },
  '049ba3d2d83880':
                  {'name': 'Jordan L',
                   'avatar': 'views/images/players/20.jpg'
                  },
  '04baa3d2d83880':
                  {'name': 'Peter B',
                   'avatar': 'views/images/players/21.jpg'
                  },
  '047ba3d2d83880':
                  {'name': 'Nathan W',
                   'avatar': 'views/images/players/22.jpg'
                  },
  '049aa3d2d83880':
                  {'name': 'Steve W',
                   'avatar': 'views/images/players/23.jpg'
                  },
  '045aa3d2d83880':
                  {'name': 'Ben T',
                   'avatar': 'views/images/players/24.jpg'
                  },
  '047aa3d2d83880':
                  {'name': 'Jeebak K',
                   'avatar': 'views/images/players/25.jpg'
                  },
  '0438a3d2d83880':
                  {'name': '',
                   'avatar': 'views/images/players/26.jpg'
                  },
  '0458a3d2d83880':
                  {'name': 'Jenny O',
                   'avatar': 'views/images/players/27.jpg'
                  },
  '0418a3d2d83880':
                  {'name': 'Robinson E',
                   'avatar': 'views/images/players/28.jpg'
                  },
  '0439a3d2d83880':
                  {'name': 'Keith D',
                   'avatar': 'views/images/players/29.jpg'
                  },
  '042aa4d2d83880':
                  {'name': 'Rhienna',
                   'avatar': 'views/images/players/30.jpg'
                  },
  '04b4a0d2d83880':
                  {'name': 'Erin N',
                   'avatar': 'views/images/players/31.jpg'
                  },
  '04d5a0d2d83880' :
                  {'name': 'Aaron K',
                   'avatar': 'views/images/players/32.jpg'
                  },
  '0493a0d2d83880':
                  {'name': 'Brad K',
                   'avatar': 'views/images/players/33.jpg'
                  },
  '04b3a0d2d83880':
                  {'name': 'Simeon W',
                   'avatar': 'views/images/players/34.jpg'
                  },
  '0472a0d2d83880':
                  {'name': 'Mike L',
                   'avatar': 'views/images/players/35.jpg'
                  },
  '0492a0d2d83880':
                  {'name': 'Paul A',
                   'avatar': 'views/images/players/36.jpg'
                  },
  '0451a0d2d83880':
                  {'name': 'Darren L',
                   'avatar': 'views/images/players/37.jpg'
                  },
  '0471a0d2d83880':
                  {'name': 'Cesar J',
                   'avatar': 'views/images/players/38.jpg'
                  },
  '0431a0d2d83880':
                  {'name': 'Farrah B',
                   'avatar': 'views/images/players/39.jpg'
                  },
  '0452a0d2d83880':
                  {'name': 'Tony M',
                   'avatar': 'views/images/players/40.jpg'
                  },
  '040fa0d2d83880':
                  {'name': 'Marcus B',
                   'avatar': 'views/images/players/41.jpg'
                  },
  '0430a0d2d83880' :
                  {'name': 'Alex L',
                   'avatar': 'views/images/players/42.jpg'
                  },
  '042a9fd2d83880':
                  {'name': 'Sam I',
                   'avatar': 'views/images/players/43.jpg'
                  },
  '0410a0d2d83880':
                  {'name': 'Robert L',
                   'avatar': 'views/images/players/44.jpg'
                  },
  '044d9fd2d83880':
                  {'name': 'Kevin M',
                   'avatar': 'views/images/players/45.jpg'
                  },
  '042b9fd2d83880':
                  {'name': 'Patrick C',
                   'avatar': 'views/images/players/46.jpg'
                  },
  '046c9fd2d83880':
                  {'name': 'Nate R',
                   'avatar': 'views/images/players/47.jpg'
                  }
                };

  if(document.getElementById("viewonly")) {
    $rootScope.getSession();
  }

  document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
  });

  document.getElementById("backdrop2").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop2").style.height= window.innerHeight+"px";
  });



$rootScope.handleLogin = function($e) {
  var key = String.fromCharCode($e.which);
  if(!$scope.activeLoginID) {
    $scope.activeLoginID = key;
  }
  else {
    //record the id input
    $scope.activeLoginCode += key;

    if($scope.activeLoginCode in $rootScope.users) {
      $rootScope.players[$scope.activeLoginID] = $rootScope.users[$scope.activeLoginCode];
      $rootScope.players[$scope.activeLoginID].id = $scope.activeLoginCode;
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
