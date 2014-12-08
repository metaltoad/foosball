app.service('sessionManager', ['$http', 'playersManager', 'themeManager', '$location', 'gamemessages', '$rootScope', function($http, playersManager, themeManager, $location, gamemessages, $rootScope) {

  var maxUserIdLength = 10;
  var usersLoggedIn = 0;
  var guestLogin1key = "[";
  var guestLogin2key = "'";
  var cycleThemekey = "-";
  var resetKey = "u";
  var nfcKey = "*";
  var nfcStartChar = "<";
  var nfcEndChar = ">";
  var nfcData = "";
  var sessionViewMode = "play";
  var session = false;
  var currentBackground = "";

  this.getSessionViewMode = function() {
    return this.sessionViewMode;
  }

  //get the current game in progress session data
  this.getSession = function() {
    //load up the current session data
    $http.get('/app/session.php?key=jlkjdsv7809304hjhjaef3$98fddfg').
      success(function(data, status, headers, config) {

        if(data.player1 == null) {
          this.session = true;
        }
        else {
          this.viewonly = true;
          this.players = [];
//          $rootScope.players[1] = {};
//          $rootScope.players[2] = {};
//
//          $rootScope.players[1].id = data.player1;
//          $rootScope.players[2].id = data.player2;
//
//          $rootScope.players[1].name = users[data.player1].name;
//          $rootScope.players[2].name = users[data.player2].name;

          this.currentTheme = data.currentTheme;
          this.themedata = data.themeData;
          this.players[1] = data.player1data;
          this.players[2] = data.player2data;

          this.background = data.themeData.currentBackground;

          if(this.themeData.scoretype == "healthbar") {
            this.players[1].health = 5 - data.yellowscore;
            this.players[2].health = 5 - data.blackscore;
          }
          else {
            this.players[1].health = data.blackscore;
            this.players[2].health = data.yellowscore;
          }

//          $http.get('/app/themes/' + $rootScope.themes[$rootScope.currentTheme] + '/settings.json').
//            success(function(data, status, headers, config) {
//              $rootScope.themeData = data;
//            });

          //set the url to the game
          $location.url("/game");
        }
      });
  }

  this.updateSession = function() {

//    if(!sessionViewMode.viewonly) {
//      var yellowscore = null;
//      var blackscore = null;
//      var player3 = null;
//      var player4 = null;

//     // this.themeData['currentBackground'] = this.background;
//
//      //check the type of scoring this theme uses and set the scoreing
//      if(this.themeData.scoretype == "healthbar") {
//       if(!this.players[1].health) {
//          blackscore = 0;
//        }
//        else {
//          blackscore =  5 - this.players[1].health;
//        }
//        if(!this.players[1].health) {
//          yellowscore = 0;
//        }
//        else {
//          yellowscore = 5 - this.players[2].health;
//        }
//      }
//      else {
//        if(!this.players[1].score) {
//          blackscore = 0;
//        }
//        else {
//          blackscore = this.players[1].score;
//        }
//
//        if(!this.players[2].score) {
//          yellowscore = 0;
//        }
//        else {
//          yellowscore = this.players[2].score;
//        }
//      }
//
//      if(this.players[3]) {
//        player3 = this.players[3].id;
//      }
//
//      if(this.players[4]) {
//        player4 = this.players[4].id;
//      }
//
//      var req = {
//        method: 'POST',
//        url: '/app/session.php',
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
//        },
//        data: {
//          key: 'jlkjdsv7809304hjhjaef3$98fddfg',
//          player1: this.players[1].id,
//          player2: this.players[2].id,
//          player3 : player3,
//          player4 : player4,
//          yellowscore: yellowscore,
//          blackscore: blackscore,
//          gametime: 0,
//          currentTheme: this.currentTheme,
//          themedata: this.themeData,
//          player1data: this.players[1],
//          player2data: this.players[2]
//        },
//      }
//
//      //update the session
//      $http(req).
//        success(function(data, status, headers, config) {
//
//        });
//    }
  }

  //assign a random background for the current theme
  this.getRandomBackground = function() {
    if(!themeManager.themeData.backgrounds) {
      return;
    }
    var randLoc = Math.floor((Math.random() * Object.keys(themeManager.themeData.backgrounds).length));
    this.currentBackground = themeManager.themeData.backgrounds[randLoc];

    return this.currentBackground;
  }

  this.getCurrentBackground = function() {
    return this.currentBackground;
  }

  //assign the specified player a random default character
  //used normally when there isnt one specified by the logged in user
  this.getRandomDefaultPlayer = function() {

  }
}]);