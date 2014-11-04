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
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player=$attrs.healthbar;

      if(!$rootScope.players[$scope.player].health) {
        $rootScope.players[$scope.player].health = 5;
      }

      $scope.$watch(function() { return $rootScope.players[$scope.player].health;  },
        function(newValue, oldValue) {
          $scope.score = newValue;
        }
       );
    }
  }
})


