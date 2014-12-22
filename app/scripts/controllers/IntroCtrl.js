'use strict';

app.controller('IntroCtrl', function($scope, $location, $rootScope, sessionManager, themeManager, playersManager, $timeout) {

  var maxUserIdLength = 10;
  var guestLogin1key = "[";
  var guestLogin2key = "'";
  var cycleThemekey = "-";
  var resetKey = "w";
  var nfcKey = "q";
  var nfcStartChar = "e";
  var nfcEndChar = "r";
  var nfcData = "";
  var nfcInput = false;
  var nfcValid = false;
  var nfcPlayer = 0;
  var player1Score = 'j';
  var player2Score = 'b';

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

  function stringIsNumber(s) {
    var x = +s; // made cast obvious for demonstration
    return x.toString() === s;
  }

  $rootScope.introKeyOff = $rootScope.$on('keypress', function(event, e){
    var key = String.fromCharCode(e.which);

    if(key == resetKey) {
      nfcData = "";
      nfcInput = false;
      nfcValid = false;
      nfcPlayer = 0;
      playersManager.resetPlayerList();
    }

    if(nfcInput) {
      if(nfcData == "" && key == nfcStartChar) {
        //if the buffer is empty and this is the start key
        //set the nfc valid to true to the following chars will be accepted
        nfcValid = true;
      }
      else if(!nfcValid && nfcData == "" && key != nfcStartChar) {
        //get the player number
        nfcPlayer = key;
      }
      else if(nfcData != "" && key == nfcEndChar) {
        nfcInput = false;
        nfcValid = false;

        //send the code off to be validated now that we have it
        if(playersManager.processNFC(nfcPlayer, nfcData)) {
          //refresh the scope with the new user info
          $scope.players[nfcPlayer] = playersManager.getPlayerInfo(nfcPlayer);
          $scope.checkLogins();
        }
        //kill the buffer
        nfcData = "";
        nfcInput = false;
        nfcValid = false;
        nfcPlayer = 0;
      }
      else if(nfcValid && stringIsNumber(key)) { //if we are valid in our buffer data continue
        nfcData += key;
      }
      else {
        //kill the buffer
        nfcData = "";
        nfcInput = false;
        nfcValid = false;
        nfcPlayer = 0;
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
            break;
        }
        case player1Score: {
          //if a score is detected when no one has logged in a classic game starts auto
          $scope.startClassicGame(1);
        }
        case player2Score: {
          $scope.startClassicGame(2);
        }
      }
    }
  });

  $scope.startClassicGame = function(score) {
    if(playersManager.getPlayerList().length == 0) {
      //get the current theme path for the style sheet
      themeManager.loadThemeByName("classic");
      $scope.currentThemePath = 'classic';
      $rootScope.currentThemePath = 'classic';

      //theme change is too slow added a timeout to wait for it
      $timeout(function() {
        $scope.loginGuest(1);
        $scope.loginGuest(2);
        playersManager.scoreGoal(score);
        $location.url("/game");
        $rootScope.introKeyOff();
      }, 500);
    }
  }

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
      $rootScope.introKeyOff();
    }
  }
});
