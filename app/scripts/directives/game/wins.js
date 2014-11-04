'use strict';

/*******************************************************************************************************
 * WINS DIRECTIVE
 * The icon for the wins a player has achieved if this is a tournament
 *******************************************************************************************************
 */
app.directive('location', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/wins.html',
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player=$attrs.wins;
    }
  }
})


