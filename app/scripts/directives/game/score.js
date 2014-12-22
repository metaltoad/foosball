'use strict';

/*******************************************************************************************************
 * SCORE DIRECTIVE
 * The player score number rather than a healthbar
 *******************************************************************************************************
 */
app.directive('score', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/score.html',
    controller: function($scope, $element, $attrs, playersManager) {
      $scope.player = $attrs.score;
      if(!playersManager.getPlayerList($scope.player).score) {
        playersManager.getPlayerList($scope.player).score = 0;

        //set the name
        $scope.name = playersManager.getPlayerInfo($attrs.score).name;
      }

      $scope.$watch(function() {
          if(playersManager.getPlayerInfo($attrs.score)) {
            return playersManager.getPlayerInfo($attrs.score).score;
          }
          return null;
        },
        function(newValue, oldValue) {
          $scope.score = newValue;
        }
       );
    }
  }
})


