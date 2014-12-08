app.service('gamemessages', ['$timeout', 'themeManager', '$rootScope', function($timeout, themeManager, $rootScope) {

  this.showMessage = function(messageid, prefix, subfix) {

    if(themeManager.themeData.messages[messageid].type == "sequence") {
      return this.showMessages(messageid);
    }

    if(themeManager.themeData.messages[messageid].type == "random") {
      var randMsg = Math.floor((Math.random() * themeManager.themeData.messages[messageid].text.length));
      var msg = themeManager.themeData.messages[messageid].text[randMsg];
    }
    else {
      var msg = themeManager.themeData.messages[messageid].text;
    }

    if(prefix) {
      msg = prefix + " " + msg;
    }

    if(subfix) {
      msg += " " + subfix;
    }

//    if(themeManager.themeData.messages[messageid].position == "fixed") {
//      document.getElementById("gamemessage").style = originalTextStyle;
//    }
//    else {
//      //pick a random spot to show the taunt and then set the message there
//      //document.getElementById("gamemessage").style.position = "absolute";
//      var randtop = Math.floor((Math.random() * 400));
//      var randleft = Math.floor((Math.random() * 200 + 100));
//      document.getElementById("gamemessage").style.top = randtop + "px";
//      document.getElementById("gamemessage").style.left = randleft + "px";
//    }

    $rootScope.$broadcast('gamemessage', msg);
    $timeout(function() { $rootScope.$broadcast('gamemessage', false); }, themeManager.themeData.messages[messageid].timeout);
  }

  this.showMessages = function(messageid, index) {

    if(!index) {
      index = 0;
    }

//    if(themeManager.themeData.messages[messageid].position == "fixed") {
//      document.getElementById("gamemessage").style = originalTextStyle;
//    }
//    else {
//      //pick a random spot to show the taunt and then set the message there
//      document.getElementById("gamemessage").style.position = "absolute";
//      var randtop = Math.floor((Math.random() * 400));
//      var randleft = Math.floor((Math.random() * 400 + 300));
//      document.getElementById("gamemessage").style.top = randtop + "px";
//      document.getElementById("gamemessage").style.left = randleft + "px";
//    }

    $rootScope.$broadcast('gamemessage', themeManager.themeData.messages[messageid].text[index]);

    var gm = this;

    $timeout(function() {
      if(themeManager.themeData.messages[messageid].text[index + 1]) {
        gm.showMessages(messageid, index+1);
      }
      else {
        $rootScope.$broadcast('gamemessage', false);
      }
    }, themeManager.themeData.messages[messageid].timeout);
  }
  //show a random taunt for the player specified
  this.showRandomTaunt = function(player, type) {

    if(Array.isArray(player.taunts[type].text)) {
      //pick a random taunt
      var randMsg = Math.floor((Math.random() * player.taunts[type].text.length));

      //assign the player their taunt
      player.taunt = player.taunts[type].text[randMsg];
    }
    else {
      player.taunt = player.taunts[type].text;
    }
    $timeout(function() { player.taunt = false}, player.taunts[type].timeout);
  }
}]);
