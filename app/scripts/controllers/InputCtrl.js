'use strict';

app.controller('InputCtrl', function($scope, $route, $rootScope) {

$scope.recordInput = function($e) {

  var key = String.fromCharCode($e.which);
  switch($route.current.originalPath) {
    case "/vs": {
        $rootScope.handleVSInput($e, key);
        break;
    }
    case "/game": {
        $rootScope.handleFightInput($e, key);
        break;
    }
    default: {
        $rootScope.handleLogin($e);
        break;
    }
  }
}

});