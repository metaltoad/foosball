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
      $scope.player=$attrs.score;

      if(!$rootScope.players[$scope.player].score) {
        $rootScope.players[$scope.player].score = 0;
      }

      $scope.$watch(function() { return $rootScope.players[$scope.player].score;  },
        function(newValue, oldValue) {
          $scope.score = newValue;
        }
       );
    }
  }
})


