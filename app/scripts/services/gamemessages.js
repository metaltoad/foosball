app.service('gamemessages', ['$timeout', '$rootScope', function($timeout, $rootScope) {

  var originalTextStyle = document.getElementById("gamemessage").style;

  this.showMessage = function(messageid, prefix, subfix) {

    if($rootScope.themedata.messages[messageid].type == "sequence") {
      return this.showMessages(messageid);
    }

    if($rootScope.themedata.messages[messageid].type == "random") {
      var randMsg = Math.floor((Math.random() * $rootScope.themedata.messages[messageid].text.length));
      var msg = $rootScope.themedata.messages[messageid].text[randMsg];
    }
    else {
      var msg = $rootScope.themedata.messages[messageid].text;
    }

    if(prefix) {
      msg = prefix + " " + msg;
    }

    if(subfix) {
      msg += " " + subfix;
    }

    if($rootScope.themedata.messages[messageid].position == "fixed") {
      document.getElementById("gamemessage").style = originalTextStyle;
    }
    else {
      //pick a random spot to show the taunt and then set the message there
      document.getElementById("gamemessage").style.position = "absolute";
      var randtop = Math.floor((Math.random() * 400));
      var randleft = Math.floor((Math.random() * 400 + 300));
      document.getElementById("gamemessage").style.top = randtop + "px";
      document.getElementById("gamemessage").style.left = randleft + "px";
    }

    $rootScope.gamemessagetext = msg;
    $timeout(function() { $rootScope.gamemessagetext = false}, $rootScope.themedata.messages[messageid].timeout);
  }

  this.showMessages = function(messageid, index) {

    if(!index) {
      index = 0;
    }

    if($rootScope.themedata.messages[messageid].position == "fixed") {
      document.getElementById("gamemessage").style = originalTextStyle;
    }
    else {
      //pick a random spot to show the taunt and then set the message there
      document.getElementById("gamemessage").style.position = "absolute";
      var randtop = Math.floor((Math.random() * 400));
      var randleft = Math.floor((Math.random() * 400 + 300));
      //document.getElementById("gamemessage").style.top = randtop + "px";
      //document.getElementById("gamemessage").style.left = randleft + "px";
    }

    $rootScope.gamemessagetext = $rootScope.themedata.messages[messageid].text[index];

    var gm = this;

    $timeout(function() {
      if($rootScope.themedata.messages[messageid].text[index + 1]) {
        gm.showMessages(messageid, index+1);
      }
      else {
        $rootScope.gamemessagetext = false;
      }
    }, $rootScope.themedata.messages[messageid].timeout);
  }
  //show a random taunt for the player specified
  this.showRandomTaunt = function(player, type) {

    if(Array.isArray($rootScope.players[player].taunts[type].text)) {
      //pick a random taunt
      var randMsg = Math.floor((Math.random() * $rootScope.players[player].taunts[type].text.length));

      //assign the player their taunt
      $rootScope.players[player].taunt = $rootScope.players[player].taunts[type].text[randMsg];
    }
    else {
      $rootScope.players[player].taunt = $rootScope.players[player].taunts[type].text;
    }
    $timeout(function() { $rootScope.players[player].taunt = false}, $rootScope.players[player].taunts[type].timeout);
  }
}]);
