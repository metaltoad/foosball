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
    controller: function($scope, $element, $attrs, playersManager) {
      $scope.player=$attrs.player;
      $scope.marginleft = 0;
      $scope.marginright = 0;
      $scope.marginbottom = 0;

      if($scope.player == 2) {
        $scope.playerclasses = "flip-horizontal";
      }

      //watch for any stance change to the player avatar
      $scope.$watch(function() { return playersManager.getPlayerInfo($scope.player).currentstance;  },
        function(newValue, oldValue) {
          if(!playersManager.getPlayerInfo($scope.player).currentstance) {
            playersManager.getPlayerInfo($scope.player).currentstance = "still";
          }
          $scope.currentstance = playersManager.getPlayerInfo($scope.player).currentstance;

          $scope.currentstance = playersManager.getPlayerInfo($scope.player).currentstance;

          //if there is an adjustment to the stance apply it
          // $scope.playerImage = $rootScope.players[$scope.player].stances[$rootScope.players[$scope.player].currentstance].image;
          $scope.playerImage = playersManager.getPlayerInfo($scope.player).stances[playersManager.getPlayerInfo($scope.player).currentstance].image;

          playersManager.getPlayerInfo($scope.player).positionoffsetx = playersManager.getPlayerInfo($scope.player).stances[playersManager.getPlayerInfo($scope.player).currentstance].positionoffsetx;
          playersManager.getPlayerInfo($scope.player).positionoffsety = playersManager.getPlayerInfo($scope.player).stances[playersManager.getPlayerInfo($scope.player).currentstance].positionoffsety;
        }
      );

      //allow the player avatar to move on the x axis based on some event
      $scope.$watch(function() { return playersManager.players[$scope.player].positionoffsetx;  },
        function(newValue, oldValue) {

          //if there is an adjustment to the offsetx apply it
          if($scope.player == 2) {
            $scope.marginright = playersManager.getPlayerInfo($scope.player).positionoffsetx;
          }
          else {
            $scope.marginleft = playersManager.getPlayerInfo($scope.player).positionoffsetx;
          }
        }
      );

      //allow the player avatar to move on the y axis based on some event
      $scope.$watch(function() { return playersManager.getPlayerInfo($scope.player).positionoffsety;  },
        function(newValue, oldValue) {

          //if there is an adjustment to the offsetx apply it
          $scope.marginbottom = playersManager.getPlayerInfo($scope.player).positionoffsety;
        }
      );
    },
  }
})


