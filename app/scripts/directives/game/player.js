'use strict';

/*******************************************************************************************************
 * PLAYER DIRECTIVE
 * The player on the screen representing the player playing
 *******************************************************************************************************
 */
app.directive('player', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/player.html',
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player=$attrs.player;
      $scope.marginleft = 0;
      $scope.marginright = 0;
      $scope.marginbottom = 0;

      if($scope.player == 2) {
        $scope.playerclasses = "flip-horizontal";
      }

      //watch for any stance change to the player avatar
      $scope.$watch(function() { return $rootScope.players[$scope.player].currentstance;  },
        function(newValue, oldValue) {
          if(!$rootScope.players[$scope.player].currentstance) {
            $rootScope.players[$scope.player].currentstance = "still";
          }

          //if there is an adjustment to the stance apply it
          $scope.playerImage = "url(" + $rootScope.players[$scope.player].stances[$rootScope.players[$scope.player].currentstance].image + ")";

          $rootScope.players[$scope.player].positionoffsetx = $rootScope.players[$scope.player].stances[$rootScope.players[$scope.player].currentstance].positionoffsetx;
          $rootScope.players[$scope.player].positionoffsety = $rootScope.players[$scope.player].stances[$rootScope.players[$scope.player].currentstance].positionoffsety;
        }
      );

      //allow the player avatar to move on the x axis based on some event
      $scope.$watch(function() { return $rootScope.players[$scope.player].positionoffsetx;  },
        function(newValue, oldValue) {

          //if there is an adjustment to the offsetx apply it
          if($scope.player == 2) {
            $scope.marginright = $rootScope.players[$scope.player].positionoffsetx;
          }
          else {
            $scope.marginleft = $rootScope.players[$scope.player].positionoffsetx;
          }
        }
      );

      //allow the player avatar to move on the y axis based on some event
      $scope.$watch(function() { return $rootScope.players[$scope.player].positionoffsety;  },
        function(newValue, oldValue) {

          //if there is an adjustment to the offsetx apply it
          $scope.marginbottom = $rootScope.players[$scope.player].positionoffsety;
        }
      );
    },
  }
})


