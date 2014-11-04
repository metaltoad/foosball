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
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player=$attrs.healthbar;

      if(!$rootScope.players[$scope.player].health) {
        $rootScope.players[$scope.player].health = $rootScope.themedata.winningscore;
      }

      $scope.$watch(function() { return $rootScope.players[$scope.player].health;  },
        function(newValue, oldValue) {
          //adjust the healthbar element
          document.getElementById("health" + $scope.player).style.width= (newValue * (100 / $rootScope.themedata.winningscore)) + "%";
        }
      );
    }
  }
})


