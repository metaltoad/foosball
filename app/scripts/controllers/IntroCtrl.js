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
                   'avatar': 'views/images/players/1.jpg',
                   'vs': 'views/images/players/1.jpg'
                  },
  '2' :
                  {'name': 'Tony',
                   'avatar': 'views/images/players/2.jpg',
                   'vs': 'views/images/players/2.jpg'
                  },
  '4151622102' :
                  {'name': 'Joaquin',
                   'avatar': 'views/images/players/1.jpg',
                   'vs': 'views/images/players/1.jpg'
                  },
  '4831622102' :
                  {'name': 'Tony R',
                   'avatar': 'views/images/players/2.jpg',
                   'vs': 'views/images/players/2.jpg'
                  },
  '4491622102':
                  {'name': 'Tim W',
                   'avatar': 'views/images/players/3.jpg',
                   'vs': 'views/images/players/3.jpg'
                  },
  '4116162210':
                  {'name': 'Adam E',
                   'avatar': 'views/images/players/4.jpg',
                   'vs': 'views/images/players/4.jpg'
                  },
  '4821622102':
                  {'name': 'Dan L',
                   'avatar': 'views/images/players/5.jpg',
                   'vs': 'views/images/players/5.jpg'
                  },
  '4128163210':
                  {'name': 'Chris T',
                   'avatar': 'views/images/players/6.jpg',
                   'vs': 'views/images/players/6.jpg'
                  },
  '4117162210':
                  {'name': 'Dylan T',
                   'avatar': 'views/images/players/7.jpg',
                   'vs': 'views/images/players/7.jpg'
                  },
  '4931632102':
                  {'name': 'Randi K',
                   'avatar': 'views/images/players/8.jpg',
                   'vs': 'views/images/players/8.jpg'
                  },
  '4127163210':
                  {'name': 'Jonathan J',
                   'avatar': 'views/images/players/9.jpg',
                   'vs': 'views/images/players/9.jpg'
                  },
  '4611632102':
                  {'name': 'Tom M',
                   'avatar': 'views/images/players/10.jpg',
                   'vs': 'views/images/players/10.jpg'
                  },
  '4921632102':
                  {'name': '',
                   'avatar': 'views/images/players/11.jpg',
                   'vs': 'views/images/players/11.jpg'
                  },
  '4291632102':
                  {'name': 'Aubrey F',
                   'avatar': 'views/images/players/12.jpg',
                   'vs': 'views/images/players/12.jpg'
                  },
  '4601632102':
                  {'name': 'Chris S',
                   'avatar': 'views/images/players/13.jpg',
                   'vs': 'views/images/players/13.jpg'
                  },
  '4253163210':
                  {'name': 'Aaron A',
                   'avatar': 'views/images/players/14.jpg',
                   'vs': 'views/images/players/14.jpg'
                  },
  '4281632102':
                  {'name': 'Slavko P',
                   'avatar': 'views/images/players/15/avatar.jpg',
                   'vs': 'views/images/players/15/vs.png'
                  },
  '4219163210':
                  {'name': 'Nick P',
                   'avatar': 'views/images/players/16.jpg',
                   'vs': 'views/images/players/16.jpg'
                  },
  '4252163210':
                  {'name': 'Corrina',
                   'avatar': 'views/images/players/17.jpg',
                   'vs': 'views/images/players/17.jpg'
                  },
  '4187163210':
                  {'name': 'Tyler W',
                   'avatar': 'views/images/players/18.jpg',
                   'vs': 'views/images/players/18.jpg'
                  },
  '4218163210':
                  {'name': 'Matt P',
                   'avatar': 'views/images/players/19.jpg',
                   'vs': 'views/images/players/19.jpg'
                  },
  '4155163210':
                  {'name': 'Jordan L',
                   'avatar': 'views/images/players/20/avatar.jpg',
                   'vs': 'views/images/players/20/vs.png'
                  },
  '4109187106':
                  {'name': 'Peter B',
                   'avatar': 'views/images/players/21/avatar.jpg',
                   'vs': 'views/images/players/21/vs.png'
                  },
  '4501622102':
                  {'name': 'Peter B',
                   'avatar': 'views/images/players/21/avatar.jpg',
                   'vs': 'views/images/players/21/vs.png'
                  },
  '4123163210':
                  {'name': 'Nathan W',
                   'avatar': 'views/images/players/22.jpg',
                   'vs': 'views/images/players/22.jpg'
                  },
  '4154163210':
                  {'name': 'Steve W',
                   'avatar': 'views/images/players/23/avatar.jpg',
                   'vs': 'views/images/players/23/vs.png'
                  },
  '4901632102':
                  {'name': 'Ben T',
                   'avatar': 'views/images/players/24/avatar.jpg',
                   'vs': 'views/images/players/24/vs.png'
                  },
  '4122163210':
                  {'name': 'Jeebak K',
                   'avatar': 'views/images/players/25.jpg',
                   'vs': 'views/images/players/25.jpg'
                  },
  '4561632102':
                  {'name': '',
                   'avatar': 'views/images/players/26.jpg',
                   'vs': 'views/images/players/26.jpg'
                  },
  '4881632102':
                  {'name': 'Jenny O',
                   'avatar': 'views/images/players/27.jpg',
                   'vs': 'views/images/players/27.jpg'
                  },
  '4241632102':
                  {'name': 'Robinson E',
                   'avatar': 'views/images/players/28.jpg',
                   'vs': 'views/images/players/28.jpg'
                  },
  '4571632102':
                  {'name': 'Keith D',
                   'avatar': 'views/images/players/29.jpg',
                   'vs': 'views/images/players/29.jpg'
                  },
  '4421642102':
                  {'name': 'Rhienna',
                   'avatar': 'views/images/players/30.jpg',
                   'vs': 'views/images/players/30.jpg'
                  },
  '4180160210':
                  {'name': 'Erin N',
                   'avatar': 'views/images/players/31.jpg',
                   'vs': 'views/images/players/31.jpg'
                  },
  '4213160210' :
                  {'name': 'Aaron K',
                   'avatar': 'views/images/players/32/avatar.jpg',
                   'vs': 'views/images/players/32/vs.png'
                  },
  '4147160210':
                  {'name': 'Brad K',
                   'avatar': 'views/images/players/33.jpg',
                   'vs': 'views/images/players/33.jpg'
                  },
  '4179160210':
                  {'name': 'Simeon W',
                   'avatar': 'views/images/players/34.jpg',
                   'vs': 'views/images/players/34.jpg'
                  },
  '4114160210':
                  {'name': 'Mike L',
                   'avatar': 'views/images/players/35.jpg',
                   'vs': 'views/images/players/35.jpg'
                  },
  '4146160210':
                  {'name': 'Paul A',
                   'avatar': 'views/images/players/36/avatar.jpg',
                   'vs': 'views/images/players/36/vs.png'
                  },
  '4811602102':
                  {'name': 'Darren L',
                   'avatar': 'views/images/players/37.jpg',
                   'vs': 'views/images/players/37.jpg'
                  },
  '4113160210':
                  {'name': 'Cesar J',
                   'avatar': 'views/images/players/38/avatar.jpg',
                   'vs': 'views/images/players/38/vs.png'
                  },
  '4491602102':
                  {'name': 'Farrah B',
                   'avatar': 'views/images/players/39.jpg',
                   'vs': 'views/images/players/39.jpg'
                  },
  '4821602102':
                  {'name': 'Tony M',
                   'avatar': 'views/images/players/40.jpg',
                   'vs': 'views/images/players/40.jpg'
                  },
  '4151602102':
                  {'name': 'Marcus B',
                   'avatar': 'views/images/players/41/avatar.jpg',
                   'vs': 'views/images/players/41/vs.png'
                  },
  '4481602102' :
                  {'name': 'Alex L',
                   'avatar': 'views/images/players/42.jpg',
                   'vs': 'views/images/players/42.jpg'
                  },
  '4421592102':
                  {'name': 'Sam I',
                   'avatar': 'views/images/players/43.jpg',
                   'vs': 'views/images/players/43.jpg'
                  },
  '4161602102':
                  {'name': 'Robert L',
                   'avatar': 'views/images/players/44/avatar.jpg',
                   'vs': 'views/images/players/44/vs.png'
                  },
  '4771592102':
                  {'name': 'Kevin M',
                   'avatar': 'views/images/players/45/avatar.jpg',
                   'vs': 'views/images/players/45/vs.png'
                  },
  '4431592102':
                  {'name': 'Patrick C',
                   'avatar': 'views/images/players/46.jpg',
                   'vs': 'views/images/players/46.jpg'
                  },
  '4108159210':
                  {'name': 'Nate R',
                   'avatar': 'views/images/players/47.jpg',
                   'vs': 'views/images/players/47.jpg'
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

function stringIsNumber(s) {
    var x = +s; // made cast obvious for demonstration
    return x.toString() === s;
}


$rootScope.handleLogin = function($e) {
  var key = String.fromCharCode($e.which);

  if(key == guestLogin1key) {
    $rootScope.players[1] = {"name": "Guest", 'avatar': 'views/images/players/0.jpg'};

    //reset the login
    $scope.activeLoginCode = "";
    $scope.activeLoginID = false;
  }
  else if(key == guestLogin2key) {
    $rootScope.players[2] = {"name": "Guest", 'avatar': 'views/images/players/0.jpg'};

    //reset the login
    $scope.activeLoginCode = "";
    $scope.activeLoginID = false;
  }
  else if(!$scope.activeLoginID) {
    $scope.activeLoginID = key;
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
  else {
    if(stringIsNumber(key)) {

      //the first digit in a key is always 4, if the first digit isnt invalidate it so it can try again
      if($scope.activeLoginCode == "" && key != "4") {
        $scope.activeLoginCode = "";
        $scope.activeLoginID = false;
        return;
      }

      //record the id input
      $scope.activeLoginCode += key;

      if($scope.activeLoginCode in $rootScope.users) {
        $rootScope.players[$scope.activeLoginID] = $rootScope.users[$scope.activeLoginCode];
        $rootScope.players[$scope.activeLoginID].id = $scope.activeLoginCode;
        $scope.activeLoginID = false;
        $scope.activeLoginCode = "";
      }
      else if($scope.activeLoginCode.length >= maxUserIdLength) {
        //invalid id, reset
        $scope.activeLoginCode = "";
        $scope.activeLoginID = false;
      }
    }
    else {
      //clear the key login
      $scope.activeLoginCode = "";
      $scope.activeLoginID = false;
    }
  }
  if($rootScope.players[1] && $rootScope.players[2]) {
    for(var id in $rootScope.players) {
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

    //move to the vs screen
    $location.url("/vs");
  }
}
});
