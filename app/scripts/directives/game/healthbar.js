'use strict';

/*******************************************************************************************************
 * HEALTHBAR DIRECTIVE
 * The player score and health bar system
 *******************************************************************************************************
 */
app.directive('healthbar', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/healthbar.html',
    controller: function($scope, $element, $attrs, playersManager, themeManager) {

      if(playersManager.getPlayerInfo($attrs.healthbar)) {
        //set the initial value to the default
        playersManager.getPlayerInfo($attrs.healthbar).health = themeManager.themeData.winningscore;

        //set the name
        $scope.name = playersManager.getPlayerInfo($attrs.healthbar).name;
      }

      //will watch the value on the player manager and update the % value when it changes
      $scope.$watch(function() {
          if(playersManager.getPlayerInfo($attrs.healthbar)) {
            return playersManager.getPlayerInfo($attrs.healthbar).health;
          }
          return null;
        },
        function(newValue, oldValue) {
          if(playersManager.getPlayerInfo($attrs.healthbar)) {
            //adjust the healthbar element
            $scope.healthPercent = (playersManager.getPlayerInfo($attrs.healthbar).health * (100 / themeManager.themeData.winningscore));
          }
        }
      );
    }
  }
})


