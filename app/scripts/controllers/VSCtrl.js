'use strict';

app.controller('VSCtrl', function($scope, $routeParams, $rootScope, $timeout, $location) {

  $timeout(function() { $location.url("/game");}, 3000);

  //ping the web service get the locations? or from the theme json

  //cool got them now pick one

  //sample data
  $scope.locations = {0: {
                      "name": "Directors Park",
                      "background": "/app/views/images/director_park.JPG"
                   },
                1: {
                      "name": "Barista",
                      "background": "/app/views/images/barista.jpg"
                   },
                2: {
                      "name": "Ground Kontrol",
                      "background": "/app/views/images/ground_kontrol.jpeg"
                   }
  }

  var randLoc = Math.floor((Math.random() * Object.keys($scope.locations).length));
  $rootScope.location = $scope.locations[randLoc];

  $rootScope.handleVSInput = function($e) {

  }
});