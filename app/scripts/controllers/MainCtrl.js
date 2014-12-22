app.controller('MainCtrl', function($scope, $rootScope, sessionManager, themeManager, gamemessages, $interval, $location, playersManager) {

  var player1ForceKey = "";
  var player2ForceKey = "";
  var player1ScoreKey = "j";
  var player2ScoreKey = "b";
  var resetKey = "w";

  $scope.currentThemePath = themeManager.getCurrentThemePath();

  $scope.scoreType = themeManager.themeData.scoretype;

  //redirect the session to the login if there are not atleast 2 players in here
  if(playersManager.getPlayerList() < 2) {
    playersManager.players = [];
    $location.url("/");
    return;
  }

  //setup the session refresh polling
  if(sessionManager.getSessionViewMode() == 'viewonly') {
    //set a timer to keep the view updated
    $interval(function() {sessionManager.getSession();}, 5000);
  }

  //get default players if for some reason they are not supplied
  if(!playersManager.getPlayerList()) {
    playersManager.getDefaultPlayers();
  }

  //get a random background if not provided
  if(!sessionManager.getCurrentBackground()) {
    sessionManager.getRandomBackground();
  }

  //set the background image
  //tried this with interpolation but there was a race condition in getting the background size.
  //this actually works better
  document.getElementById("backdrop").style.backgroundImage= "url(/app/themes/" + $scope.currentThemePath + "/images/" + sessionManager.getCurrentBackground().background + ")";
  document.getElementById("backdrop").style.height= window.innerHeight+"px";
  window.addEventListener("resize", function(e) {
    document.getElementById("backdrop").style.height= window.innerHeight+"px";
  });

  //
  if(this.sessionViewMode != 'viewonly') {
    //show the ready message
    gamemessages.showMessage("matchstart");
  }

  //save the session
  sessionManager.updateSession();

  $scope.gameMessageBroadcast = $rootScope.$on('gamemessage', function(e, message){
    $scope.gamemessagetext = message;
  });

  $rootScope.resetGame = function() {
    //deregister the listener
    $scope.keyPressMgr();
    $scope.gameMessageBroadcast();
    playersManager.players = [];
    $location.url("/");
    return;
  }

  $scope.keyPressMgr = $rootScope.$on('keypress', function(event, e){
    var key = String.fromCharCode(e.which);

    switch(key) {
      case player1ScoreKey: {
        playersManager.scoreGoal(1);
        break;
      }
      case player2ScoreKey: {
        playersManager.scoreGoal(2);
        break;
      }
      case resetKey: {
        $rootScope.resetGame();
        break;
      }
    }
  });
});
