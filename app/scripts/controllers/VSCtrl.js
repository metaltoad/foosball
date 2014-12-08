'use strict';

app.controller('VSCtrl', function($scope, $timeout, $location, playersManager, sessionManager, themeManager) {

  if(playersManager.getPlayerList() < 2) {
    playersManager.players = [];
    $location.url("/");
  }

  //get the current theme path for the style sheet
  $scope.currentThemePath = themeManager.getCurrentThemePath();

  //get a new background
  $scope.location = sessionManager.getRandomBackground();

  //timeout the vs screen and go into the game
  $timeout(function() { $location.url("/game");}, 500);

  document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
    });
});
