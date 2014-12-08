'use strict';

app.controller('InputCtrl', function($scope, $route, $location, playersManager, sessionManager, themeManager) {
  $scope.recordInput = function($e) {
    
    var key = String.fromCharCode($e.which);

    //some keys are universal so allow them to be used here
    switch(key) {
      case "w": {
          //send back to the login
          playersManager.players = [];
          $location.url("/");
          break;
        }
    }

    switch($route.current.originalPath) {
      case "/game": {
          playersManager.handleGameInput($e, key);
          break;
      }
      default: {
          //handle the sesssion input
          sessionManager.handleSessionInput($e, key);

          //update the session


          break;
      }
    }
  }
});
