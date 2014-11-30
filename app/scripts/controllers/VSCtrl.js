'use strict';

app.controller('VSCtrl', function($scope, $routeParams, $rootScope, $timeout, $location) {

  $timeout(function() { $location.url("/game");}, 3000);

  var randLoc = Math.floor((Math.random() * Object.keys($rootScope.themedata.backgrounds).length));
  $rootScope.location = $rootScope.themedata.backgrounds[randLoc];

  document.getElementById("backdrop").style.height= window.innerHeight+"px";
    window.addEventListener("resize", function(e) {
      document.getElementById("backdrop").style.height= window.innerHeight+"px";
    });

  $rootScope.handleVSInput = function($e) {

  }
});
