app.controller('MainCtrl', function($http, $scope, $routeParams, $timeout, $interval, $rootScope, gamemessages, $location) {

  var player1ForceKey = "";
  var player2ForceKey = "";

  var player1ScoreKey = "j";
  var player2ScoreKey = "b";
  var scoreTimeout = 2000;
  $scope.scoreInterval = false;

  if(!$rootScope.players) {
    $location.url("/vs");
  }

  if($rootScope.viewonly) {
    //set a timer to keep the view updated
    $interval(function() {$rootScope.getSession();}, 5000);
  }

  $scope.updateSession = function() {

    if(!$rootScope.viewonly) {
      var yellowscore = null;
      var blackscore = null;
      var player3 = null;
      var player4 = null;

      $rootScope.themedata['currentBackground'] = $rootScope.background;

      //check the type of scoring this theme uses and set the scoreing
      if($rootScope.themedata.scoretype == "healthbar") {
       if(!$rootScope.players[1].health) {
          blackscore = 0;
        }
        else {
          blackscore =  5 - $rootScope.players[1].health;
        }
        if(!$rootScope.players[1].health) {
          yellowscore = 0;
        }
        else {
          yellowscore = 5 - $rootScope.players[2].health;
        }
      }
      else {
        if(!$rootScope.players[1].score) {
          blackscore = 0;
        }
        else {
          blackscore = $rootScope.players[1].score;
        }

        if(!$rootScope.players[2].score) {
          yellowscore = 0;
        }
        else {
          yellowscore = $rootScope.players[2].score;
        }
      }

      if($rootScope.players[3]) {
        player3 = $rootScope.players[3].id;
      }

      if($rootScope.players[4]) {
        player4 = $rootScope.players[4].id;
      }

      var req = {
        method: 'POST',
        url: '/app/session.php',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
        },
        data: {
          key: 'jlkjdsv7809304hjhjaef3$98fddfg',
          player1: $rootScope.players[1].id,
          player2: $rootScope.players[2].id,
          player3 : player3,
          player4 : player4,
          yellowscore: yellowscore,
          blackscore: blackscore,
          gametime: 0,
          currentTheme: $rootScope.currentTheme,
          themedata: $rootScope.themedata,
          player1data: $rootScope.players[1],
          player2data: $rootScope.players[2]
        },
      }

      //update the session
      $http(req).
        success(function(data, status, headers, config) {

        });
    }
  }

  $scope.newGame = function() {

    $scope.$emit("timer-clear");
    $scope.$emit("timer-start");

    if(!$rootScope.players) {
      $rootScope.players = $rootScope.themedata.defaultplayers;
    }

    if(!$rootScope.background) {
      var randLoc = Math.floor((Math.random() * Object.keys($rootScope.themedata.backgrounds).length));
      $rootScope.background = $rootScope.themedata.backgrounds[randLoc];
    }

    //set the background image
    document.getElementById("backdrop").style.backgroundImage= "url(/app/themes/" + $rootScope.themes[$rootScope.currentTheme] + "/images/" + $rootScope.background.background + ")";
    document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
    });

    $rootScope.players[1].currentstance = "still";
    $rootScope.players[2].currentstance = "still";

    if(!$rootScope.viewonly) {
      //show the ready message
      gamemessages.showMessage("matchstart");
    }
  }

  $rootScope.handleFightInput = function($e, key) {
    switch(key) {
      case player1ScoreKey: {
        $scope.score(1);
        break;
      }
      case player2ScoreKey: {
        $scope.score(2);
        break;
      }
      case player1ForceKey: {
        $scope.registerForce(player)
        break;
      }
      case player2ForceKey: {
        $scope.registerForce(player)
        break;
      }
    }
  }

  //register ball force from a score do something with it
  $scope.registerForce = function(player) {
  }

  $scope.score = function(player) {

    //dont allow double scoring
    if($scope.scoreInterval) {
      return;
    }

    $scope.scoreInterval = true;

    var opposing = 1;

    if(player == 1) {
      opposing = 2;
    }

    $rootScope.players[player].currentstance = "score";
    $rootScope.players[opposing].currentstance = "scoredon";

    //show player taunt
    gamemessages.showRandomTaunt(player, "score");

    //only show a reaction 10% of the time
    var react = Math.floor((Math.random() * 10) + 1);

    if(react == 5) {
      gamemessages.showRandomTaunt(opposing, "scoredon");
    }

    //show goal message
    gamemessages.showMessage("goal");

    //set the opposing player to having been scored on
    $rootScope.players[opposing].currentstance = "scoredon";

    //check the type of scoring this theme uses and set the scoreing
    if($rootScope.themedata.scoretype == "healthbar") {

      $rootScope.players[opposing].health--;

      //check for a finish them
      if($rootScope.players[opposing].health == 1) {
        gamemessages.showMessage("finishthem");
        gamemessages.showRandomTaunt(player, "finishthem");
        $rootScope.players[opposing].currentstance = "finishthem";
      }

      //check for a win
      if($rootScope.players[opposing].health == 0) {

        //win!
        $scope.gameWon(player, opposing);
      }
    }
    else {

      $rootScope.players[player].score++;

      //check for a finish them
      if($rootScope.players[player].score == ($rootScope.themedata.winningscore - 1) &&
         $rootScope.players[opposing].score < ($rootScope.themedata.winningscore - 1)) {
         gamemessages.showMessage("finishthem");
         gamemessages.showRandomTaunt(player, "finishthem");
      }

      if($rootScope.players[player].score == $rootScope.themedata.winningscore) {

        //win!
        $scope.gameWon(player, opposing);
      }
    }

    //save the score
    $scope.updateSession();

    //start the score timeout
    $timeout(function() {
      $scope.scoreInterval = false;

      //switch back to the still stance only if they just left a score stance

      if($rootScope.players[1].currentstance == "score" || $rootScope.players[1].currentstance == "scoredon") {
        $rootScope.players[1].currentstance = "still";
      }

      if($rootScope.players[2].currentstance == "score" || $rootScope.players[2].currentstance == "scoredon") {
        $rootScope.players[2].currentstance = "still";
      }

    }, scoreTimeout);
  }

  $scope.gameWon = function(winner, opposing) {
    //set the players stances
    //check if it was a skunk out
    var skunk = false;

    if($rootScope.themedata.scoretype == "healthbar") {
      if($rootScope.players[winner].health == $rootScope.themedata.winningscore) {
        skunk = true;
      }
    }
    else {
      if($rootScope.players[opposing].score == 0) {
        skunk = true;
      }
    }

    if(skunk) {
      //special messaging

      //show winner
      gamemessages.showMessage("skunked");

      //wait for timeout on winner show skunked
      $timeout(function() { gamemessages.showMessage("winner", $rootScope.players[winner].name)}, $rootScope.themedata.messages['skunked'].timeout);

      //special skunk stances
      $rootScope.players[winner].currentstance = "skunked";
      $rootScope.players[opposing].currentstance = "skunkedon";

      gamemessages.showRandomTaunt(winner, "skunked");
      gamemessages.showRandomTaunt(winner, "skunkedon");
    }
    else {

      //show the winner message
      gamemessages.showMessage("winner", $rootScope.players[winner].name);

      //standard stances
      $rootScope.players[winner].currentstance = "won";
      $rootScope.players[opposing].currentstance = "lost";

      //show taunt messages
      gamemessages.showRandomTaunt(winner, "won");
      gamemessages.showRandomTaunt(opposing, "lost");
    }

    //kill the timer
    $scope.$emit("timer-stop");

    //reset things
    $timeout(function() {
      $rootScope.players = {};
      $location.url("/");
    }, 10000);
  }

  $scope.newGame();
  $scope.updateSession();
});
