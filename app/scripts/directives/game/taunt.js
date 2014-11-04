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
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player = $attrs.taunt;

      $scope.$watch(function() { return $rootScope.players[$scope.player].taunt;  },
        function(newValue, oldValue) {
          $scope.taunt = $rootScope.players[$scope.player].taunt;
        }
      );
    }
  }
})


