'use strict';

/*******************************************************************************************************
 * TAUT DIRECTIVE
 * Text that will appear above the said player as a taunt
 *******************************************************************************************************
 */
app.directive('taunt', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/taunt.html',
    controller: function($scope, $element, $attrs, playersManager) {
      $scope.player = $attrs.taunt;

      $scope.$watch(function() { return playersManager.getPlayerList($scope.player).taunt;  },
        function(newValue, oldValue) {
          $scope.taunt = playersManager.getPlayerList($scope.player).taunt;
        }
      );
    }
  }
})


