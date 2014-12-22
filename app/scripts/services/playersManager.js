app.service('playersManager', ['themeManager', 'gamemessages', '$http', '$timeout', '$location', '$rootScope', function(themeManager, gamemessages, $http, $timeout, $location, $rootScope) {

  var scoreTimeout = 2000;
  var scoreInterval = false;

  this.users = {};
  this.players = [];

  this.getDefaultPlayers = function() {
    this.players = themeManager.themeData.defaultplayers;
  }

  //get the active user list information
  this.getUserList = function() {
    var scope = this;
    $http.get('/app/users.json').
      success(function(data, status, headers, config) {
        scope.users = data;
      });
  };

  this.resetPlayerList = function() {
    this.players = [];
  }

  this.getPlayerList = function() {
    return this.players;
  }

  //handle the nfc tag scans
  //return true for tag processed
  //false for the tag failed
  this.processNFC = function(nfcPlayer, tagUID) {
    if(this.users[tagUID]) {
      this.loadUser(nfcPlayer, tagUID);
      return true;
    }
    return false;
  }

  this.loginGuest = function(guestNumber) {
    this.loadUser(guestNumber, "guest");
  }

  this.scoreGoal = function(player) {

    //if there isnt a player by that id cant score
    if(!this.players[player]) {
      return;
    }

    //dont allow double scoring
    if(this.scoreInterval) {
      return;
    }

    this.scoreInterval = true;

    var opposing = 1;

    if(player == 1) {
      opposing = 2;
    }

    this.players[player].currentstance = "score";
    this.players[opposing].currentstance = "scoredon";

    //show player taunt
    gamemessages.showRandomTaunt(this.players[player], "score");

    //only show a reaction 10% of the time
    var react = Math.floor((Math.random() * 10) + 1);

    if(react == 5) {
      gamemessages.showRandomTaunt(this.players[opposing], "scoredon");
    }

    //show goal message
    gamemessages.showMessage("goal");

    //set the opposing player to having been scored on
    this.players[opposing].currentstance = "scoredon";

    //check the type of scoring this theme uses and set the scoreing
    if(themeManager.themeData.scoretype == "healthbar") {

      this.players[opposing].health--;

      //check for a finish them
      if(this.players[opposing].health == 1) {
        gamemessages.showMessage("finishthem");
        gamemessages.showRandomTaunt(this.players[player], "finishthem");
        this.players[opposing].currentstance = "finishthem";
      }

      //check for a win
      if(this.players[opposing].health == 0) {

        //win!
        this.gameWon(player, opposing);
      }
    }
    else {

      this.players[player].score++;

      //check for a finish them
      if(this.players[player].score == (themeManager.themeData.winningscore - 1) &&
         this.players[opposing].score < (themeManager.themeData.winningscore - 1)) {
         gamemessages.showMessage("finishthem");
         gamemessages.showRandomTaunt(this.players[player], "finishthem");
      }

      if(this.players[player].score == themeManager.themeData.winningscore) {

        //win!
        this.gameWon(player, opposing);
      }
    }

    //save the score
    //this.updateSession();

    var scope = this;

    //start the score timeout
    $timeout(function() {
      scope.scoreInterval = false;

      //switch back to the still stance only if they just left a score stance

      if(scope.players[1].currentstance == "score" || scope.players[1].currentstance == "scoredon") {
        scope.players[1].currentstance = "still";
      }

      if(scope.players[2].currentstance == "score" || scope.players[2].currentstance == "scoredon") {
        scope.players[2].currentstance = "still";
      }

    }, scoreTimeout);
  }

  this.gameWon = function(winner, opposing) {
    var scope = this;

    //set the players stances
    //check if it was a skunk out
    var skunk = false;

    if(themeManager.themeData.scoretype == "healthbar") {
      if(this.players[winner].health == themeManager.themeData.winningscore) {
        skunk = true;
      }
    }
    else {
      if(this.players[opposing].score == 0) {
        skunk = true;
      }
    }

    if(skunk) {
      //special messaging

      //show winner
      gamemessages.showMessage("skunked");

      //wait for timeout on winner show skunked
      $timeout(function() { gamemessages.showMessage("winner", scope.players[winner].name)}, themeManager.themeData.messages['skunked'].timeout);

      //special skunk stances
      this.players[winner].currentstance = "skunked";
      this.players[opposing].currentstance = "skunkedon";

      gamemessages.showRandomTaunt(this.players[winner], "skunked");
      gamemessages.showRandomTaunt(this.players[opposing], "skunkedon");
    }
    else {

      //show the winner message
      gamemessages.showMessage("winner", this.players[winner].name);

      //standard stances
      this.players[winner].currentstance = "won";
      this.players[opposing].currentstance = "lost";

      //show taunt messages
      gamemessages.showRandomTaunt(this.players[winner], "won");
      gamemessages.showRandomTaunt(this.players[opposing], "lost");
    }

    //kill the timer
    //this.$emit("timer-stop");

    //reset things
    $timeout(function() {
      $rootScope.resetGame();
    }, 10000);
  }

  this.loadUser = function(playerNumber, playerID) {
    var player = jQuery.extend({}, this.users[playerID]);
    this.players[playerNumber] = this.applyPlayersDefaults(player);
    this.players[playerNumber].currentstance = "still";
  }

  this.getPlayerInfo = function(playerNumber) {
    return this.players[playerNumber];
  }

  this.applyPlayersDefaults = function(player) {
    //check all the settings if any are missing set them default
    //any other settings should be provided, like name, vs avatar

    //these are likely not provided so go with defaults

    if(!player['stances']) {
      player['stances'] = {};
    }

    if(!player['taunts']) {
      player['taunts'] = {};
    }

    player['score'] = 0;

    //set the default stances
    //get a random default player to use
    var p = Math.floor((Math.random() * themeManager.themeData.defaultplayer.provideddefaults) + 1)

    for(key in themeManager.themeData.defaultplayer['stances']) {
      if(!player['stances'][key]) {
        player['stances'][key] = jQuery.extend({}, themeManager.themeData.defaultplayer['stances'][key]);

        if(player.idx != 0 && player.gfx) {
          player['stances'][key].image = "/app/views/images/players/" + player.idx + "/" + key + ".gif";
        }
        else {

          //prefix the image with the path and the random character
          player['stances'][key].image = "/app/themes/" + themeManager.getCurrentThemePath() + "/images/players/" + p + "/" + themeManager.themeData.defaultplayer['stances'][key].image;
        }
      }
    }

    //set the default taunts
    for(key in themeManager.themeData.defaultplayer['taunts']) {
      if(!player['taunts'][key]) {
        player['taunts'][key] = themeManager.themeData.defaultplayer['taunts'][key];
      }
    }

    return player;
  }
}]);