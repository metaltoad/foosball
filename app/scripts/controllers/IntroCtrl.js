'use strict';

app.controller('IntroCtrl', function($scope, $location, $rootScope, sessionManager, themeManager, playersManager) {

  var maxUserIdLength = 10;
  var guestLogin1key = "[";
  var guestLogin2key = "'";
  var cycleThemekey = "-";
  var resetKey = "u";
  var nfcKey = "*";
  var nfcStartChar = "<";
  var nfcEndChar = ">";
  var nfcData = "";
  var nfcInput = false;
  var nfcValid = false;
  var nfcPlayer = 0;

  if(document.getElementById("viewonly")) {
    sessionManager.getSession();
  }

  document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
  });

  document.getElementById("backdrop2").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop2").style.height= window.innerHeight+"px";
  });

  $scope.currentThemePath = themeManager.getCurrentThemePath();
  $scope.players = [];

  $rootScope.$on('keypress', function(event, e){
    var key = String.fromCharCode(e.which);

    if($scope.nfcInput) {
      if($scope.nfcData == "" && key == $scope.nfcStartChar) {
        //if the buffer is empty and this is the start key
        //set the nfc valid to true to the following chars will be accepted
        $scope.nfcValid = true;
      }
      else if($scope.nfcData == "" && key != $scope.nfcStartChar) {
        //get the player number
        $scope.nfcPlayer = key;
      }
      else if(this.nfcData != "" && key == $scope.nfcEndChar) {
        $scope.nfcInput = false;
        $scope.nfcValid = false;

        //send the code off to be validated now that we have it
        if(playersManager.processNFC(nfcInput)) {
          //refresh the scope with the new user info
          $scope.players[this.nfcPlayer] = playersManager.getPlayerInfo($scope.nfcPlayer);
          $scope.checkLogins();
        }
      }
      else if($scope.nfcValid && stringIsNumber(key)) { //if we are valid in our buffer data continue
        $scope.nfcData += key;
      }
      else {
        //kill the buffer
        $scope.nfcData = "";
        $scope.nfcInput = false;
        $scope.nfcValid = false;
        $scope.nfcPlayer = 0;
      }
    }
    else {
      switch(key) {
        case guestLogin1key: {
            $scope.loginGuest(1);
            break;
        }
        case guestLogin2key: {
            $scope.loginGuest(2);
            break;
        }
        case cycleThemekey: {
            themeManager.cycleTheme();
            $scope.currentThemePath = themeManager.getCurrentThemePath();
            break;
        }
        case nfcKey: {
            nfcInput = true;
        }
      }
    }
  });

  //login the guest specified
  $scope.loginGuest = function(guestNumber) {
    playersManager.loginGuest(guestNumber);
    $scope.players[guestNumber] = playersManager.getPlayerInfo(guestNumber);
    $scope.checkLogins();
  }

  //check if the number of users logged in is good
  $scope.checkLogins = function() {
    if($scope.players[1] && $scope.players[2]) {
      //move to the vs screen
      $location.url("/vs");
    }
  }
});
