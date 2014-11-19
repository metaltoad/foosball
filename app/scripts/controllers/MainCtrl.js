app.controller('MainCtrl', function($scope, $routeParams, $timeout, $interval, $rootScope, gamemessages, $location) {

  var player1ForceKey = "";
  var player2ForceKey = "";

  var player1ScoreKey = "1";
  var player2ScoreKey = "b";
  var scoreTimeout = 2000;
  $scope.scoreInterval = false;

  if(!$rootScope.players) {
    $location.url("/vs");
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

    $rootScope.players[1].currentstance = "still";
    $rootScope.players[2].currentstance = "still";

    //show the ready message
    gamemessages.showMessage("matchstart");
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
});
